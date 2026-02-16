
  // --- Arabic (العربية) ---
export const ar = {
    rtl: true, // Right To Left enabled
    font: "'Cairo', sans-serif", // Cairo Font

    // --- UI Translations ---
    UI_APP_TITLE: "تطبيق بلوكلي",
    UI_CONNECT: "اتصال",
    UI_DISCONNECT: "قطع الاتصال",
    UI_STATUS_OFFLINE: "غير متصل",
    UI_STATUS_ONLINE: "متصل",
    UI_SETTINGS_TITLE: "الإعدادات",
    UI_THEME_LABEL: "السمة",
    UI_THEME_DARK: " الوضع الداكن",
    UI_THEME_LIGHT: "فاتح",
    UI_LANGUAGE_LABEL: "اللغة",
    UI_CLOSE: "إغلاق",
    UI_SAVE: "حفظ",
    UI_CANCEL: "الغ",
    UI_LOAD: "رفع",
    UI_SAVE_TITLE: "حفظ البرنامج",
    UI_SAVE_CONFIRM: "أعطِ برنامجك أسمًا:",
    UI_CONFIRM_MSG: "هل أنت متأكد؟",
    UI_SHOW_ADVANCED: "أظهر شاشات المطور",

    UI_RUN: "تشغيل",
    UI_STOP: "إيقاف",
    UI_BYTECODE: "الشفرة الوسيطة",
    UI_LOGS: "السجلات",
    UI_CONSOLE: "الكونسول",
    UI_CLEAR_LOGS: "مسح السجلات",

    UI_ROBOT_CONFIG: "إعدادات الروبوت",
    UI_ROBOT_ID: "معرّف الروبوت:",

    UI_MQTT_CONNECTION: "اتصال MQTT",
    UI_BROKER: "الخادم:",
    UI_PORT: "المنفذ:",

    UI_LOAD_CONFIRMATION_MSG: "سيؤدي هذا إلى استبدال مساحة العمل الحالية. هل أنت متأكد؟",
    UI_CONFIRMATION_TITLE: "تأكيد",
    UI_CONFIRM: "تأكيد",

    UI_ALERT_TITLE: "تنبيه!",
    UI_OK: "حسنًا",

    UI_VARIABLE_SETTINGS: "إعدادات المتغير",
    UI_CREATE: "إنشاء",
    UI_CANCEL: "إلغاء",

    // MQTT & Connection Status
    UI_CONNECT: "اتصال",
    UI_DISCONNECT: "قطع الاتصال",
    UI_STATUS_ONLINE: "متصل",
    UI_STATUS_OFFLINE: "غير متصل",
    UI_STATUS_FAIL: "فشل الاتصال",
    UI_STATUS_WAITING: "البحث عن الروبوت...",
    UI_STATUS_ROBOT_OK: "الروبوت متصل",
    UI_STATUS_CONNECTING: "جار الاتصال...",

    // Alert Messages
    MSG_BROKER_CONNECTED: "تم الاتصال بالوسيط بنجاح!",
    MSG_BROKER_DISCONNECTED: "تم قطع الاتصال بالوسيط.",
    MSG_BROKER_FAIL: "فشل الاتصال. تحقق من عنوان الوسيط.",
    MSG_ROBOT_ONLINE: "الروبوت متصل.",
    MSG_ROBOT_OFFLINE: "الروبوت غير متصل.",
    MSG_PROGRAM_SENT: "تم إرسال البرنامج إلى الروبوت!",
    MSG_NO_BROKER: "خطأ: المتصفح غير متصل بـ MQTT Broker.",

    BLOCK_ONE_TYPE_ALLOWED: "يُسمح بكتلة واحدة فقط من هذا النوع.",
    UNSAFE_PRINT_ERROR:
  "⚠️ خطأ حرج: تم اكتشاف طباعة غير آمنة!\n\n" +
  "أنت تقوم بالطباعة إلى وحدة التحكم داخل الحلقة بدون تأخير.\n\n" +
  "يرجى إضافة 'انتظار' لمدة لا تقل عن 50 مللي ثانية.",
    BLOCK_EMPTY_INPUT_ERROR: "خطأ: لديك مدخل فارغ! يرجى ملء الكتلة المفقودة.",
    MSG_FILE_EXT_ERROR: "لا يمكن تحميل نوع الملف ('.%1') كمساحة عمل. ملفات .xml فقط مدعومة.",
    MSG_FILE_CORRUPT_ERROR: "خطأ: تعذر تحميل مساحة العمل من '%1'. قد يكون الملف تالفًا أو مساحة عمل غير صالحة.",

    // --- Toolbox Categories ---
    CAT_BASICS: "أساسيات",
    CAT_LOGIC: "منطق",
    CAT_LOOPS: "حلقات تكرار",
    CAT_MATH: "رياضيات",
    CAT_TEXT: "نصوص",
    CAT_VARIABLES: "متغيرات",
    CAT_FUNCTIONS: "دوال",
    CAT_IO: "المداخل والمخارج",
    CAT_SERVO: "سيرفو",
    CAT_CONSOLE: "الكونسول",
    CAT_SENSORS: "حساسات",
    CAT_OLED: "شاشة OLED",
    CAT_MOTORS: "محركات",
    CAT_LEDS: "شريط LED",
    CAT_BUZZER: "الجرس الصوتي",  

    // --- Toolbox Labels ---
    LBL_BLOCKING: "أوامر انتظار",
    LBL_BASIC: "أوامر أساسية",

    ESP32_PROGRAM_MSG: "البرنامج الرئيسي %1 عند البدء %2 %3 باستمرار %4 %5",
    ESP32_PROGRAM_TOOLTIP: "الهيكل الرئيسي لبرنامج ESP32. الكود في 'عند البدء' يعمل مرة واحدة، و'باستمرار' يتكرر.",

    PIN_MODE_MSG: "تعيين المنفذ %1 كـ %2",
    PIN_MODE_TOOLTIP: "تكوين المنفذ كمدخل أو مخرج.",
    DIGITAL_WRITE_MSG: "كتابة رقمية للمنفذ %1 القيمة %2",
    DIGITAL_WRITE_TOOLTIP: "جعل المنفذ الرقمي مرتفع (3.3V) أو منخفض (0V).",
    DIGITAL_READ_MSG: "قراءة رقمية للمنفذ %1",
    DIGITAL_READ_TOOLTIP: "قراءة حالة المنفذ الرقمي (1 أو 0).",
    ANALOG_READ_MSG: "قراءة تماثلية للمنفذ %1",
    ANALOG_READ_TOOLTIP: "قراءة قيمة تماثلية (0-4095) من المنفذ.",
    ANALOG_WRITE_MSG: "كتابة تماثلية للمنفذ %1 القيمة %2",
    ANALOG_WRITE_TOOLTIP: "إرسال قيمة PWM (0-255) للمنفذ.",
    DELAY_MS_MSG: "انتظر (ملي ثانية) %1",
    DELAY_MS_TOOLTIP: "إيقاف البرنامج مؤقتاً للزمن المحدد.",

    SWITCH_CHECK_MSG: " %1 %2",
    SWITCH_TRIGGERED: "مُفعّل (مضغوط)",
    SWITCH_NOT_TRIGGERED:  "غير مُفعّل",
    SWITCH_CHECK_TOOLTIP:"يتحقق مما إذا كان الزر المحدد مضغوطًا أو غير مضغوط.",

    CUSTOM_FOR_MSG: "عد بـ %1 من %2 إلى %3 بمقدار %4 %5 %6",
    CUSTOM_FOR_TOOLTIP: "تكرار العد لمتغير من رقم البداية للنهاية.",
    CUSTOM_WHILE_MSG: "كرر %1 %2 %3 %4",
    CUSTOM_WHILE_TOOLTIP: "تكرار الأوامر طالما الشرط محقق.",
    CUSTOM_REPEAT_MSG: "كرر %1 مرات %2 %3",
    CUSTOM_REPEAT_TOOLTIP: "تكرار الأوامر لعدد محدد من المرات.",
    CUSTOM_BREAK_MSG: "اخرج من الحلقة",
    CUSTOM_BREAK_TOOLTIP: "الخروج الفوري من حلقة التكرار الحالية.",
    OPT_LOOP_WHILE: "طالما أن",
    OPT_LOOP_UNTILL: "الى أن",
    CUSTOM_FOR_MSG: "لـ %1 من %2 إلى %3 بخطوة %4 %5 %6",
    CUSTOM_FOR_TOOLTIP: "يكرّر المتغير من قيمة البداية إلى قيمة النهاية باستخدام خطوة محددة.",


    PRINT_CONSOLE_MSG: "اطبع في الشاشة %1",
    PRINT_CONSOLE_TOOLTIP: "إرسال نص أو أرقام لشاشة الاتصال التسلسلي.",
    MATH_MODULO_MSG: "باقي قسمة %1 ÷ %2",
    MATH_MODULO_TOOLTIP: "إرجاع باقي القسمة لرقمين.",
    MATH_MAP_MSG: "تحويل %1 من أدنى %2 أعلى %3 إلى أدنى %4 أعلى %5",
    MATH_MAP_TOOLTIP: "إعادة تعيين رقم من مجال إلى مجال آخر.",

    SERVO_ATTACH_MSG: "ربط السيرفو %1 بالمنفذ %2",
    SERVO_ATTACH_TOOLTIP: "توصيل محرك سيرفو بمنفذ معين.",
    SERVO_WRITE_MSG: "اضبط زاوية السيرفو %1 إلى %2",
    SERVO_WRITE_TOOLTIP: "تحريك السيرفو لزاوية محددة (0-180).",
    SERVO_READ_MSG: "قراءة زاوية السيرفو %1",
    SERVO_READ_TOOLTIP: "قراءة الزاوية الحالية للسيرفو.",

    ULTRASONIC_READ_MSG: "قراءة المسافة (سم) مرسل %1 مستقبل %2",
    ULTRASONIC_READ_TOOLTIP: "قياس المسافة باستخدام حساس الموجات فوق الصوتية.",

    OLED_INIT_MSG: "تهيئة شاشة العرض",
    OLED_INIT_TOOLTIP: "بدء تشغيل شاشة العرض OLED.",
    OLED_CLEAR_MSG: "مسح شاشة العرض",
    OLED_CLEAR_TOOLTIP: "مسح جميع محتويات شاشة العرض.",
    OLED_UPDATE_MSG: "تحديث شاشة العرض",
    OLED_UPDATE_TOOLTIP: "تحديث شاشة العرض لإظهار الرسومات الجديدة.",
    OLED_DRAW_PIXEL_MSG: "رسم نقطة عند س %1 ص %2 باللون %3",
    OLED_DRAW_LINE_MSG: "رسم خط من س %1 ص %2 إلى س %3 ص %4 باللون %5",
    OLED_DRAW_RECT_MSG: "رسم مستطيل عند س %1 ص %2 بعرض %3 وارتفاع %4 باللون %5",
    OLED_FILL_RECT_MSG: "رسم مستطيل ممتلئ عند س %1 ص %2 بعرض %3 وارتفاع %4 باللون %5",
    OLED_SET_CURSOR_MSG: "تحديد موضع المؤشر عند س %1 ص %2",
    OLED_SET_TEXT_SIZE_MSG: "تحديد حجم النص %1",
    OLED_SET_TEXT_COLOR_MSG: "تحديد لون النص %1",
    OLED_PRINT_MSG: "عرض النص %1",


    ROBOT_MOVE_MSG: "تحرك للأمام مسافة %1 سم",
    ROBOT_MOVE_TOOLTIP: "تحريك الروبوت للأمام مسافة محددة.",
    ROBOT_TURN_MSG: "استدر للـ %1 بزاوية %2 درجة",
    ROBOT_TURN_TOOLTIP: "تدوير الروبوت لليمين أو اليسار.",
    MOTOR_SET_SPEED_MSG: "تعيين المحرك %1 للحركة بسرعة %2",
    MOTOR_SET_SPEED_TOOLTIP: "ضبط سرعة محرك واحد محدد.",
    ROBOT_STOP_MSG: "إيقاف الروبوت",
    ROBOT_STOP_TOOLTIP: "إيقاف جميع المحركات.",
    ROBOT_SET_PID_MSG: "ضبط PID للمحرك: P %1 I %2 D %3",

    LED_INIT_MSG: "تهيئة شريط LED في المنفذ %1 بـ %2 ضوء",
    LED_COLOR_RGB_MSG: "لون (أحمر) %1 (أخضر) %2 (أزرق) %3",
    LED_SET_PIXEL_MSG: "اجعل الضوء %1 بلون %2",
    LED_FILL_ALL_MSG: "اجعل كل الأضواء بلون %1",
    LED_SET_BRIGHTNESS_MSG: "سطوع الأضواء %1",
    LED_CLEAR_ALL_MSG: "إطفاء كل الأضواء",
    LED_SHOW_CHANGES_MSG: "إظهار تغييرات الأضواء",

    //Buzzer
    BUZZER_TONE_MSG: "تشغيل نغمة بتردد %1 هرتز",
    BUZZER_TONE_TOOLTIP: "يشغّل صوت الجرس عند تردد محدد (مثال: 440 هرتز).",

    BUZZER_NOTONE_MSG: "إيقاف النغمة",
    BUZZER_NOTONE_TOOLTIP: "يوقف صوت الجرس.",

    BUZZER_4_NOTE_MSG: "تشغيل لحن من 4 نغمات مع فاصل %1 مللي ثانية %2 النغمة 1 (هرتز): %3 %4 النغمة 2 (هرتز): %5 %6 النغمة 3 (هرتز): %7 %8 النغمة 4 (هرتز): %9",
    BUZZER_4_NOTE_TOOLTIP:"يشغّل أربع نغمات متتالية مع تأخير زمني محدد.",


    OPT_HIGH: "مرتفع",
    OPT_LOW: "منخفض",
    OPT_INPUT: "مدخل",
    OPT_OUTPUT: "مخرج",
    OPT_LEFT: "اليسار",
    OPT_RIGHT: "اليمين",
    OPT_WHITE: "أبيض",
    OPT_BLACK: "أسود"
}