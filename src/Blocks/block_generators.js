// --- Helper Maps & Functions for Generators ---
const opMap = {
  // Arithmetic Operators
  'ADD': 'OP_ADD', 'MINUS': 'OP_SUB', 'MULTIPLY': 'OP_MUL', 'DIVIDE': 'OP_DIV', 'POWER': 'OP_POW',
  
  // Comparison Operators
  'EQ': 'OP_EQ', 'NEQ': 'OP_NEQ', 'LT': 'OP_LT', 'LTE': 'OP_LTE', 'GT': 'OP_GT', 'GTE': 'OP_GTE',
  
  // Logical Operators
  'AND': 'OP_AND', 'OR': 'OP_OR'
};


// Generic function for binary operators


const generateBinaryOpCode = (ESP32_VM) => (block) => {
    ESP32_VM.valueToCode(block, 'A', ESP32_VM.ORDER_NONE);
    ESP32_VM.valueToCode(block, 'B', ESP32_VM.ORDER_NONE);
    const op = block.getFieldValue('OP');
    if (opMap[op]) {
        ESP32_VM.instructions.push({ op: opMap[op] });
    } else { 
        throw new Error(`Unsupported operator: '${op}'.`); 
    }
    return ['', ESP32_VM.ORDER_ATOMIC];
};


export function registerGenerator(ESP32_VM) {

    // --- Generator Core Methods ---


    ESP32_VM.ORDER_ATOMIC = 0;
    ESP32_VM.ORDER_NONE = 99;

    ESP32_VM.init = function(ws) {
      ESP32_VM.workspace = ws; 
      ESP32_VM.instructions = [];
      ESP32_VM.symbolTable = new Map();
      ESP32_VM.variableCounter = 0;
      ESP32_VM.loopExitStack = [];
      ESP32_VM.functionTable = new Map();
      ESP32_VM.stringPool = [];
      ESP32_VM.stringMap = new Map();
    };


    ESP32_VM.finish = function(code) {
      let finalObject;
      if (ESP32_VM.stringPool.length > 0) {
        finalObject = {
          strings: ESP32_VM.stringPool,
          program: ESP32_VM.instructions
        };
      } else {
        finalObject = {
          program: ESP32_VM.instructions
        };
      }
      return JSON.stringify(finalObject, null, 2);
    };

    ESP32_VM.scrub_ = function(block, code, opt_thisOnly) {
        const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
        if (nextBlock && !opt_thisOnly) {
            return ESP32_VM.blockToCode(nextBlock);
        }
        return '';
    };

    // --- Generator Functions ---

    //Basics
    ESP32_VM.forBlock['esp32_program'] = function(block) {
      ESP32_VM.instructions.push({ op: "OP_SETUP_START" });
      ESP32_VM.statementToCode(block, 'SETUP');
      
      ESP32_VM.instructions.push({ op: "OP_LOOP_START" });
      const loopContentStartAddress = ESP32_VM.instructions.length;
      
      ESP32_VM.statementToCode(block, 'LOOP');
      
      ESP32_VM.instructions.push({ op: 'OP_JUMP', arg1: loopContentStartAddress });
      return null; 
    };



    
    ESP32_VM.forBlock['delay_ms'] = function(block) {
      ESP32_VM.valueToCode(block, 'MILLISECONDS', ESP32_VM.ORDER_NONE);
      ESP32_VM.instructions.push({ op: 'OP_DELAY' });
      return '';
    };

    //For Math Variables
    ESP32_VM.forBlock['math_number'] = function(block) {
      const num = Number(block.getFieldValue('NUM'));
      ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: num });
      return ['', ESP32_VM.ORDER_ATOMIC];
    };

    ESP32_VM.forBlock['math_angle'] = ESP32_VM.forBlock['math_number'];

    ESP32_VM.forBlock['math_modulo'] = function(block) {
        ESP32_VM.valueToCode(block, 'DIVIDEND', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'DIVISOR', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_MOD' });
        return ['', ESP32_VM.ORDER_ATOMIC];
    };

    ESP32_VM.forBlock['math_map'] = function(block) {
        ESP32_VM.valueToCode(block, 'VALUE', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'FROM_LOW', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'FROM_HIGH', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'TO_LOW', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'TO_HIGH', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_MAP' });
        return ['', ESP32_VM.ORDER_ATOMIC];
    };

    ESP32_VM.forBlock['logic_boolean'] = function(block) {
        const value = (block.getFieldValue('BOOL') === 'TRUE') ? 1 : 0;
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: value });
        return ['', ESP32_VM.ORDER_ATOMIC];
    };

    const binaryOpHandler = generateBinaryOpCode(ESP32_VM);
    ESP32_VM.forBlock['math_arithmetic'] = binaryOpHandler;
    ESP32_VM.forBlock['logic_compare'] = binaryOpHandler;
    ESP32_VM.forBlock['logic_operation'] = binaryOpHandler;

    // Generator for the NOT operator
    ESP32_VM.forBlock['logic_negate'] = function(block) {
        ESP32_VM.valueToCode(block, 'BOOL', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_NOT' });
        return ['', ESP32_VM.ORDER_ATOMIC];
    };



    // --- I/O Generators ---
    ESP32_VM.forBlock['pin_mode'] = function(block) {
        const pin = Number(block.getFieldValue('PIN'));   
        const mode = Number(block.getFieldValue('MODE'));

        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: pin });
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: mode });
        ESP32_VM.instructions.push({ op: 'OP_PIN_MODE' });

        return '';
    };

    ESP32_VM.forBlock['switch_check'] = function(block) {
    const pin = block.getFieldValue('SWITCH');
    const targetState = block.getFieldValue('STATE'); // '0' or '1'

    ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: Number(pin) });

    ESP32_VM.instructions.push({ op: 'OP_DIGITAL_READ' }); 

    ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: Number(targetState) });

    ESP32_VM.instructions.push({ op: 'OP_EQ' });
    return ['', ESP32_VM.ORDER_NONE];
    };

    ESP32_VM.forBlock['digital_write'] = function(block) {
        const pin = Number(block.getFieldValue('PIN'));   
        const state = Number(block.getFieldValue('STATE'));
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: pin });
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: state });
        ESP32_VM.instructions.push({ op: 'OP_DIGITAL_WRITE' });
        return '';
    };

    
    ESP32_VM.forBlock['digital_read'] = function(block) {
        ESP32_VM.valueToCode(block, 'PIN', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_DIGITAL_READ' });
        return ['', ESP32_VM.ORDER_ATOMIC];
    };

    ESP32_VM.forBlock['analog_read'] = function(block) {
        ESP32_VM.valueToCode(block, 'PIN', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_ANALOG_READ' });
        return ['', ESP32_VM.ORDER_ATOMIC];
    };

    ESP32_VM.forBlock['analog_write'] = function(block) {
        ESP32_VM.valueToCode(block, 'PIN', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'VALUE', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_ANALOG_WRITE' });
        return '';
    }

    //-- Vars Blocks --- 
    ESP32_VM.forBlock['variables_get'] = function(block) {
        const varId = block.getFieldValue('VAR');
        const varName = ESP32_VM.workspace.getVariableById(varId).name;
        
        if (ESP32_VM.symbolTable.has(varName)) {
            const varIndex = ESP32_VM.symbolTable.get(varName);
            ESP32_VM.instructions.push({ op: 'OP_LOAD', arg1: varIndex });
        } else {
            console.error(`Error: Attempted to get value of undefined variable "${varName}".`);
            ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: 0 }); 
        }
        return ['', ESP32_VM.ORDER_ATOMIC];
    };

    ESP32_VM.forBlock['variables_set'] = function(block) {
        const varId = block.getFieldValue('VAR');
        const varName = ESP32_VM.workspace.getVariableById(varId).name;

        ESP32_VM.valueToCode(block, 'VALUE', ESP32_VM.ORDER_NONE);
        
        if (!ESP32_VM.symbolTable.has(varName)) {
            ESP32_VM.symbolTable.set(varName, ESP32_VM.variableCounter++);
        }
        const varIndex = ESP32_VM.symbolTable.get(varName);
        
        ESP32_VM.instructions.push({ op: 'OP_STORE', arg1: varIndex });
        return '';
    };

    ESP32_VM.forBlock['math_change'] = function(block) {
        const varId = block.getFieldValue('VAR');
        const varName = ESP32_VM.workspace.getVariableById(varId).name;
        
        if (!ESP32_VM.symbolTable.has(varName)) {
            ESP32_VM.symbolTable.set(varName, ESP32_VM.variableCounter++);
        }
        const varIndex = ESP32_VM.symbolTable.get(varName);

        ESP32_VM.valueToCode(block, 'DELTA', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_LOAD', arg1: varIndex });
        ESP32_VM.instructions.push({ op: 'OP_ADD' });
        ESP32_VM.instructions.push({ op: 'OP_STORE', arg1: varIndex });

        return '';
    };

    //function Definition Generator
    ESP32_VM.forBlock['procedures_defnoreturn'] = function(block) {
        const funcName = block.getFieldValue('NAME');
        const funcStartAddress = ESP32_VM.instructions.length;
        ESP32_VM.functionTable.set(funcName, funcStartAddress);

        const args = block.getVars();
        const argIndices = [];
        for (const argName of args) {
            if (!ESP32_VM.symbolTable.has(argName)) {
                ESP32_VM.symbolTable.set(argName, ESP32_VM.variableCounter++);
            }
            argIndices.push(ESP32_VM.symbolTable.get(argName));
        }

        for (let i = argIndices.length - 1; i >= 0; i--) {
            ESP32_VM.instructions.push({ op: 'OP_STORE', arg1: argIndices[i] });
        }

        ESP32_VM.statementToCode(block, 'STACK');
        
        ESP32_VM.instructions.push({ op: 'OP_RET' });
        
        return null; 
    };

    ESP32_VM.forBlock['procedures_defreturn'] = function(block) {
        const funcName = block.getFieldValue('NAME');
        const funcStartAddress = ESP32_VM.instructions.length;
        ESP32_VM.functionTable.set(funcName, funcStartAddress);

        const args_ID = block.getVars();
        const argIndices = [];

        for (const argName of args_ID) {
            if (!ESP32_VM.symbolTable.has(argName)) {
                ESP32_VM.symbolTable.set(argName, ESP32_VM.variableCounter++);
            }
            argIndices.push(ESP32_VM.symbolTable.get(argName));
        }

        for (let i = argIndices.length - 1; i >= 0; i--) {
            ESP32_VM.instructions.push({ op: 'OP_STORE', arg1: argIndices[i] });
        }

        ESP32_VM.statementToCode(block, 'STACK');
        ESP32_VM.valueToCode(block, 'RETURN', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_RET' });
        
        return null; 
    };

    ESP32_VM.forBlock['procedures_ifreturn'] = function(block) {
        ESP32_VM.valueToCode(block, 'CONDITION', ESP32_VM.ORDER_NONE);
      
        const jumpIfFalseIndex = ESP32_VM.instructions.length;
        ESP32_VM.instructions.push({ op: 'OP_JUMP_IF_FALSE', arg1: -1 });
      
        ESP32_VM.valueToCode(block, 'VALUE', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_RET' });
      
        const endAddress = ESP32_VM.instructions.length;
        ESP32_VM.instructions[jumpIfFalseIndex].arg1 = endAddress;
      
        return '';
    };

    ESP32_VM.forBlock['procedures_callnoreturn'] = function(block) {
        const funcName = block.getFieldValue('NAME');
        const args = block.getVars();

        for (let i = 0; i < args.length; i++) {
            ESP32_VM.valueToCode(block, 'ARG' + i, ESP32_VM.ORDER_NONE);
        }

        if (ESP32_VM.functionTable.has(funcName)) {
            const funcAddress = ESP32_VM.functionTable.get(funcName);
            ESP32_VM.instructions.push({ op: 'OP_CALL', arg1: funcAddress });
        } else {
            console.error(`Error: Function "${funcName}" is not defined.`);
        }
        return '';
    };

    ESP32_VM.forBlock['procedures_callreturn'] = function(block) {
        const funcName = block.getFieldValue('NAME');
        const args = block.getVars();

        for (let i = 0; i < args.length; i++) {
            ESP32_VM.valueToCode(block, 'ARG' + i, ESP32_VM.ORDER_NONE);
        }

        if (ESP32_VM.functionTable.has(funcName)) {
            const funcAddress = ESP32_VM.functionTable.get(funcName);
            ESP32_VM.instructions.push({ op: 'OP_CALL', arg1: funcAddress });
        } else {
            console.error(`Error: Function "${funcName}" is not defined.`);
            ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: 0 });
        }
        
        return ['', ESP32_VM.ORDER_ATOMIC];
    };
    
    //Logical if block
    ESP32_VM.forBlock['controls_if'] = function(block) {
        let n = 0;
        let jumpToEndIndices = []; // Stores indices of jumps that need to go to the very end
        
        do {
        // Generate Condition Code
        ESP32_VM.valueToCode(block, 'IF' + n, ESP32_VM.ORDER_NONE);
        
        // If condition is false, jump to the next branch (or else)
        const jumpIfFalseIndex = ESP32_VM.instructions.length;
        ESP32_VM.instructions.push({ op: 'OP_JUMP_IF_FALSE', arg1: -1 });

        // Generate Branch Body
        ESP32_VM.statementToCode(block, 'DO' + n);

        // If we executed this branch, we must skip all remaining branches/else
        const jumpToEndIndex = ESP32_VM.instructions.length;
        ESP32_VM.instructions.push({ op: 'OP_JUMP', arg1: -1 });
        jumpToEndIndices.push(jumpToEndIndex);

        // Patch the JUMP_IF_FALSE to point here (start of next branch)
        const nextBranchIndex = ESP32_VM.instructions.length;
        ESP32_VM.instructions[jumpIfFalseIndex].arg1 = nextBranchIndex;

        n++;
        } while (block.getInput('IF' + n));

        //Generate ELSE branch (if it exists)
        if (block.getInput('ELSE')) {
        ESP32_VM.statementToCode(block, 'ELSE');
        }

        const finalEndIndex = ESP32_VM.instructions.length;
        for (const jumpIndex of jumpToEndIndices) {
        ESP32_VM.instructions[jumpIndex].arg1 = finalEndIndex;
        }

        return '';
    };

    //Loops related blocks
    ESP32_VM.forBlock['controls_repeat_ext'] = function(block) {
        ESP32_VM.valueToCode(block, 'TIMES', ESP32_VM.ORDER_NONE);
        const loopCounterIndex = ESP32_VM.variableCounter++;
        ESP32_VM.instructions.push({ op: 'OP_STORE', arg1: loopCounterIndex });
        const loopStartAddress = ESP32_VM.instructions.length;
        ESP32_VM.instructions.push({ op: 'OP_LOAD', arg1: loopCounterIndex });
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: 0 });
        ESP32_VM.instructions.push({ op: 'OP_GT' });
        const exitJumpIndex = ESP32_VM.instructions.length;
        ESP32_VM.instructions.push({ op: 'OP_JUMP_IF_FALSE', arg1: -1 });
        ESP32_VM.statementToCode(block, 'DO');
        ESP32_VM.instructions.push({ op: 'OP_LOAD', arg1: loopCounterIndex });
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: 1 });
        ESP32_VM.instructions.push({ op: 'OP_SUB' });
        ESP32_VM.instructions.push({ op: 'OP_STORE', arg1: loopCounterIndex });
        ESP32_VM.instructions.push({ op: 'OP_JUMP', arg1: loopStartAddress });
        const loopEndAddress = ESP32_VM.instructions.length;
        ESP32_VM.instructions[exitJumpIndex].arg1 = loopEndAddress;
        return '';
    };
   
    ESP32_VM.forBlock['custom_repeat'] = function(block) {
      ESP32_VM.valueToCode(block, 'TIMES', ESP32_VM.ORDER_NONE);
      const loopCounterIndex = ESP32_VM.variableCounter++;
      ESP32_VM.instructions.push({ op: 'OP_STORE', arg1: loopCounterIndex });
      const loopStartAddress = ESP32_VM.instructions.length;
      ESP32_VM.instructions.push({ op: 'OP_LOAD', arg1: loopCounterIndex });
      ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: 0 });
      ESP32_VM.instructions.push({ op: 'OP_GT' });
      const exitJumpIndex = ESP32_VM.instructions.length;
      ESP32_VM.instructions.push({ op: 'OP_JUMP_IF_FALSE', arg1: -1 });

      const breakJumps = [];
      ESP32_VM.loopExitStack.push(breakJumps);

      ESP32_VM.statementToCode(block, 'DO');

      ESP32_VM.loopExitStack.pop();
      
      ESP32_VM.instructions.push({ op: 'OP_LOAD', arg1: loopCounterIndex });
      ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: 1 });
      ESP32_VM.instructions.push({ op: 'OP_SUB' });
      ESP32_VM.instructions.push({ op: 'OP_STORE', arg1: loopCounterIndex });
      ESP32_VM.instructions.push({ op: 'OP_JUMP', arg1: loopStartAddress });
      const loopEndAddress = ESP32_VM.instructions.length;
      ESP32_VM.instructions[exitJumpIndex].arg1 = loopEndAddress;
      
      for (const jumpIndex of breakJumps) {
          ESP32_VM.instructions[jumpIndex].arg1 = loopEndAddress;
      }
      
      return '';
    };
    
    ESP32_VM.forBlock['custom_while_until'] = function(block) {
      const mode = block.getFieldValue('MODE');
      const loopConditionAddress = ESP32_VM.instructions.length;
      ESP32_VM.valueToCode(block, 'BOOL', ESP32_VM.ORDER_NONE);
      if (mode === 'UNTIL') {
          ESP32_VM.instructions.push({ op: 'OP_NOT' });
      }
      const exitJumpIndex = ESP32_VM.instructions.length;
      ESP32_VM.instructions.push({ op: 'OP_JUMP_IF_FALSE', arg1: -1 });

      const breakJumps = [];
      ESP32_VM.loopExitStack.push(breakJumps);
      ESP32_VM.statementToCode(block, 'DO');
      ESP32_VM.loopExitStack.pop();
      ESP32_VM.instructions.push({ op: 'OP_JUMP', arg1: loopConditionAddress });
      const loopEndAddress = ESP32_VM.instructions.length;
      ESP32_VM.instructions[exitJumpIndex].arg1 = loopEndAddress;
      
      for (const jumpIndex of breakJumps) {
          ESP32_VM.instructions[jumpIndex].arg1 = loopEndAddress;
      }
      
      return '';
    };

    ESP32_VM.forBlock['controls_for'] = function(block) {
        // --- GET VARIABLE NAME & ID ---
        // The standard block uses 'VAR' as the field name for the variable
        const varId = block.getFieldValue('VAR');
        const varName = ESP32_VM.workspace.getVariableById(varId).name;

        // --- MAP TO MEMORY INDEX (i -> 0, j -> 1) ---
        if (!ESP32_VM.symbolTable.has(varName)) {
            ESP32_VM.symbolTable.set(varName, ESP32_VM.variableCounter++);
        }
        const varIndex = ESP32_VM.symbolTable.get(varName);

        // --- DIRECTION CHECK (Increment vs Decrement) ---
        let compareOp = 'OP_LTE'; 
        const byBlock = block.getInputTargetBlock('BY');
        
        // Check if step is negative to switch to >= check
        if (byBlock && byBlock.type === 'math_number') {
            const stepVal = parseFloat(byBlock.getFieldValue('NUM'));
            if (stepVal < 0) {
                compareOp = 'OP_GTE'; 
            }
        }

        // --- GENERATE INSTRUCTIONS (With Shadowing Protection) ---

        // A. SHADOWING: Push current value of 'i' to stack (protects outer loops)
        ESP32_VM.instructions.push({ op: 'OP_LOAD', arg1: varIndex }); 

        // B. INITIALIZATION: i = FROM
        ESP32_VM.valueToCode(block, 'FROM', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_STORE', arg1: varIndex });

        // C. LOOP START LABEL
        const loopStartAddress = ESP32_VM.instructions.length;

        // D. CONDITION: i <= TO
        ESP32_VM.instructions.push({ op: 'OP_LOAD', arg1: varIndex });
        ESP32_VM.valueToCode(block, 'TO', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: compareOp });

        // E. EXIT JUMP (Jump if Condition False)
        const exitJumpIndex = ESP32_VM.instructions.length;
        ESP32_VM.instructions.push({ op: 'OP_JUMP_IF_FALSE', arg1: -1 });

        // F. BREAK STACK (For 'break' blocks)
        const breakJumps = [];
        ESP32_VM.loopExitStack.push(breakJumps);

        // G. BODY
        ESP32_VM.statementToCode(block, 'DO');

        // H. POP BREAK STACK
        ESP32_VM.loopExitStack.pop();

        // I. INCREMENT: i = i + BY
        ESP32_VM.instructions.push({ op: 'OP_LOAD', arg1: varIndex });
        ESP32_VM.valueToCode(block, 'BY', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_ADD' });
        ESP32_VM.instructions.push({ op: 'OP_STORE', arg1: varIndex });

        // J. JUMP BACK
        ESP32_VM.instructions.push({ op: 'OP_JUMP', arg1: loopStartAddress });

        // K. PATCH EXIT ADDRESSES
        const loopEndAddress = ESP32_VM.instructions.length;
        ESP32_VM.instructions[exitJumpIndex].arg1 = loopEndAddress;
        for (const jumpIndex of breakJumps) {
            ESP32_VM.instructions[jumpIndex].arg1 = loopEndAddress;
        }

        // L. RESTORE SHADOWED VAR (Retrieve old 'i' from stack)
        ESP32_VM.instructions.push({ op: 'OP_STORE', arg1: varIndex });

        return '';
    };

    ESP32_VM.forBlock['custom_break'] = function(block) {
        if (ESP32_VM.loopExitStack.length === 0) {
            return ''; 
        }
        const currentLoopExits = ESP32_VM.loopExitStack[ESP32_VM.loopExitStack.length - 1];
        
        const jumpIndex = ESP32_VM.instructions.length;
        ESP32_VM.instructions.push({ op: 'OP_JUMP', arg1: -1 });
        currentLoopExits.push(jumpIndex);
        
        return '';
    };

    //Console Block
    ESP32_VM.forBlock['print_console'] = function(block) {
        const inputBlock = block.getInputTargetBlock('VALUE');

        if (inputBlock && inputBlock.type === 'text') {
            const textValue = inputBlock.getFieldValue('TEXT');
            let stringIndex;

            if (ESP32_VM.stringMap.has(textValue)) {
                stringIndex = ESP32_VM.stringMap.get(textValue);
            } else {
                stringIndex = ESP32_VM.stringPool.length;
                ESP32_VM.stringPool.push(textValue);
                ESP32_VM.stringMap.set(textValue, stringIndex);
            }
            
            ESP32_VM.instructions.push({ op: 'OP_PRINT_STRING', arg1: stringIndex });

        } else {

            ESP32_VM.valueToCode(block, 'VALUE', ESP32_VM.ORDER_ATOMIC || 0);
            
            ESP32_VM.instructions.push({ op: 'OP_PRINT_INT' });
        }

        return ''; // This generator doesn't return code, it pushes instructions
    };

    //Servo Blocks
    ESP32_VM.forBlock['servo_attach'] = function(block) {
        const Servo_pin = Number(block.getFieldValue('PIN'))
        ESP32_VM.valueToCode(block, 'SERVO_INDEX', ESP32_VM.ORDER_NONE);       
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: Servo_pin });  
        ESP32_VM.instructions.push({ op: 'OP_SERVO_ATTACH' });
        return '';
    };

    ESP32_VM.forBlock['servo_write'] = function(block) {
        ESP32_VM.valueToCode(block, 'SERVO_INDEX', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'ANGLE', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_SERVO_WRITE' });
        return '';
    };

    ESP32_VM.forBlock['servo_read'] = function(block) {
        ESP32_VM.valueToCode(block, 'SERVO_INDEX', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_SERVO_READ' });
        return ['', ESP32_VM.ORDER_ATOMIC];
    };

    //Ultrasonic Block
    ESP32_VM.forBlock['ultrasonic_read_cm'] = function(block) {
        const Trig_pin = Number(block.getFieldValue('TRIG_PIN'));
        const echo_pin = Number(block.getFieldValue('ECHO_PIN'));
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: Trig_pin });  
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: echo_pin });  

        ESP32_VM.instructions.push({ op: 'OP_ULTRASONIC_READ_CM' });
        return ['', ESP32_VM.ORDER_ATOMIC];
    };

    //OLED Blocks
    ESP32_VM.forBlock['oled_init'] = function(block) {
        ESP32_VM.instructions.push({ op: 'OP_OLED_INIT' });
        return '';
    };

    ESP32_VM.forBlock['oled_clear'] = function(block) {
        ESP32_VM.instructions.push({ op: 'OP_OLED_CLEAR' });
        return '';
    };

    ESP32_VM.forBlock['oled_update'] = function(block) {
        ESP32_VM.instructions.push({ op: 'OP_OLED_UPDATE' });
        return '';
    };

    ESP32_VM.forBlock['oled_draw_pixel'] = function(block) {
        ESP32_VM.valueToCode(block, 'X', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'Y', ESP32_VM.ORDER_NONE);
        const color = Number(block.getFieldValue('COLOR'));
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: color });
        ESP32_VM.instructions.push({ op: 'OP_OLED_DRAW_PIXEL' });
        return '';
    };

    ESP32_VM.forBlock['oled_draw_line'] = function(block) {
        ESP32_VM.valueToCode(block, 'X1', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'Y1', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'X2', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'Y2', ESP32_VM.ORDER_NONE);
        const color = Number(block.getFieldValue('COLOR'));
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: color });
        ESP32_VM.instructions.push({ op: 'OP_OLED_DRAW_LINE' });
        return '';
    };

    ESP32_VM.forBlock['oled_draw_rect'] = function(block) {
        ESP32_VM.valueToCode(block, 'X', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'Y', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'WIDTH', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'HEIGHT', ESP32_VM.ORDER_NONE);
        const color = Number(block.getFieldValue('COLOR'));
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: color });
        ESP32_VM.instructions.push({ op: 'OP_OLED_DRAW_RECT' });
        return '';
    };

    ESP32_VM.forBlock['oled_fill_rect'] = function(block) {
        ESP32_VM.valueToCode(block, 'X', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'Y', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'WIDTH', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'HEIGHT', ESP32_VM.ORDER_NONE);
        const color = Number(block.getFieldValue('COLOR'));
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: color });
        ESP32_VM.instructions.push({ op: 'OP_OLED_FILL_RECT' });
        return '';
    };

    ESP32_VM.forBlock['oled_set_cursor'] = function(block) {
        ESP32_VM.valueToCode(block, 'X', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'Y', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_OLED_SET_CURSOR' });
        return '';
    };

    ESP32_VM.forBlock['oled_set_text_size'] = function(block) {
        ESP32_VM.valueToCode(block, 'SIZE', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_OLED_SET_TEXT_SIZE' });
        return '';
    };

    ESP32_VM.forBlock['oled_set_text_color'] = function(block) {
        const color = Number(block.getFieldValue('COLOR'));
        // *** THIS IS THE LINE I FIXED ***
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: color });
        ESP32_VM.instructions.push({ op: 'OP_OLED_SET_TEXT_COLOR' });
        return '';
    };

ESP32_VM.forBlock['oled_print'] = function(block) {
    // Get the block connected to the 'TEXT' input
    const inputBlock = block.getInputTargetBlock('TEXT');

    // Check if the connected block is a static 'text' block
    if (inputBlock && inputBlock.type === 'text') {
        const textValue = inputBlock.getFieldValue('TEXT');
        let stringIndex;

        if (ESP32_VM.stringMap.has(textValue)) {
            stringIndex = ESP32_VM.stringMap.get(textValue);
        } else {
            stringIndex = ESP32_VM.stringPool.length;
            ESP32_VM.stringPool.push(textValue);
            ESP32_VM.stringMap.set(textValue, stringIndex);
        }
        
        // Push the instruction to print a static string from the pool
        ESP32_VM.instructions.push({ op: 'OP_OLED_PRINT_TEXT', arg1: stringIndex });

    } else {
        ESP32_VM.valueToCode(block, 'TEXT', ESP32_VM.ORDER_ATOMIC || 0);
        
        ESP32_VM.instructions.push({ op: 'OP_OLED_PRINT_NUMBER' });
    }

    return ''; 
};


    // LED Strip Blocks 

    // Initialize LED Strip
    ESP32_VM.forBlock['led_init'] = function(block) {
        var numPixels = block.getFieldValue('NUM_PIXELS');
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: numPixels });

        ESP32_VM.valueToCode(block, 'PIN', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_NEOPIXEL_INIT' });
        return ''; // Statement block
    };

    // Generator for the new (R) (G) (B) color block
    ESP32_VM.forBlock['color_rgb'] = function(block) {
        const r = Number(block.getFieldValue('R'));
        const g = Number(block.getFieldValue('G'));
        const b = Number(block.getFieldValue('B'));
        
        // Calculate the 32-bit color value
        // (R << 16) | (G << 8) | B
        const color = (r << 16) | (g << 8) | b;
        
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: color });
        return ['', ESP32_VM.ORDER_ATOMIC];
    };

    // Set Pixel Color
    ESP32_VM.forBlock['led_set_pixel'] = function(block) {
        // VM pops: index, then color
        // We push: color, then index
        ESP32_VM.valueToCode(block, 'COLOR', ESP32_VM.ORDER_NONE);
        ESP32_VM.valueToCode(block, 'PIXEL_ID', ESP32_VM.ORDER_NONE); 
        ESP32_VM.instructions.push({ op: 'OP_NEOPIXEL_SET_PIXEL' });
        return ''; // This is a statement block
    };

    // Fill All Pixels
    ESP32_VM.forBlock['led_fill_all'] = function(block) {
        // VM pops: color
        // We push: color
        ESP32_VM.valueToCode(block, 'COLOR', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_NEOPIXEL_FILL' });
        return ''; // Statement block
    };

    // Set Brightness
    ESP32_VM.forBlock['led_set_brightness'] = function(block) {
        // VM pops: brightness
        // We push: brightness
        ESP32_VM.valueToCode(block, 'BRIGHTNESS', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_NEOPIXEL_SET_BRIGHTNESS' });
        return ''; // Statement block
    };

    // Clear All LEDs
    ESP32_VM.forBlock['led_clear_all'] = function(block) {
        ESP32_VM.instructions.push({ op: 'OP_NEOPIXEL_CLEAR' });
        return ''; // Statement block
    };

    // Show LED Changes
    ESP32_VM.forBlock['led_show_changes'] = function(block) {
        ESP32_VM.instructions.push({ op: 'OP_NEOPIXEL_SHOW' });
        return ''; // Statement block
    };

           
    // --- Motor Blocks ---
    ESP32_VM.forBlock['robot_move_cm'] = function(block) {
        // C code pops speed, then distance. So we push distance, then speed.
        ESP32_VM.valueToCode(block, 'DISTANCE', ESP32_VM.ORDER_NONE);
        //ESP32_VM.valueToCode(block, 'SPEED', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_MOVE_CM' });
        return '';
    };

    ESP32_VM.forBlock['robot_turn_deg'] = function(block) {
        const direction = block.getFieldValue('DIRECTION');

        const angleBlock = block.getInputTargetBlock('DEGREES');
        let angleValue = angleBlock ? parseFloat(angleBlock.getFieldValue('NUM')) : 0;

        if (direction === 'LEFT') {
            angleValue = -angleValue;
        }

        ESP32_VM.instructions.push({
            op: 'OP_PUSH',
            arg1: angleValue
        });
        //ESP32_VM.valueToCode(block, 'SPEED', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_TURN_DEG' });
        return '';  
    };


    ESP32_VM.forBlock['motor_set_speed'] = function(block) {
        const motorIndex = Number(block.getFieldValue('MOTOR_ID'));

        // C code pops speed, then motor index. So we push index, then speed.
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: motorIndex });
        ESP32_VM.valueToCode(block, 'SPEED', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_MOTOR_SET_SPEED' });
        return '';
    };

    ESP32_VM.forBlock['robot_stop'] = function(block) {
        ESP32_VM.instructions.push({ op: 'OP_ROBOT_STOP' });
        return '';
    };

    ESP32_VM.forBlock['robot_set_pid'] = function(block) {
        const p = Number(block.getFieldValue('P'));
        const i = Number(block.getFieldValue('I'));
        const d = Number(block.getFieldValue('D'));

        // C code pops D, I, P, so we push P, I, D.
        // Values are multiplied by 1000 to be sent as integers.
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: Math.round(p * 1000) });
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: Math.round(i * 1000) });
        ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: Math.round(d * 1000) });
        
        ESP32_VM.instructions.push({ op: 'OP_SET_PID' });
        return '';
    };

    ESP32_VM.forBlock['buzzer_tone'] = function(block) {
        ESP32_VM.valueToCode(block, 'FREQ', ESP32_VM.ORDER_NONE);
        ESP32_VM.instructions.push({ op: 'OP_TONE' });
        return '';
    };

    ESP32_VM.forBlock['buzzer_notone'] = function(block) {
        ESP32_VM.instructions.push({ op: 'OP_NO_TONE' });
        return '';
    };

    ESP32_VM.forBlock['play_4_note_tune'] = function(block) {
        const delayMs = block.getFieldValue('DELAY');
        
        // Gather the 4 notes into a simple array (JavaScript side only)
        const notes = [
            block.getFieldValue('N1'),
            block.getFieldValue('N2'),
            block.getFieldValue('N3'),
            block.getFieldValue('N4')
        ];

        // Loop through the notes and generate instructions for each
        notes.forEach(note => {
            const freq = parseInt(note);

            if (freq > 0) {
                // 2. PUSH FREQ
                ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: freq });
                
                // 3. PLAY TONE
                ESP32_VM.instructions.push({ op: 'OP_TONE' });
                
                // 4. WAIT (Blocking Delay)
                // Assuming you have a standard delay opcode, e.g., OP_DELAY (usually opcode 11 or similar)
                // We push the time, then the delay command
                ESP32_VM.instructions.push({ op: 'OP_PUSH', arg1: parseInt(delayMs) });
                ESP32_VM.instructions.push({ op: 'OP_DELAY' }); 
            }
        });

        // Optional: Silence at the end
        ESP32_VM.instructions.push({ op: 'OP_NO_TONE' });

        return '';
    };

}