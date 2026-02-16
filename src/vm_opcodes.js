//Mapping for Opcode 
export const opcodeMap = {
  // Flow Control & Core
  OP_NOP: 0,
  OP_SETUP_START: 1,
  OP_LOOP_START: 2,
  OP_HALT: 3,

  // Stack & Memory
  OP_PUSH: 4,
  OP_POP: 5,
  OP_LOAD: 6,
  OP_STORE: 7,

  // I/O Operations
  OP_PIN_MODE: 8,
  OP_DIGITAL_WRITE: 9,
  OP_DIGITAL_READ: 10,
  OP_ANALOG_WRITE: 11,
  OP_ANALOG_READ: 12,
  OP_DELAY: 13,

  // Arithmetic Operations
  OP_ADD: 14,
  OP_SUB: 15,
  OP_MUL: 16,
  OP_DIV: 17,

  // Logical Operations
  OP_AND: 18,
  OP_OR: 19,
  OP_NOT: 20,

  // Comparison Operations
  OP_EQ: 21,
  OP_NEQ: 22,
  OP_GT: 23,
  OP_LT: 24,
  OP_GTE: 25,
  OP_LTE: 26,

  // Jump & Function Control
  OP_JUMP: 27,
  OP_JUMP_IF_FALSE: 28,
  OP_CALL: 29,
  OP_RET: 30,

  // Console Output
  OP_PRINT_INT: 31,
  OP_PRINT_STRING: 32,

  // Additional Operations
  OP_MOD: 33,
  OP_MAP: 34,
  OP_POW: 35,

  // Servo Operations
  OP_SERVO_ATTACH: 36,
  OP_SERVO_WRITE: 37,
  OP_SERVO_READ: 38,

  // Ultrasonic Operations
  OP_ULTRASONIC_READ_CM: 39,

  // OLED Display Operations
  OP_OLED_INIT: 40,
  OP_OLED_CLEAR: 41,
  OP_OLED_UPDATE: 42,
  OP_OLED_DRAW_PIXEL: 43,
  OP_OLED_DRAW_LINE: 44,
  OP_OLED_DRAW_RECT: 45,
  OP_OLED_FILL_RECT: 46,
  OP_OLED_SET_CURSOR: 47,
  OP_OLED_SET_TEXT_SIZE: 48,
  OP_OLED_SET_TEXT_COLOR: 49,
  OP_OLED_PRINT_TEXT: 50,
  OP_OLED_PRINT_NUMBER: 51,

  //LED Strip
  OP_NEOPIXEL_INIT: 52, 
  OP_NEOPIXEL_SET_BRIGHTNESS: 53,
  OP_NEOPIXEL_SET_PIXEL: 54,
  OP_NEOPIXEL_FILL: 55,
  OP_NEOPIXEL_CLEAR: 56,
  OP_NEOPIXEL_SHOW: 57,

  // Motor Operations
  OP_MOVE_CM: 58,
  OP_TURN_DEG: 59,
  OP_MOTOR_SET_SPEED: 60,
  OP_ROBOT_STOP: 61,
  //OP_SET_PID: 62,

  //Buzzer
  OP_TONE : 62,    
  OP_NO_TONE: 63,
  
};


export function convertOpcodes(rootJsonObject) {
  const convertedProgram = rootJsonObject.program.map(instr => {
    let opNum = opcodeMap[instr.op];
    if (opNum === undefined) throw new Error("Unknown opcode: " + instr.op);
    return { op: opNum, ...(instr.arg1 !== undefined ? { arg1: instr.arg1 } : {}) };
  });

  return {
    // Conditionally include the strings array if it exists
    ...(rootJsonObject.strings && { strings: rootJsonObject.strings }),
    program: convertedProgram
  };
}