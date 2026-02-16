import * as Blockly from 'blockly';

import * as En from 'blockly/msg/en';
import * as Ms from 'blockly/msg/ms';
import * as Ar from 'blockly/msg/ar';

/**
 * Translation dictionaries for English, Bahasa Melayu, and Arabic.
 * Includes text for Blocks, Tooltips, and Dropdown options.
 */
// Import Custom App Translations
import { en } from './en.js';
import { ms } from './ms.js';
import { ar } from './ar.js';

// Combine them into the locales object
const locales = { en, ms, ar };
function updateDOMText(localeData) {
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (localeData[key]) {
      if (el.tagName === 'INPUT' && el.type === 'placeholder') {
        el.placeholder = localeData[key];
      } else {
        el.innerText = localeData[key];
      }
    }
  });
}

export function setLocale(lang) {

    let standardMsg = En; // Default
    if (lang === 'ms') standardMsg = Ms;
    if (lang === 'ar') standardMsg = Ar;

    Blockly.setLocale(standardMsg);

    const selectedLocale = locales[lang] || locales.en;

    // Update Blockly Msg
    for (const key in selectedLocale) {
    if (key !== 'rtl' && key !== 'font') {
        Blockly.Msg[key] = selectedLocale[key];
    }
    }

    // Set Page Direction (RTL/LTR)
    if (lang === "ar") {
        document.documentElement.lang = "ar";
        document.documentElement.dir = "rtl";
        document.documentElement.style.setProperty("--blockly-weight", "400");
    } else {
        document.documentElement.lang = "en";
        document.documentElement.dir = "ltr";
        document.documentElement.style.setProperty("--blockly-weight", "500");
    }


    // Update UI Text
    updateDOMText(selectedLocale);

  return selectedLocale;
}

// Export specific strings for use in main.js logic (e.g., dynamic alerts)
export function getLocalizedText(key, lang) {
    const locale = locales[lang] || locales.en;
    return locale[key] || key;
}