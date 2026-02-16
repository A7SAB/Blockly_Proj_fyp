/* The File contains the logic for the floating console Window*/

let logElement;
let consoleElement;

// A logical limit to prevent DOM bloat and memory issues
const MAX_LOG_LINES = 500;

let isAdvancedMode = false;

/**
 * Initializes the logger with references to the output elements.
 * @param {HTMLElement} logEl - The element for general logs.
 * @param {HTMLElement} consoleEl - The element for console output.
 */
export function initLogger(logEl, consoleEl) {
  logElement = logEl;
  consoleElement = consoleEl;
}

/**
 * Sets the logger's advanced mode state.
 * @param {boolean} isEnabled - True if advanced mode is on.
 */
export function setAdvancedMode(isEnabled) {
  isAdvancedMode = isEnabled;
  if (!isEnabled) {
    // If we are turning advanced mode OFF, clear the 'log' panel
    // to free up memory immediately.
    if (logElement) {
      logElement.innerHTML = '';
    }
  }
}

/**
 * Appends a message to the appropriate log panel.
 * @param {string} message - The message to log.
 * @param {string} [type='log'] - The type of log ('log' or 'console').
 */
export function logMessage(message, type = 'log') {
  let targetElement;

  if (type === 'console') {
    targetElement = consoleElement;
  } else if (type === 'log') {
    if (!isAdvancedMode) {
      return; 
    }
    targetElement = logElement;
  } else {
    // Unknown type, just log to console
    console.warn(`Unknown log type: ${type}`);
    return;
  }
  
  if (!targetElement) {
    console.error("Logger not initialized or element not found.");
    return;
  }

  // Create a new element for the log entry
  const entry = document.createElement('div');
  const timestamp = new Date().toLocaleTimeString();
  
  entry.textContent = `[${timestamp}] ${message}`;
  targetElement.appendChild(entry);

  // Apply the line limit
  while (targetElement.childElementCount > MAX_LOG_LINES) {
    targetElement.removeChild(targetElement.firstChild);
  }

  // Auto-scroll to the bottom
  targetElement.scrollTop = targetElement.scrollHeight;
}

/**
 * Clears all messages from both log panels.
 * Note: 'log' panel is cleared automatically when advanced is turned off.
 */
export function clearLogs() {
  if (consoleElement) {
    consoleElement.innerHTML = '';
  }
  // Clear the log element too, just in case
  if (logElement) {
    logElement.innerHTML = '';
  }
  //logMessage("Console cleared. \n", "console");
  if (isAdvancedMode) {
    logMessage("Logs cleared.", "log");
  }
}