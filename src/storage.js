/**
 * storage.js
 * Handles saving and loading user preferences (Robot ID, MQTT, Theme, Language)
 * using the browser's Local Storage.
 */

// 1. Storage Keys
const KEYS = {
    ROBOT_ID: 'blockly_robot_id',
    BROKER:   'blockly_mqtt_broker',
    PORT:     'blockly_mqtt_port',
    THEME:    'blockly_theme_dark',
    LANG:     'blockly_language'
};

// 2. DOM Element IDs
const IDS = {
    robotId:  'robot-id',
    broker:   'broker',
    port:     'port',
    theme:    'theme-switch',
    lang:     'language-selector'
};

/**
 * Initialize all storage listeners and load saved values.
 * Call this once when the page loads.
 */
export function initStorage() {
    const elements = getElements();

    if (!elements) {
        console.error("Storage Error: Could not find one or more input elements.");
        return;
    }

    // --- LOAD SAVED VALUES ---
    loadValues(elements);

    // --- ATTACH LISTENERS (Auto-save) ---
    attachListeners(elements);
}

function getElements() {
    return {
        robotId:  document.getElementById(IDS.robotId),
        broker:   document.getElementById(IDS.broker),
        port:     document.getElementById(IDS.port),
        theme:    document.getElementById(IDS.theme),
        lang:     document.getElementById(IDS.lang)
    };
}

function loadValues(els) {
    // Robot ID
    const savedId = localStorage.getItem(KEYS.ROBOT_ID);
    if (savedId) els.robotId.value = savedId;

    // MQTT Broker
    const savedBroker = localStorage.getItem(KEYS.BROKER);
    if (savedBroker) els.broker.value = savedBroker;

    // MQTT Port
    const savedPort = localStorage.getItem(KEYS.PORT);
    if (savedPort) els.port.value = savedPort;

    // Language
    const savedLang = localStorage.getItem(KEYS.LANG);
    if (savedLang) {
        els.lang.value = savedLang;
        // Optional: Dispatch a custom event if you need to trigger translation immediately
        // window.dispatchEvent(new Event('languageChanged'));
    }

    // Theme (Dark Mode)
    const savedTheme = localStorage.getItem(KEYS.THEME);
    if (savedTheme !== null) {
        const isDark = (savedTheme === 'true');
        els.theme.checked = isDark;
        applyTheme(isDark);
    } else {
        // If no save found, rely on the default checkbox state in HTML
        applyTheme(els.theme.checked);
    }
}

function attachListeners(els) {
    // Inputs: Save on every keystroke
    els.robotId.addEventListener('input', (e) => localStorage.setItem(KEYS.ROBOT_ID, e.target.value));
    els.broker.addEventListener('input', (e) => localStorage.setItem(KEYS.BROKER, e.target.value));
    els.port.addEventListener('input', (e) => localStorage.setItem(KEYS.PORT, e.target.value));

    // Selects/Checkboxes: Save on change
    els.lang.addEventListener('change', (e) => {
        localStorage.setItem(KEYS.LANG, e.target.value);
       //location.reload(); 
    });

    els.theme.addEventListener('change', (e) => {
        const isDark = e.target.checked;
        localStorage.setItem(KEYS.THEME, isDark);
        applyTheme(isDark);
    });
}

function applyTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
}