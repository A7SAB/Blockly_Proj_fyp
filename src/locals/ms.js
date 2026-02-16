// --- Bahasa Melayu ---

export const ms = {
    rtl: false,
    font: "Segoe UI, sans-serif, Montserrat",

    // --- UI Translations ---
    UI_APP_TITLE: "Aplikasi Web Blockly",
    UI_CONNECT: "Sambung",
    UI_DISCONNECT: "Putus",
    UI_STATUS_OFFLINE: "Luar Talian",
    UI_STATUS_ONLINE: "Dalam Talian",
    UI_SETTINGS_TITLE: "Tetapan",
    UI_THEME_LABEL: "Tema",
    UI_THEME_DARK: "Gelap Tema",
    UI_THEME_LIGHT: "Cerah",
    UI_LANGUAGE_LABEL: "Bahasa",
    UI_CLOSE: "Tutup",
    UI_SAVE: "Simpan",
    UI_LOAD: "Muat",
    UI_SAVE_TITLE: "Simpan Program",
    UI_SAVE_CONFIRM: "Simpan Program",
    UI_CONFIRM_MSG: "Adakah anda pasti?",
    UI_SHOW_ADVANCED: "Tunjukkan Panel Lanjutan",

    UI_RUN: "Jalankan",
    UI_STOP: "Henti",
    UI_BYTECODE: "Bytekod",
    UI_LOGS: "Log",
    UI_CONSOLE: "Konsol",
    UI_CLEAR_LOGS: "Kosongkan Log",

    UI_ROBOT_CONFIG: "Konfigurasi Robot",
    UI_ROBOT_ID: "ID Robot (Awalan):",

    UI_MQTT_CONNECTION: "Sambungan MQTT",
    UI_BROKER: "Broker:",
    UI_PORT: "Port:",

    UI_LOAD_CONFIRMATION_MSG: "Ini akan menggantikan ruang kerja semasa anda. Adakah anda pasti?",
    UI_CONFIRMATION_TITLE: "Pengesahan",
    UI_CONFIRM: "Sahkan",

    UI_ALERT_TITLE: "Amaran!",
    UI_OK: "OK",

    UI_VARIABLE_SETTINGS: "Tetapan Pembolehubah",
    UI_CREATE: "Cipta",
    UI_CANCEL: "Batal",

    // MQTT & Connection Status
    UI_CONNECT: "Sambung",
    UI_DISCONNECT: "Putus",
    UI_STATUS_ONLINE: "Dalam Talian",
    UI_STATUS_OFFLINE: "Luar Talian",
    UI_STATUS_FAIL: "Sambungan Gagal",
    UI_STATUS_WAITING: "Mencari Robot...",
    UI_STATUS_ROBOT_OK: "Robot Disambung",
    UI_STATUS_CONNECTING: "Menyambung...",

    // Alert Messages
    MSG_BROKER_CONNECTED: "Berjaya disambung ke broker!",
    MSG_BROKER_DISCONNECTED: "Terputus dari broker.",
    MSG_BROKER_FAIL: "Sambungan gagal. Semak alamat broker.",
    MSG_ROBOT_ONLINE: "Robot dalam talian.",
    MSG_ROBOT_OFFLINE: "Robot luar talian.",
    MSG_PROGRAM_SENT: "Program dihantar ke robot!",
    MSG_NO_BROKER: "Ralat: Pelayar web tidak disambung ke Broker MQTT.",

    BLOCK_ONE_TYPE_ALLOWED: "Hanya satu blok jenis ini dibenarkan.",
    UNSAFE_PRINT_ERROR:
    "⚠️ RALAT KRITIKAL: Cetakan Tidak Selamat Dikesan!\n\n" +
    "Anda mencetak ke konsol di dalam gelung tanpa sela masa.\n\n" +
    "Sila tambah 'Jeda' sekurang-kurangnya 50 ms.",

    BLOCK_EMPTY_INPUT_ERROR: "Ralat: Anda mempunyai input kosong! Sila isikan blok yang hilang.",
    MSG_FILE_EXT_ERROR: "Jenis fail ini ('.%1') tidak boleh dimuatkan sebagai ruang kerja. Hanya fail .xml disokong.",
    MSG_FILE_CORRUPT_ERROR: "Ralat: Tidak dapat memuatkan ruang kerja dari '%1'. Fail mungkin rosak atau bukan ruang kerja Blockly yang sah.",

    // Label for the WiFi icon
    LBL_ROBOT_SIGNAL: "Isyarat Robot:",

    // --- Toolbox Categories ---
    CAT_BASICS: "Asas",
    CAT_LOGIC: "Logik",
    CAT_LOOPS: "Gelung",
    CAT_MATH: "Matematik",
    //CAT_TEXT: "Teks",
    CAT_VARIABLES: "Pembolehubah",
    CAT_FUNCTIONS: "Fungsi",
    CAT_IO: "GPIO",
    //CAT_TIME: "Masa",
    //CAT_AUDIO: "Audio",
    CAT_CONSOLE: "Konsol",
    CAT_SERVO: "Servo",
    CAT_SENSORS: "Sensor",
    CAT_OLED: "Paparan OLED",
    CAT_MOTORS: "Motor",
    CAT_LEDS: "Jalur LED",
    CAT_BUZZER: "Buzzer",

    // --- Toolbox Labels ---
    LBL_BLOCKING: "Arahan Menunggu",
    LBL_BASIC: "Arahan Asas",

    ESP32_PROGRAM_MSG: "Program Utama %1 Pada Mula %2 %3 Sentiasa %4 %5",
    ESP32_PROGRAM_TOOLTIP: "Struktur utama program ESP32. Kod dalam 'Pada Mula' berjalan sekali, 'Sentiasa' berulang.",

    PIN_MODE_MSG: "tetapkan pin %1 sebagai %2",
    PIN_MODE_TOOLTIP: "Konfigurasi pin sebagai Input atau Output.",
    DIGITAL_WRITE_MSG: "tulis digital pin %1 nilai %2",
    DIGITAL_WRITE_TOOLTIP: "Tetapkan pin digital kepada TINGGI (3.3V) atau RENDAH (0V).",
    DIGITAL_READ_MSG: "baca digital pin %1",
    DIGITAL_READ_TOOLTIP: "Baca status pin digital (1 atau 0).",
    ANALOG_READ_MSG: "baca analog pin %1",
    ANALOG_READ_TOOLTIP: "Baca nilai analog (0-4095).",
    ANALOG_WRITE_MSG: "tulis analog pin %1 nilai %2",
    ANALOG_WRITE_TOOLTIP: "Hantar nilai PWM (0-255) ke pin.",
    DELAY_MS_MSG: "Jeda (ms) %1",
    DELAY_MS_TOOLTIP: "Hentikan program seketika untuk milisaat yang ditetapkan.",

    SWITCH_CHECK_MSG: "Adakah %1 %2",
    SWITCH_TRIGGERED: "Ditekan",
    SWITCH_NOT_TRIGGERED: "Tidak ditekan",
    SWITCH_CHECK_TOOLTIP: "Memeriksa sama ada suis yang dipilih sedang ditekan (0) atau tidak ditekan (1).",

    CUSTOM_FOR_MSG: "kira dengan %1 dari %2 hingga %3 selang %4 %5 %6",
    CUSTOM_FOR_TOOLTIP: "Mengira pembolehubah dari nombor awal ke akhir.",
    CUSTOM_WHILE_MSG: "ulang %1 %2 %3 %4",
    CUSTOM_WHILE_TOOLTIP: "Ulang tindakan selagi atau sehingga syarat dipenuhi.",
    CUSTOM_REPEAT_MSG: "ulang %1 kali %2 %3",
    CUSTOM_REPEAT_TOOLTIP: "Ulang blok di dalam beberapa kali.",
    CUSTOM_BREAK_MSG: "keluar dari gelung",
    CUSTOM_BREAK_TOOLTIP: "Keluar dari gelung semasa dengan serta-merta.",
    OPT_LOOP_WHILE: "Semasa",
    OPT_LOOP_UNTILL: "Sehingga",
    CUSTOM_FOR_MSG: "untuk %1 dari %2 hingga %3 dengan langkah %4 %5 %6",
    CUSTOM_FOR_TOOLTIP: "Mengulang pembolehubah dari nilai mula ke nilai akhir menggunakan langkah tertentu.",

    PRINT_CONSOLE_MSG: "cetak ke konsol %1",
    PRINT_CONSOLE_TOOLTIP: "Hantar teks atau nombor ke monitor serial.",
    MATH_MODULO_MSG: "baki %1 ÷ %2",
    MATH_MODULO_TOOLTIP: "Kembalikan baki bahagi.",
    MATH_MAP_MSG: "peta %1 dari rendah %2 tinggi %3 ke rendah %4 tinggi %5",
    MATH_MAP_TOOLTIP: "Tukarkan nombor dari satu julat ke julat lain.",

    SERVO_ATTACH_MSG: "sambung servo %1 ke pin %2",
    SERVO_ATTACH_TOOLTIP: "Sambungkan motor servo ke pin GPIO tertentu.",
    SERVO_WRITE_MSG: "tetapkan servo %1 sudut ke %2",
    SERVO_WRITE_TOOLTIP: "Gerakkan servo ke sudut tertentu (0-180).",
    SERVO_READ_MSG: "baca sudut dari servo %1",
    SERVO_READ_TOOLTIP: "Baca sudut semasa servo.",

    ULTRASONIC_READ_MSG: "baca jarak (cm) pin trig %1 pin echo %2",
    ULTRASONIC_READ_TOOLTIP: "Ukur jarak menggunakan sensor ultrasonik.",

    OLED_INIT_MSG: "OLED: mulakan paparan",
    OLED_INIT_TOOLTIP: "Mulakan skrin OLED I2C.",
    OLED_CLEAR_MSG: "OLED: kosongkan paparan",
    OLED_CLEAR_TOOLTIP: "Padamkan semua kandungan skrin.",
    OLED_UPDATE_MSG: "OLED: kemaskini paparan",
    OLED_UPDATE_TOOLTIP: "Papar lukisan terkini di skrin.",
    OLED_DRAW_PIXEL_MSG: "OLED: lukis piksel di x %1 y %2 warna %3",
    OLED_DRAW_LINE_MSG: "OLED: lukis garisan dari x1 %1 y1 %2 ke x2 %3 y2 %4 warna %5",
    OLED_DRAW_RECT_MSG: "OLED: lukis petak di x %1 y %2 lebar %3 tinggi %4 warna %5",
    OLED_FILL_RECT_MSG: "OLED: lukis petak penuh di x %1 y %2 lebar %3 tinggi %4 warna %5",
    OLED_SET_CURSOR_MSG: "OLED: tetapkan kursor teks ke x %1 y %2",
    OLED_SET_TEXT_SIZE_MSG: "OLED: tetapkan saiz teks %1",
    OLED_SET_TEXT_COLOR_MSG: "OLED: tetapkan warna teks %1",
    OLED_PRINT_MSG: "OLED: cetak %1",

    ROBOT_MOVE_MSG: "gerak ke hadapan sejauh %1 cm",
    ROBOT_MOVE_TOOLTIP: "Gerakkan robot ke hadapan pada jarak tertentu.",
    ROBOT_TURN_MSG: "pusing %1 sebanyak %2 darjah",
    ROBOT_TURN_TOOLTIP: "Pusing robot ke kiri atau kanan.",
    MOTOR_SET_SPEED_MSG: "tetapkan kelajuan motor %1 kepada %2",
    MOTOR_SET_SPEED_TOOLTIP: "Tetapkan kelajuan motor individu.",
    ROBOT_STOP_MSG: "hentikan robot",
    ROBOT_STOP_TOOLTIP: "Berhentikan semua pergerakan motor.",
    ROBOT_SET_PID_MSG: "tetapkan PID motor: P %1 I %2 D %3",

    LED_INIT_MSG: "Mulakan jalur LED pada pin %1 dengan %2 LED",
    LED_COLOR_RGB_MSG: "warna (R) %1 (G) %2 (B) %3",
    LED_SET_PIXEL_MSG: "Tetapkan piksel LED %1 kepada warna %2",
    LED_FILL_ALL_MSG: "Tetapkan semua LED kepada warna %1",
    LED_SET_BRIGHTNESS_MSG: "Tetapkan kecerahan LED kepada %1",
    LED_CLEAR_ALL_MSG: "Padamkan semua LED (tutup)",
    LED_SHOW_CHANGES_MSG: "Papar perubahan LED",

    //Buzzer
    BUZZER_TONE_MSG: "Mainkan nada dengan frekuensi %1 Hz",
    BUZZER_TONE_TOOLTIP: "Memainkan bunyi buzzer pada frekuensi tertentu (contoh: 440 Hz).",

    BUZZER_NOTONE_MSG: "Hentikan nada",
    BUZZER_NOTONE_TOOLTIP: "Menghentikan bunyi buzzer.",

    BUZZER_4_NOTE_MSG:
    "Mainkan lagu 4 nota dengan jeda %1 ms %2 Nota 1 (Hz): %3 %4 Nota 2 (Hz): %5 %6 Nota 3 (Hz): %7 %8 Nota 4 (Hz): %9",
    BUZZER_4_NOTE_TOOLTIP:
    "Memainkan empat frekuensi secara berturutan dengan sela masa yang ditetapkan.",


    OPT_HIGH: "TINGGI",
    OPT_LOW: "RENDAH",
    OPT_INPUT: "INPUT",
    OPT_OUTPUT: "OUTPUT",
    OPT_LEFT: "kiri",
    OPT_RIGHT: "kanan",
    OPT_WHITE: "PUTIH",
    OPT_BLACK: "HITAM"
}