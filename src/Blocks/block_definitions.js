import * as Blockly from 'blockly'; 


export function registerCustomBlocks() {

  // Custom Integer Number Block
  Blockly.Blocks['math_number'] = {
    init: function () {
      this.appendDummyInput()
        .appendField(new Blockly.FieldNumber(0, null, null, 1), "NUM");
      // min=null, max=null → no limit
      // precision=1 → integers only
      this.setOutput(true, "Number");
      this.setColour(230);
      this.setTooltip("An integer (positive or negative)");
      this.setHelpUrl("");
    }
  };
  
  // Custom Angle Block
  Blockly.Blocks['math_angle'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldNumber(90, 0, 180, 1), "NUM"); // Default 90, min 0, max 180, integer only
      this.setOutput(true, "Number");
      this.setColour("#6633cc"); // Math block color
      this.setTooltip("An angle value from 0 to 180.");
      this.setHelpUrl("");
    }
  }

  Blockly.defineBlocksWithJsonArray([
      {
        "type": "esp32_program",
        "message0": "%{BKY_ESP32_PROGRAM_MSG}",
        "args0": [
          { "type": "input_dummy" },
          { "type": "input_statement", "name": "SETUP" },
          { "type": "input_dummy" },
          { "type": "input_statement", "name": "LOOP" },
          { "type": "input_dummy" }
        ],
        "colour": "#5b80a5",
        "tooltip": "%{BKY_ESP32_PROGRAM_TOOLTIP}"
      },
      {
        "type": "delay_ms",
        "message0": "%{BKY_DELAY_MS_MSG}",
        "args0": [
          { "type": "input_value", "name": "MILLISECONDS", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#5b80a5",
        "tooltip": "%{BKY_DELAY_MS_TOOLTIP}"
      },
      {
        "type": "pin_mode",
        "message0": "%{BKY_PIN_MODE_MSG}",
        "args0": [
          { 
            "type": "field_dropdown", 
            "name": "PIN", 
            "options": [ ["12", "12"], ["27", "27"], ["23", "23"], ["5", "5"]
            ]
          },
          { "type": "field_dropdown", "name": "MODE", "options": [
              ["%{BKY_OPT_OUTPUT}", "1"], 
              ["%{BKY_OPT_INPUT}", "0"]
            ]
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4a654f",
        "tooltip": "%{BKY_PIN_MODE_TOOLTIP}"
      },
      {
        "type": "switch_check",
        "message0": "%{BKY_SWITCH_CHECK_MSG}",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "SWITCH",
            "options": [
              ["PB1", "33"],
              ["PB2", "26"]
            ]
          },
          {
            "type": "field_dropdown",
            "name": "STATE",
            "options": [
              ["%{BKY_SWITCH_TRIGGERED}", "0"],
              ["%{BKY_SWITCH_NOT_TRIGGERED}", "1"]
            ]
          }
        ],
        "output": "Boolean",
        "colour": "#4a654f",
        "tooltip": "%{BKY_SWITCH_CHECK_TOOLTIP}"
      },
      {
        "type": "digital_write",
        "message0": "%{BKY_DIGITAL_WRITE_MSG}",
        "args0": [
          { 
            "type": "field_dropdown", 
            "name": "PIN", 
            "options": [
              ["12", "12"], ["27", "27"], ["23", "23"], ["5", "5"] // Both
              //["35", "35"], ["36", "36"], ["39", "39"], // Input Only Pins 
            ]
          },
          { "type": "field_dropdown", "name": "STATE", "options": [
              ["%{BKY_OPT_HIGH}", "1"], 
              ["%{BKY_OPT_LOW}", "0"]
            ]
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4a654f",
        "tooltip": "%{BKY_DIGITAL_WRITE_TOOLTIP}"
      },
      {
        "type": "digital_read",
        "message0": "%{BKY_DIGITAL_READ_MSG}",
        "args0": [
          { 
            "type": "field_dropdown", 
            "name": "PIN", 
            "options": [
              ["12", "12"], ["27", "27"], ["23", "23"], ["5", "5"], // Both
              ["35", "35"], ["36", "36"], ["39", "39"], // Input Only Pins 
            ]
          }
        ],
        "output": "Number",
        "colour": "#4a654f",
        "tooltip": "%{BKY_DIGITAL_READ_TOOLTIP}"
      },
      {
        "type": "analog_read",
        "message0": "%{BKY_ANALOG_READ_MSG}",
        "args0": [
          { 
            "type": "field_dropdown", 
            "name": "PIN", 
            "options": [
              ["12", "12"], ["27", "27"], ["23", "23"], ["5", "5"], // Both
              ["35", "35"], ["36", "36"], ["39", "39"] // Input Only Pins 
            ]
          }
        ],
        "output": "Number",
        "colour": "#4a654f",
        "tooltip": "%{BKY_ANALOG_READ_TOOLTIP}"
      },
      {
        "type": "analog_write",
        "message0": "%{BKY_ANALOG_WRITE_MSG}",
        "args0": [
          { 
            "type": "field_dropdown", 
            "name": "PIN", 
            "options": [
              ["12", "12"], ["27", "27"], ["23", "23"], ["5", "5"] // Both
              //["35", "35"], ["36", "36"], ["39", "39"], // Input Only Pins
            ]
          },
          { "type": "input_value", "name": "VALUE", "check": "Number" }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#4a654f",
        "tooltip": "%{BKY_ANALOG_WRITE_TOOLTIP}"
      },
      {
        "type": "custom_for",
        "message0": "%{BKY_CUSTOM_FOR_MSG}",
        "args0": [
            {
            "type": "field_variable",
            "name": "VAR",
            "variable": "i"
            },
            {
            "type": "input_value",
            "name": "FROM",
            "check": "Number",
            "align": "RIGHT"
            },
            {
            "type": "input_value",
            "name": "TO",
            "check": "Number",
            "align": "RIGHT"
            },
            {
            "type": "input_value",
            "name": "BY",
            "check": "Number",
            "align": "RIGHT"
            },
            {
            "type": "input_dummy"
            },
            {
            "type": "input_statement",
            "name": "DO"
            }
        ],
        "inputsInline": true,
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#5ba55b",
        "tooltip": "%{BKY_CUSTOM_FOR_TOOLTIP}",
        "helpUrl": ""
        },
        {
            "type": "custom_while_until",
            "message0": "%{BKY_CUSTOM_WHILE_MSG}",
            "args0": [
                {
                "type": "field_dropdown",
                "name": "MODE",
                "options": [
                    [ "%{BKY_OPT_LOOP_WHILE}", "WHILE" ],
                    [ "%{BKY_OPT_LOOP_UNTILL}", "UNTIL" ]
                ]
                },
                {
                "type": "input_value",
                "name": "BOOL",
                "check": "Boolean"
                },
                {
                "type": "input_dummy"
                },
                {
                "type": "input_statement",
                "name": "DO"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#5ba55b",
            "tooltip": "%{BKY_CUSTOM_WHILE_TOOLTIP}",
            "helpUrl": ""
        } ,
        {
        "type": "custom_repeat",
        "message0": "%{BKY_CUSTOM_REPEAT_MSG}",
        "args0": [
            {
            "type": "input_value",
            "name": "TIMES",
            "check": "Number"
            },
            {
            "type": "input_dummy"
            },
            {
            "type": "input_statement",
            "name": "DO"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#5ba55b",
        "tooltip": "%{BKY_CUSTOM_REPEAT_TOOLTIP}"
        },
        {
        "type": "custom_break",
        "message0": "%{BKY_CUSTOM_BREAK_MSG}",
        "previousStatement": null,
        "colour": "#5ba55b",
        "tooltip": "%{BKY_CUSTOM_BREAK_TOOLTIP}",
        "helpUrl": ""
        },
        {
        "type": "print_console",
        "message0": "%{BKY_PRINT_CONSOLE_MSG}",
        "args0": [
          {
            "type": "input_value",
            "name": "VALUE",
            "check": ["String", "Number"]
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#a55b80",
        "tooltip": "%{BKY_PRINT_CONSOLE_TOOLTIP}"
      },
      {
        "type": "math_modulo",
        "message0": "%{BKY_MATH_MODULO_MSG}",
        "args0": [
          {
            "type": "input_value",
            "name": "DIVIDEND",
            "check": "Number"
          },
          {
            "type": "input_value",
            "name": "DIVISOR",
            "check": "Number"
          }
        ],
        "inputsInline": true,
        "output": "Number",
        "colour": '#6633cc',
        "tooltip": "%{BKY_MATH_MODULO_TOOLTIP}",
        "helpUrl": ""
    },
    {
    "type": "math_map",
    "message0": "%{BKY_MATH_MAP_MSG}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "FROM_LOW",
        "check": "Number",
        "align": "RIGHT",
        "shadow": {
          "type": "math_number",
          "fields": {
            "NUM": 0
          }
        }
      },
      {
        "type": "input_value",
        "name": "FROM_HIGH",
        "check": "Number",
        "align": "RIGHT",
        "shadow": {
          "type": "math_number",
          "fields": {
            "NUM": 1023
          }
        }
      },
      {
        "type": "input_value",
        "name": "TO_LOW",
        "check": "Number",
        "align": "RIGHT",
        "shadow": {
          "type": "math_number",
          "fields": {
            "NUM": 0
          }
        }
      },
      {
        "type": "input_value",
        "name": "TO_HIGH",
        "check": "Number",
        "align": "RIGHT",
        "shadow": {
          "type": "math_number",
          "fields": {
            "NUM": 255
          }
        }
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": '#6633cc',
    "tooltip": "%{BKY_MATH_MAP_TOOLTIP}"
  },
    {
      "type": "servo_attach",
      "message0": "%{BKY_SERVO_ATTACH_MSG}",
      "args0": [
        { "type": "input_value", "name": "SERVO_INDEX", "check": "Number" },
        { 
          "type": "field_dropdown", 
          "name": "PIN", 
          "options": [
            ["12", "12"], ["27", "27"], ["23", "23"], ["5", "5"] // Both
          ]
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#22a6b3",
      "tooltip": "%{BKY_SERVO_ATTACH_TOOLTIP"
    },
      {
      "type": "servo_write",
      "message0": "%{BKY_SERVO_WRITE_MSG}",
      "args0": [
        { "type": "input_value", "name": "SERVO_INDEX", "check": "Number" },
        { "type": "input_value", "name": "ANGLE", "check": "Number" }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#22a6b3",
      "tooltip": "%{BKY_SERVO_WRITE_TOOLTIP"
    },
    {
      "type": "servo_read",
      "message0": "%{BKY_SERVO_READ_MSG}",
      "args0": [
        { "type": "input_value", "name": "SERVO_INDEX", "check": "Number" }
      ],
      "output": "Number",
      "colour": "#22a6b3",
      "tooltip": "%{BKY_SERVO_READ_TOOLTIP}"
    },
    // --- Ultrasonic ---
    
    {
      "type": "ultrasonic_read_cm",
      "message0": "%{BKY_ULTRASONIC_READ_MSG}",
      "args0": [
        { 
          "type": "field_dropdown", 
          "name": "TRIG_PIN", 
          "options": [
            ["12", "12"], ["27", "27"], ["23", "23"], ["5", "5"],
          ]
        },
        { 
          "type": "field_dropdown", 
          "name": "ECHO_PIN", 
          "options": [
            ["12", "12"], ["27", "27"], ["23", "23"], ["5", "5"],
          ]
        }
      ],
      "inputsInline": true,
      "output": "Number",
      "colour": "#ffa14a", 
      "tooltip": "%{BKY_ULTRASONIC_READ_TOOLTIP}"
    },

    // --- OLED Display ---
    {
        "type": "oled_init",
        "message0": "%{BKY_OLED_INIT_MSG}",
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#745ba5",
        "tooltip": "%{BKY_OLED_INIT_TOOLTIP}"
      },
      {
        "type": "oled_clear",
        "message0": "%{BKY_OLED_CLEAR_MSG}",
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#745ba5",
        "tooltip": "%{BKY_OLED_CLEAR_TOOLTIP}"
      },
      {
        "type": "oled_update",
        "message0": "%{BKY_OLED_UPDATE_MSG}",
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#745ba5",
        "tooltip": "%{BKY_OLED_UPDATE_TOOLTIP}"
      },
      {
        "type": "oled_draw_pixel",
        "message0": "%{BKY_OLED_DRAW_PIXEL_MSG}",
        "args0": [
          { "type": "input_value", "name": "X", "check": "Number" },
          { "type": "input_value", "name": "Y", "check": "Number" },
          { "type": "field_dropdown", "name": "COLOR", "options": [["%{BKY_OPT_WHITE}", "1"], ["%{BKY_OPT_BLACK}", "0"]] }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#745ba5",
        "tooltip": ""
      },
      {
        "type": "oled_draw_line",
        "message0": "%{BKY_OLED_DRAW_LINE_MSG}",
        "args0": [
          { "type": "input_value", "name": "X1", "check": "Number" },
          { "type": "input_value", "name": "Y1", "check": "Number" },
          { "type": "input_value", "name": "X2", "check": "Number" },
          { "type": "input_value", "name": "Y2", "check": "Number" },
          { "type": "field_dropdown", "name": "COLOR", "options": [["%{BKY_OPT_WHITE}", "1"], ["%{BKY_OPT_BLACK}", "0"]] }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#745ba5",
        "tooltip": ""
      },
  {
      "type": "oled_draw_rect",
      "message0": "%{BKY_OLED_DRAW_RECT_MSG}",
      "args0": [
          { "type": "input_value", "name": "X", "check": "Number" },
          { "type": "input_value", "name": "Y", "check": "Number" },
          { "type": "input_value", "name": "WIDTH", "check": "Number" },
          { "type": "input_value", "name": "HEIGHT", "check": "Number" },
          { "type": "field_dropdown", "name": "COLOR", "options": [["%{BKY_OPT_WHITE}", "1"], ["%{BKY_OPT_BLACK}", "0"]] }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#745ba5",
      "tooltip": "Draws an outlined rectangle."
  },
  {
      "type": "oled_fill_rect",
      "message0": "%{BKY_OLED_FILL_RECT_MSG}",
      "args0": [
          { "type": "input_value", "name": "X", "check": "Number" },
          { "type": "input_value", "name": "Y", "check": "Number" },
          { "type": "input_value", "name": "WIDTH", "check": "Number" },
          { "type": "input_value", "name": "HEIGHT", "check": "Number" },
          { "type": "field_dropdown", "name": "COLOR", "options": [["%{BKY_OPT_WHITE}", "1"], ["%{BKY_OPT_BLACK}", "0"]] }
      ],
      //"inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#745ba5",
      "tooltip": "Draws a solid, filled rectangle."
  },
  {
        "type": "oled_set_cursor",
        "message0": "%{BKY_OLED_SET_CURSOR_MSG}",
        "args0": [
          { "type": "input_value", "name": "X", "check": "Number" },
          { "type": "input_value", "name": "Y", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true,
        "colour": "#745ba5",
        "tooltip": ""
      },
  {
        "type": "oled_set_text_size",
        "message0": "%{BKY_OLED_SET_TEXT_SIZE_MSG}",
        "args0": [
          { "type": "input_value", "name": "SIZE", "check": "Number" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#745ba5",
        "tooltip": ""
      },
  {
      "type": "oled_set_text_color",
      "message0": "%{BKY_OLED_SET_TEXT_COLOR_MSG}",
      "args0": [
          { "type": "field_dropdown", "name": "COLOR", "options": [["%{BKY_OPT_WHITE}", "1"], ["%{BKY_OPT_BLACK}", "0"]] }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#745ba5",
      "tooltip": "Sets the color for text."
  },
  {
      "type": "oled_print",
      "message0": "%{BKY_OLED_PRINT_MSG}",
      "args0": [
        { "type": "input_value", "name": "TEXT" }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#745ba5",
      "tooltip": ""
    },

// --- Motor Blocks ---
    {
      "type": "robot_move_cm",
      "message0": "%{BKY_ROBOT_MOVE_MSG}",
      "args0": [
        { "type": "input_value", "name": "DISTANCE", "check": "Number" }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#a55b5b",
      "tooltip": "%{BKY_ROBOT_MOVE_TOOLTIP}"
    },
    {
      "type": "robot_turn_deg",
      "message0": "%{BKY_ROBOT_TURN_MSG}",
      "args0": [
        { "type": "field_dropdown", "name": "DIRECTION", "options": [
            ["%{BKY_OPT_RIGHT}", "RIGHT"], 
            ["%{BKY_OPT_LEFT}", "LEFT"]
          ] 
        },
        { "type": "input_value", "name": "DEGREES", "check": "Number" }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#a55b5b",
      "tooltip": "%{BKY_ROBOT_TURN_TOOLTIP}"
    },
    {
      "type": "motor_set_speed",
      "message0": "%{BKY_MOTOR_SET_SPEED_MSG}",
      "args0": [
        { "type": "field_dropdown", "name": "MOTOR_ID", "options": [["%{BKY_OPT_LEFT}", "0"], ["%{BKY_OPT_RIGHT}", "2"]]},
        { "type": "input_value", "name": "SPEED", "check": "Number" }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#a55b5b",
      "tooltip": "%{BKY_MOTOR_SET_SPEED_TOOLTIP}"
    },
    {
      "type": "robot_stop",
      "message0": "%{BKY_ROBOT_STOP_MSG}",
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#a55b5b",
      "tooltip": "%{BKY_ROBOT_STOP_TOOLTIP}"
    },
    {
      "type": "robot_stop",
      "message0": "%{BKY_ROBOT_STOP_MSG}",
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#a55b5b",
      "tooltip": "%{BKY_ROBOT_STOP_TOOLTIP}"
    },
    {
      "type": "robot_set_pid",
      "message0": "%{BKY_ROBOT_SET_PID_MSG}",
      "args0": [
          { "type": "field_number", "name": "P", "value": 2, "min": 0, "precision": 0.001 },
          { "type": "field_number", "name": "I", "value": 5, "min": 0, "precision": 0.001 },
          { "type": "field_number", "name": "D", "value": 1, "min": 0, "precision": 0.001 }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#a56b5b",
      "tooltip": "Set the PID constants for accurate movement."
    },
      //LED strip commands
    {
      "type": "led_init",
      "message0": "%{BKY_LED_INIT_MSG}",
      "args0": [
        {
          "type": "input_value",
          "name": "PIN",
          "check": "Number"
        },
        {
          "type": "field_number",
          "name": "NUM_PIXELS",
          "value": 5,
          "min": 0,
          "max": 64
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#008080",
      "tooltip": "Sets up the LED strip. Must be used in 'On Start'."
    },
    {
      "type": "color_rgb",
      "message0": "%{BKY_LED_COLOR_RGB_MSG}",
      "args0": [
        {
          "type": "field_number",
          "name": "R",
          "value": 255,
          "min": 0,
          "max": 255,
          "precision": 1
        },
        {
          "type": "field_number",
          "name": "G",
          "value": 0,
          "min": 0,
          "max": 255,
          "precision": 1
        },
        {
          "type": "field_number",
          "name": "B",
          "value": 0,
          "min": 0,
          "max": 255,
          "precision": 1
        }
      ],
      "inputsInline": true,
      "output": "Color",
      "colour": "#008080",
      "tooltip": "Creates a 32-bit color value from R, G, B components.",
      "helpUrl": ""
    },
    {
      "type": "led_set_pixel",
      "message0": "%{BKY_LED_SET_PIXEL_MSG}",
      "args0": [
        {
          "type": "input_value",
          "name": "PIXEL_ID",
          "check": "Number"
        },
        {
          "type": "input_value",
          "name": "COLOR",
          "check": "Color"
        }
      ],
      "inputsInline": true,
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#008080",
      "tooltip": "Sets a single LED to a specific color. Must 'Show Changes' to see."
    },
    {
      "type": "led_fill_all",
      "message0": "%{BKY_LED_FILL_ALL_MSG}",
      "args0": [
        {
          "type": "input_value",
          "name": "COLOR",
          "check": "Color"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#008080",
      "tooltip": "Sets all LEDs to the same color. Must 'Show Changes' to see."
    },
    {
      "type": "led_set_brightness",
      "message0": "%{BKY_LED_SET_BRIGHTNESS_MSG}",
      "args0": [
        {
          "type": "input_value",
          "name": "BRIGHTNESS",
          "value":0, 
          "min": 0,
          "max": 255
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#008080",
      "tooltip": "Sets the brightness of all LEDs (0-255)."
    },
    {
      "type": "led_clear_all",
      "message0": "%{BKY_LED_CLEAR_ALL_MSG}",
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#008080",
      "tooltip": "Turns all LEDs off. Must 'Show Changes' to see."
    },
    {
      "type": "led_show_changes",
      "message0": "%{BKY_LED_SHOW_CHANGES_MSG}",
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#008080",
      "tooltip": "Displays all pending LED changes on the strip."
    },
    //Buzzer stuff
    {
      "type": "buzzer_tone",
      "message0": "%{BKY_BUZZER_TONE_MSG}",
      "args0": [
        {
          "type": "input_value",
          "name": "FREQ",
          "check": "Number"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#D4AF37",
      "tooltip": "%{BKY_BUZZER_TONE_TOOLTIP}"
    },
    {
      "type": "buzzer_notone",
      "message0": "%{BKY_BUZZER_NOTONE_MSG}",
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#D4AF37",
      "tooltip": "%{BKY_BUZZER_NOTONE_TOOLTIP}"
    },
    {
      "type": "play_4_note_tune",
      "message0": "%{BKY_BUZZER_4_NOTE_MSG}",
      "args0": [
        { "type": "field_number", "name": "DELAY", "value": 200 },
        { "type": "input_dummy" },
        { "type": "field_number", "name": "N1", "value": 262 },
        { "type": "input_dummy" },
        { "type": "field_number", "name": "N2", "value": 294 },
        { "type": "input_dummy" },
        { "type": "field_number", "name": "N3", "value": 330 },
        { "type": "input_dummy" },
        { "type": "field_number", "name": "N4", "value": 349 }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "#D4AF37",
      "tooltip": "%{BKY_BUZZER_4_NOTE_TOOLTIP}"
    }

    ]);
}
