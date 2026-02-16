/**
 * Converts the program object into the specific Binary Format required by the FreeRTOS VM.
 * * Format Structure:
 * [Header (4B)] [String Pool] [Instructions]
 * * Header:       [StringLen (2B BE)] [InstrLen (2B BE)]
 * Instructions: [Opcode (4B LE)]    [Arg1 (4B LE)]
 * * @param {Object|Array} codeObject - The object containing { program: [...], strings: [...] } OR just the program array
 * @returns {Uint8Array} - The raw binary buffer ready for MQTT transmission
 */
export function convertProgramToBinary(codeObject) {
    let program = [];
    let stringArray = [];

    // Handle case where codeObject is just the instruction array (No Strings case)
    if (Array.isArray(codeObject)) {
        program = codeObject;
        stringArray = [];
    } else if (codeObject && typeof codeObject === 'object') {
        program = codeObject.program || [];
        stringArray = codeObject.strings || [];
    }

    // Convert strings to UTF-8 bytes separated by null terminators (\0)
    const encoder = new TextEncoder(); 
    let stringBytes = [];
    
    if (Array.isArray(stringArray) && stringArray.length > 0) {
        for (const str of stringArray) {
            const safeStr = String(str); 
            const encoded = encoder.encode(safeStr);
            encoded.forEach(b => stringBytes.push(b)); // Add string bytes
            stringBytes.push(0); // Add null terminator
        }
    }
    
    const stringPoolLen = stringBytes.length;

    // Each instruction is 8 bytes: 4 bytes (Opcode) + 4 bytes (Arg1)
    const instructionBytesLen = program.length * 8;
    const instructionBuffer = new ArrayBuffer(instructionBytesLen);
    const instructionView = new DataView(instructionBuffer);

    for (let i = 0; i < program.length; i++) {
        const instr = program[i];
        // Safety check to prevent crash if instruction is null
        const op = (instr && instr.op) ? instr.op : 0;
        const arg1 = (instr && instr.arg1) ? instr.arg1 : 0;

        // Write Opcode and Arg1 as 32-bit signed integers, Little Endian
        instructionView.setInt32(i * 8, op, true); 
        instructionView.setInt32((i * 8) + 4, arg1, true);
    }

    // 8 Bytes Total: [String Length (4B)] [Instruction Length (4B)]
    // BE (Big Endian) matches C++ network order
    const headerBuffer = new ArrayBuffer(8);
    const headerView = new DataView(headerBuffer);
    
    headerView.setUint32(0, stringPoolLen, false); // false = Big Endian
    headerView.setUint32(4, instructionBytesLen, false); // false = Big Endian

    // Combine Everything 
    const totalLength = 8 + stringPoolLen + instructionBytesLen;
    const finalBuffer = new Uint8Array(totalLength);

    // Copy Header
    finalBuffer.set(new Uint8Array(headerBuffer), 0);
    
    // Copy String Pool (only if it exists)
    if (stringPoolLen > 0) {
        finalBuffer.set(new Uint8Array(stringBytes), 8);
    }

    // Copy Instructions
    if (instructionBytesLen > 0) {
        finalBuffer.set(new Uint8Array(instructionBuffer), 8 + stringPoolLen);
    }

    return finalBuffer;
}