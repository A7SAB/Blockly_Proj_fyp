export const en = {
    rtl: false,
    font: "Segoe UI, sans-serif, Montserrat" , // Standard font

    // --- UI Translations ---
    UI_APP_TITLE: "Blockly Web App",
    UI_CONNECT: "Connect",
    UI_DISCONNECT: "Disconnect",
    UI_STATUS_OFFLINE: "Offline",
    UI_STATUS_ONLINE: "Online",
    UI_SETTINGS_TITLE: "Settings",
    UI_THEME_LABEL: "Theme",
    UI_THEME_DARK: "Dark Theme",
    UI_THEME_LIGHT: "Light",
    UI_LANGUAGE_LABEL: "Language",
    UI_CLOSE: "Close",
    UI_SAVE: "Save",
    UI_LOAD: "Load",
    UI_SAVE_CONFIRM: "Save Program",
    UI_SAVE_TITLE: "Save Program",
    UI_CONFIRM_MSG: "Are you sure?",
    UI_SHOW_ADVANCED: "Show Advanced Panels",

    UI_RUN: "Run",
    UI_STOP: "Stop",
    UI_BYTECODE: "Bytecode",
    UI_LOGS: "Logs",
    UI_CONSOLE: "Console",
    UI_CLEAR_LOGS: "Clear Logs",

    UI_ROBOT_CONFIG: "Robot Configuration",
    UI_ROBOT_ID: "Robot ID (Prefix):",

    UI_MQTT_CONNECTION: "MQTT Connection",
    UI_BROKER: "Broker:",
    UI_PORT: "Port:",

    UI_LOAD_CONFIRMATION_MSG: "This will replace your current workspace. Are you sure?",
    UI_CONFIRMATION_TITLE: "Confirmation",
    UI_CONFIRM: "Confirm",

    UI_ALERT_TITLE: "Alert!",
    UI_OK: "OK",

    UI_VARIABLE_SETTINGS: "Variable Settings",
    UI_CREATE: "Create",
    UI_CANCEL: "Cancel",

    // MQTT & Connection Status
    UI_CONNECT: "Connect",
    UI_DISCONNECT: "Disconnect",
    UI_STATUS_ONLINE: "Online",
    UI_STATUS_OFFLINE: "Offline",
    UI_STATUS_FAIL: "Connection Failed",
    UI_STATUS_WAITING: "Waiting for Robot...",
    UI_STATUS_CONNECTING: "Connecting...",
    
    // Alert Messages
    MSG_BROKER_CONNECTED: "Connected to broker successfully!",
    MSG_BROKER_DISCONNECTED: "Disconnected from broker.",
    MSG_BROKER_FAIL: "Connection failed. Check broker address.",
    MSG_ROBOT_ONLINE: "Robot is ONLINE.",
    MSG_ROBOT_OFFLINE: "Robot is OFFLINE.",
    MSG_PROGRAM_SENT: "Program sent to robot!",
    MSG_NO_BROKER: "Error: Web Browser is not connected to MQTT Broker.",

    //Errors
    BLOCK_ONE_TYPE_ALLOWED: "Only one block of this type is allowed.",
    UNSAFE_PRINT_ERROR:
    "CRITICAL ERROR: Unsafe Print Detected!\n\n" +
    "You are printing to the console inside the loop without a delay.\n\n" +
    "Please add a 'Pause' of at least 50 ms.",
    BLOCK_EMPTY_INPUT_ERROR: "Error: You have an empty input! Please fill in the missing block.",
    MSG_FILE_EXT_ERROR: "This file type ('.%1') cannot be loaded as a workspace. Only .xml files are supported.",
    MSG_FILE_CORRUPT_ERROR: "Error: Could not load workspace from '%1'. The file may be corrupted or not a valid Blockly workspace.",


    // Label for the WiFi icon to make it clear
    LBL_ROBOT_SIGNAL: "Robot Signal:",

    
    // --- Toolbox Categories ---
    CAT_BASICS: "Basics",
    CAT_LOGIC: "Logic",
    CAT_LOOPS: "Loops",
    CAT_MATH: "Math",
    //CAT_TEXT: "Text",
    CAT_VARIABLES: "Variables",
    CAT_FUNCTIONS: "Functions",
    CAT_IO: "GPIO",
    //CAT_TIME: "Time",
    //CAT_AUDIO: "Audio",
    CAT_CONSOLE: "Console",
    CAT_SERVO: "Servo",
    CAT_SENSORS: "Sensors",
    CAT_OLED: "OLED Display",
    CAT_MOTORS: "Motors",
    CAT_LEDS: "LED Strip",
    CAT_BUZZER: "Buzzer",  

    // --- Toolbox Labels ---
    LBL_BLOCKING: "Blocking Commands", // For "Move cm", "Turn deg"
    LBL_BASIC: "Basic Commands",       // For "Set Speed"
    
    // ESP32 Main
    ESP32_PROGRAM_MSG: "Main Program %1 On Start %2 %3 Forever %4 %5",
    ESP32_PROGRAM_TOOLTIP: "Main structure for the ESP32 program. Code in 'On Start' runs once, 'Forever' runs repeatedly.",

    // IO Blocks
    PIN_MODE_MSG: "set pin %1 to %2",
    PIN_MODE_TOOLTIP: "Configures a specific pin as either an Input or Output.",
    DIGITAL_WRITE_MSG: "digital write pin %1 to %2",
    DIGITAL_WRITE_TOOLTIP: "Sets a digital pin to HIGH (3.3V) or LOW (0V).",
    DIGITAL_READ_MSG: "digital read pin %1",
    DIGITAL_READ_TOOLTIP: "Reads the state of a digital pin (1 for HIGH, 0 for LOW).",
    ANALOG_READ_MSG: "analog read pin %1",
    ANALOG_READ_TOOLTIP: "Reads an analog value (0-4095) from the pin.",
    ANALOG_WRITE_MSG: "analog write pin %1 value %2",
    ANALOG_WRITE_TOOLTIP: "Writes a PWM value (0-255) to the pin.",
    DELAY_MS_MSG: "Pause (ms) %1",
    DELAY_MS_TOOLTIP: "Pauses the program for the specified milliseconds.",

    SWITCH_CHECK_MSG: "%1 is %2",
    SWITCH_TRIGGERED: "Triggered (Pressed)",
    SWITCH_NOT_TRIGGERED: "Not Triggered",
    SWITCH_CHECK_TOOLTIP: "Checks whether the selected switch is pressed or not pressed.",

    // Loops & Logic
    CUSTOM_FOR_MSG: "count with %1 from %2 to %3 by %4 %5 %6",
    CUSTOM_FOR_TOOLTIP: "Counts a variable from start to end number.",
    CUSTOM_WHILE_MSG: "repeat %1 %2 %3 %4",
    CUSTOM_WHILE_TOOLTIP: "Repeats actions while or until a condition is met.",
    CUSTOM_REPEAT_MSG: "repeat %1 times %2 %3",
    CUSTOM_REPEAT_TOOLTIP: "Repeats the contained blocks a specific number of times.",
    CUSTOM_BREAK_MSG: "break out of loop",
    CUSTOM_BREAK_TOOLTIP: "Exits the current loop immediately.",
    OPT_LOOP_WHILE: "While",
    OPT_LOOP_UNTILL: "Untill",
    CUSTOM_FOR_MSG: "for %1 from %2 to %3 by %4 %5 %6",
    CUSTOM_FOR_TOOLTIP: "Loops a variable from a start value to an end value using a specific step.",


    // Math & Console
    PRINT_CONSOLE_MSG: "print to console %1",
    PRINT_CONSOLE_TOOLTIP: "Sends text or numbers to the serial monitor/console.",
    MATH_MODULO_MSG: "remainder of %1 ÷ %2",
    MATH_MODULO_TOOLTIP: "Returns the remainder of a division.",
    MATH_MAP_MSG: "map %1 from low %2 high %3 to low %4 high %5",
    MATH_MAP_TOOLTIP: "Re-maps a number from one range to another.",

    // Servo
    SERVO_ATTACH_MSG: "attach servo %1 to pin %2",
    SERVO_ATTACH_TOOLTIP: "Connects a servo motor to a specific GPIO pin.",
    SERVO_WRITE_MSG: "set servo %1 angle to %2",
    SERVO_WRITE_TOOLTIP: "Moves the servo to the specified angle (0-180).",
    SERVO_READ_MSG: "read angle from servo %1",
    SERVO_READ_TOOLTIP: "Reads the last set angle of the servo.",

    // Sensors
    ULTRASONIC_READ_MSG: "read distance (cm) trig pin %1 echo pin %2",
    ULTRASONIC_READ_TOOLTIP: "Measures distance using an HC-SR04 ultrasonic sensor.",

    // OLED Display
    OLED_INIT_MSG: "OLED: initialize display",
    OLED_INIT_TOOLTIP: "Starts the I2C OLED display (Pins 21/22).",
    OLED_CLEAR_MSG: "OLED: clear display",
    OLED_CLEAR_TOOLTIP: "Wipes the screen clean.",
    OLED_UPDATE_MSG: "OLED: update display",
    OLED_UPDATE_TOOLTIP: "Refreshes the screen to show recent drawings.",
    OLED_DRAW_PIXEL_MSG: "OLED: draw pixel at x %1 y %2 color %3",
    OLED_DRAW_LINE_MSG: "OLED: draw line from x1 %1 y1 %2 to x2 %3 y2 %4 color %5",
    OLED_DRAW_RECT_MSG: "OLED: draw rectangle at x %1 y %2 width %3 height %4 color %5",
    OLED_FILL_RECT_MSG: "OLED: draw filled rectangle at x %1 y %2 width %3 height %4 color %5",
    OLED_SET_CURSOR_MSG: "OLED: set text cursor to x %1 y %2",
    OLED_SET_TEXT_SIZE_MSG: "OLED: set text size %1",
    OLED_SET_TEXT_COLOR_MSG: "OLED: set text color %1",
    OLED_PRINT_MSG: "OLED: print %1",

    // Robot / Motors
    ROBOT_MOVE_MSG: "move forward for %1 cm",
    ROBOT_MOVE_TOOLTIP: "Moves the robot forward by a set distance.",
    ROBOT_TURN_MSG: "turn %1 for %2 degrees",
    ROBOT_TURN_TOOLTIP: "Turns the robot left or right.",
    MOTOR_SET_SPEED_MSG: "set motor %1 speed %2",
    MOTOR_SET_SPEED_TOOLTIP: "Sets specific speed for one motor.",
    ROBOT_STOP_MSG: "stop robot",
    ROBOT_STOP_TOOLTIP: "Halts all motor movement.",
    ROBOT_SET_PID_MSG: "set motor PID: P %1 I %2 D %3",

    // LED Strip
    LED_INIT_MSG: "Initialize LED strip on pin %1 with %2 LEDs",
    LED_COLOR_RGB_MSG: "color (R) %1 (G) %2 (B) %3",
    LED_SET_PIXEL_MSG: "Set LED pixel %1 to color %2",
    LED_FILL_ALL_MSG: "Set all LEDs to color %1",
    LED_SET_BRIGHTNESS_MSG: "Set LED brightness to %1",
    LED_CLEAR_ALL_MSG: "Clear all LEDs (turn off)",
    LED_SHOW_CHANGES_MSG: "Show LED changes",

    //Buzzer
    BUZZER_TONE_MSG: "Play tone with frequency %1 Hz",
    BUZZER_TONE_TOOLTIP: "Plays a buzzer sound at a specified frequency (e.g., 440 Hz).",

    BUZZER_NOTONE_MSG: "Stop tone",
    BUZZER_NOTONE_TOOLTIP: "Stops the buzzer sound.",

    BUZZER_4_NOTE_MSG:
    "Play 4-note tune with pause %1 ms %2 Note 1 (Hz): %3 %4 Note 2 (Hz): %5 %6 Note 3 (Hz): %7 %8 Note 4 (Hz): %9",
    BUZZER_4_NOTE_TOOLTIP:
    "Plays four frequencies in sequence with a defined delay.",

    
    // Dropdown Options (For reference/extensions)
    OPT_HIGH: "HIGH",
    OPT_LOW: "LOW",
    OPT_INPUT: "INPUT",
    OPT_OUTPUT: "OUTPUT",
    OPT_LEFT: "left",
    OPT_RIGHT: "right",
    OPT_WHITE: "WHITE",
    OPT_BLACK: "BLACK"
}