// main.js

// --- 1. Imports ---
import * as Blockly from 'blockly';
import { darkTheme, lightTheme } from './theme.js'; // Import both themes
import { setLocale, getLocalizedText } from './locals/locals.js';
import { convertOpcodes } from './vm_opcodes.js';
import { registerCustomBlocks } from './Blocks/block_definitions.js';
import { registerGenerator } from './Blocks/block_generators.js';
import { initLogger, logMessage, setAdvancedMode } from './logger.js';
import { setupUI, findFirstEmptyInput, initModals, showSaveDialog, showConfirmDialog, showAlert, showVariableDialog } from './ui.js';
import { convertProgramToBinary } from './binary_encoder.js';
import { initStorage } from './storage.js';

import { setupMqtt, connectToBroker, disconnectBroker, setRobotId,sendRunCommand, sendStopCommand, sendProgram,isConnected } from './mqtt.js';


// --- 2. Get DOM Elements ---
const connectBtn = document.getElementById('connectBtn');
const connectIconEl = document.getElementById('connectIcon'); 
const connectTextEl = document.getElementById('connectText'); 
const statusEl = document.getElementById('status');
const brokerInput = document.getElementById('broker');
const portInput = document.getElementById('port');

const robotIdInput = document.getElementById('robot-id'); 
const robotStatusEl = document.getElementById('robotStatus');   
const rssiVisualEl = document.getElementById('rssiVisual');     
const statusDotEl = document.querySelector('.status-dot');
const statusTextEl = document.getElementById('statusText');     

const jsonOutputEl = document.getElementById('jsonOutput');
const logOutputEl = document.getElementById('logOutput');
const consoleOutputEl = document.getElementById('consoleOutput');

const showJsonBtn = document.getElementById('showJsonBtn');
const showLogsBtn = document.getElementById('showLogsBtn');
const showConsoleBtn = document.getElementById('showConsoleBtn');
const clearLogBtn = document.getElementById('clearLogBtn');
const toggleConsoleBtn = document.getElementById('toggleConsoleBtn'); 

const runBtn = document.getElementById('runBtn');
const stopBtn = document.getElementById('stopBtn');
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const loadInput = document.getElementById('loadInput');

const outputAreaEl = document.getElementById('output-area');
const outputTabsEl = outputAreaEl.querySelector('.output-tabs');

// Get Settings Modal Elements
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const themeSwitch = document.getElementById('theme-switch');
const advancedToggle = document.getElementById('advanced-toggle');

const languageSelector = document.getElementById('language-selector'); 

toggleConsoleBtn.addEventListener('click', () => { 
  outputAreaEl.classList.toggle('hidden');
});


setAdvancedMode(advancedToggle.checked);

initLogger(logOutputEl, consoleOutputEl);

initModals();

initStorage();

setupUI(
  jsonOutputEl, 
  logOutputEl, 
  consoleOutputEl,
  showJsonBtn,
  showLogsBtn,
  showConsoleBtn,
  clearLogBtn,
  outputAreaEl,   
  outputTabsEl,
  advancedToggle.checked 
);
setupMqtt({
  connectBtn: connectBtn,
  connectIcon: connectIconEl,
  connectText: connectTextEl,
  container: robotStatusEl, 
  rssi: rssiVisualEl,
  dot: statusDotEl,
  text: statusTextEl
});

// Set initial Robot ID
if(robotIdInput) setRobotId(robotIdInput.value);

// Listen for Robot ID changes in Settings
robotIdInput.addEventListener('change', () => {
  setRobotId(robotIdInput.value);
});

// Connect Button Logic
connectBtn.addEventListener('click', () => {
  if (isConnected()) {
    disconnectBroker();
  } else {
    connectToBroker(brokerInput.value, portInput.value);
  }
});

const ESP32_VM = new Blockly.Generator('ESP32_VM');
let workspace;

// Initialize Translations (Default to English)
let currentLang = localStorage.getItem('appLanguage') || 'en';
languageSelector.value = currentLang;
setLocale(currentLang);

registerCustomBlocks();
registerGenerator(ESP32_VM);

function injectWorkspace(lang) {
  const localeConfig = setLocale(lang);
  
  if (workspace) {
    workspace.dispose();
  }

  // Updates CSS Variables for Font
  document.documentElement.style.setProperty('--blockly-font', localeConfig.font);
  
  // Inject with specific RTL setting
  workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    scrollbars: true,
    theme: document.body.classList.contains('dark-theme') ? darkTheme : lightTheme,
    renderer: 'zelos',
    rtl: localeConfig.rtl, 

    zoom: {
      controls: true,      // Show +/-/center buttons on the canvas
      wheel: true,         // Allow zooming with mouse wheel
      startScale: 0.8,     // Start at 80% zoom (Fixes the "Too Big" issue)
      maxScale: 3,         // Max zoom in
      minScale: 0.3,       // Max zoom out
      scaleSpeed: 1.2,     // Zoom speed
      pinch: true          // For touch screens
    },


    grid: {
      spacing: 30,
      length: 1,
      colour: '#888',
      snap: true
    },
    trashcan: true,
    media: '../media_blockly/'
  });

  // Re-attach listeners
  workspace.addChangeListener(enforceSingletons);
  
  localStorage.setItem('appLanguage', lang);
}


injectWorkspace(currentLang);

// Event Listener for Language Selector
languageSelector.addEventListener('change', (e) => {
  const newLang = e.target.value;
  
  const xml = Blockly.Xml.workspaceToDom(workspace);
  
  injectWorkspace(newLang);
  
  // Restors blocks after language change
  Blockly.Xml.domToWorkspace(xml, workspace);
});



// Blockly Event Handling 
function enforceSingletons(event) {
  if (event.type !== Blockly.Events.BLOCK_CREATE) {
    return; // Only care about block creation
  }

  const newBlockId = event.blockId;
  const newBlock = workspace.getBlockById(newBlockId);

  // newBlock might be null if event is for another workspace or flyout
  if (!newBlock) {
    return;
  }

  const singletonTypes = ['esp32_program'];
  
  if (singletonTypes.includes(newBlock.type)) {
    const blocksOfType = workspace.getBlocksByType(newBlock.type, false);
    
    if (blocksOfType.length > 1) {
      // More than one exists. Delete the one that was just added.
      setTimeout(() => {
        const blockToDispose = workspace.getBlockById(newBlockId);
        if (blockToDispose) {
          blockToDispose.dispose(true);
          //const msg = `Only one '${newBlock.type}' block is allowed.`;
          let currentLang = localStorage.getItem('appLanguage') || 'en';
          const msg = getLocalizedText('BLOCK_ONE_TYPE_ALLOWED', currentLang);
          //logMessage(msg, 'error');
          showAlert(msg);
        }
      }, 1); 
    }
  }
}



/**
 * Master Validator: Ensures NO loop anywhere (Start, Main, or Functions) 
 * prints to the console without a delay.
 */
function validateSafePrint(workspace) {
    const MIN_DELAY_MS = 50;

    // 1. Define what blocks constitute a "Loop"
    // We will check the contents of these blocks specifically.
    const LOOP_TYPES = [
        'custom_while_until', 
        'controls_repeat_ext', 
        'controls_for', 
        'vm_repeat_loop' 
    ];

    const allBlocks = workspace.getAllBlocks();

    // 2. Identify all "Loop Contexts" to check
    let loopsToCheck = [];

    // A. The Main ESP32 Loop
    const programBlock = allBlocks.find(b => b.type === 'esp32_program');
    if (programBlock) {
        const mainLoopRoot = programBlock.getInputTargetBlock('LOOP');
        if (mainLoopRoot) loopsToCheck.push(mainLoopRoot);
    }

    // B. Any other Loop Block (e.g., While True in Setup)
    const otherLoops = allBlocks.filter(b => LOOP_TYPES.includes(b.type));
    otherLoops.forEach(loopBlock => {
        // Most loops keep their code in the 'DO' or 'STACK' input
        const bodyRoot = loopBlock.getInputTargetBlock('DO') || loopBlock.getInputTargetBlock('STACK');
        if (bodyRoot) loopsToCheck.push(bodyRoot);
    });

    // 3. Analyze each loop context
    for (let rootBlock of loopsToCheck) {
        if (!isContextSafe(rootBlock, allBlocks)) {
            return false; // Stop immediately if any unsafe loop is found
        }
    }

    return true; // All checks passed

    // --- HELPER: recursive check for a specific loop body ---
    function isContextSafe(rootBlock, allWorkspaceBlocks) {
        let scanQueue = rootBlock.getDescendants(); // Get all blocks inside this loop
        let visitedFunctions = new Set();
        
        let hasPrint = false;
        let hasDelay = false;
        
        let i = 0;
        while (i < scanQueue.length) {
            let block = scanQueue[i];
            i++;

            // CHECK 1: Print
            if (block.type === 'print_console') {
                hasPrint = true;
            }

            // CHECK 2: Delay
            if (block.type === 'delay_ms') {
                const delayInput = block.getInputTargetBlock('MILLISECONDS');
                if (delayInput && delayInput.type === 'math_number') {
                    if (parseInt(delayInput.getFieldValue('NUM')) >= MIN_DELAY_MS) hasDelay = true;
                } else if (delayInput) {
                    hasDelay = true; // Assume variable/math is valid
                }
            }

            // CHECK 3: Function Calls (Dive deeper)
            if (block.type === 'procedures_callnoreturn' || block.type === 'procedures_callreturn') {
                const funcName = block.getFieldValue('NAME');
                if (!visitedFunctions.has(funcName)) {
                    visitedFunctions.add(funcName);
                    // Find function definition
                    const defBlock = allWorkspaceBlocks.find(b => 
                        (b.type === 'procedures_defnoreturn' || b.type === 'procedures_defreturn') && 
                        b.getFieldValue('NAME') === funcName
                    );
                    if (defBlock) {
                        const funcBody = defBlock.getInputTargetBlock('STACK');
                        if (funcBody) {
                            // Add function blocks to the CURRENT loop's queue
                            scanQueue = scanQueue.concat(funcBody.getDescendants());
                        }
                    }
                }
            }
        }

        // VERDICT for this specific loop

        if (hasPrint && !hasDelay) {
          let currentLang = localStorage.getItem('appLanguage') || 'en';
          const msg = getLocalizedText('UNSAFE_PRINT_ERROR', currentLang);
          //logMessage(msg, 'error');
          showAlert(msg);
          return false;
        }
        return true;
    }
}

// Settings and UI Logic 

Blockly.dialog.setPrompt(function(message, defaultValue, callback) {
  showVariableDialog(message, defaultValue, callback);
});

//Blockly Event Listener
workspace.addChangeListener(enforceSingletons);

// Settings Modal
settingsBtn.addEventListener('click', () => {
  settingsModal.classList.remove('hidden');
});
closeSettingsBtn.addEventListener('click', () => {
  settingsModal.classList.add('hidden');
});
settingsModal.addEventListener('click', (e) => {
  if (e.target === settingsModal) { // Click on overlay
    settingsModal.classList.add('hidden');
  }
});

// Theme Switch
themeSwitch.addEventListener('change', () => {
  if (themeSwitch.checked) {
    document.body.classList.add('dark-theme');
    workspace.setTheme(darkTheme);
  } else {
    document.body.classList.remove('dark-theme');
    workspace.setTheme(lightTheme);
  }
});

// Advanced Toggle
advancedToggle.addEventListener('change', () => {
  const show = advancedToggle.checked;

  setAdvancedMode(show);

  showJsonBtn.style.display = show ? 'flex' : 'none';
  showLogsBtn.style.display = show ? 'flex' : 'none';

  // If the active panel is being hidden, switch to console
  const logActive = showLogsBtn.classList.contains('active');
  const jsonActive = showJsonBtn.classList.contains('active');
  if (!show && (logActive || jsonActive)) {
      showConsoleBtn.click(); // Trigger showPanel logic in ui.js
  }
});
// Set initial state for advanced tabs
if (!advancedToggle.checked) {
    showJsonBtn.style.display = 'none';
    showLogsBtn.style.display = 'none';
}


// Core Code Generation & Control Logic

function generateCode() {
  ESP32_VM.init(workspace); 
  const topBlocks = workspace.getTopBlocks(true);
  const jumpToMainIndex = ESP32_VM.instructions.length;
  ESP32_VM.instructions.push({ op: 'OP_JUMP', arg1: -1 });

    const functionDefs = topBlocks.filter(block =>
      block.type === 'procedures_defnoreturn' || block.type === 'procedures_defreturn'
    );

    for (const funcBlock of functionDefs) {
      ESP32_VM.blockToCode(funcBlock);
    }

  const mainProgramAddress = ESP32_VM.instructions.length;

  ESP32_VM.instructions[jumpToMainIndex].arg1 = mainProgramAddress;

  const mainProgramBlock = topBlocks.find(block => block.type === 'esp32_program');
    if (mainProgramBlock) {
      ESP32_VM.blockToCode(mainProgramBlock);
    } else {
      logMessage("Warning: No 'ESP32 Program' block found.");
      ESP32_VM.instructions.push({ op: "OP_HALT" });
    }
    const jsonCode = ESP32_VM.finish();
    jsonOutputEl.textContent = jsonCode;
    return jsonCode;
}

// Run Button
runBtn.addEventListener('click', () => {

  const emptyBlock = findFirstEmptyInput(Blockly.getMainWorkspace());

  if (emptyBlock) {
    Blockly.getMainWorkspace().centerOnBlock(emptyBlock.id);
    emptyBlock.select();
    let currentLang = localStorage.getItem('appLanguage') || 'en';
    showAlert(getLocalizedText('BLOCK_EMPTY_INPUT_ERROR' ,currentLang));
    return; 
  }

  const isSafe = validateSafePrint(Blockly.getMainWorkspace());
    
    if (!isSafe) {
        return; 
    }

  // Generate Code
  const readableJsonString = generateCode(); // Assuming this function exists in your scope
  const programObject = JSON.parse(readableJsonString);
  const numericProgramObject = convertOpcodes(programObject);
  const binaryPayload = convertProgramToBinary(numericProgramObject);

  // Send Program
  sendProgram(binaryPayload);

  // Send Run Command after short delay
  setTimeout(() => {
    logMessage("Sending 'run' command...", 'info');
    sendRunCommand();
  }, 300);

  // Animation
  runBtn.classList.add('is-running');
  setTimeout(() => runBtn.classList.remove('is-running'), 1200);
});

// Stop Button
stopBtn.addEventListener('click', () => {
  if (!isConnected()) return;

  logMessage("Sending 'stop' command...", 'info');
  sendStopCommand();

  // Animation
  stopBtn.classList.add('is-stopping');
  setTimeout(() => stopBtn.classList.remove('is-stopping'), 1200);
});

// Save and Load Functionality 
saveBtn.addEventListener('click', () => {
  showSaveDialog((fileName) => {
    // This is the callback function that runs when user clicks "Save"
    try {
      if (fileName === null || fileName.trim() === "") {
        logMessage("Save operation cancelled.");
        return;
      }
      if (!fileName.toLowerCase().endsWith('.xml')) {
        fileName += '.xml';
      }
      const xml = Blockly.Xml.workspaceToDom(workspace);
      const xmlText = Blockly.Xml.domToPrettyText(xml);
      const blob = new Blob([xmlText], { type: 'text/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      logMessage(`Workspace saved as ${fileName}`);
    } catch (e) {
      logMessage("Error saving workspace: " + e.message);
      showAlert("Error saving workspace.");
    }
  }, "program.xml"); // Pass the default filename
});

loadBtn.addEventListener('click', () => {
  loadInput.click();
});



loadInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) {
    return; 
  }

  if (!file.name.toLowerCase().endsWith('.xml')) {
    const fileExtension = file.name.split('.').pop();
    const currentLang = localStorage.getItem('appLanguage') || 'en';
    
    const msg = getLocalizedText('MSG_FILE_EXT_ERROR', currentLang).replace('%1', fileExtension);
    
    showAlert(msg);
    
    loadInput.value = null; 
    return; 
  }
  
  const reader = new FileReader();

  reader.onload = (e) => {
    const fileContent = e.target.result;
    
    // Now, we show the confirm dialog
    let currentLang = localStorage.getItem('appLanguage') || 'en';
    showConfirmDialog(
      getLocalizedText('UI_LOAD_CONFIRMATION_MSG' ,currentLang),
      () => {
        // User clicked "Confirm"
        try {
          const xml = Blockly.utils.xml.textToDom(fileContent);
          workspace.clear(); 
          Blockly.Xml.domToWorkspace(xml, workspace);
          logMessage(`Workspace loaded from ${file.name}`);
        } catch (err) {
          const currentLang = localStorage.getItem('appLanguage') || 'en';
          const msg = getLocalizedText('MSG_FILE_CORRUPT_ERROR', currentLang).replace('%1', file.name);
          showAlert(msg);
          
        } finally {
          loadInput.value = null; 
        }
      },
      () => {
        // User clicked "Cancel" 
        logMessage('Workspace load cancelled.');
        loadInput.value = null;
      }
    );
  };

  reader.onerror = () => {
    logMessage(`Error reading file: ${reader.error}`, 'error');
    loadInput.value = null; 
  };

  reader.readAsText(file);
});

// Load Default Workspace
const defaultXml = `
<xml xmlns="https://developers.google.com/blockly/xml">
 <block type="esp32_program" id="main_program" x="50" y="50"/>
</xml>`;

Blockly.Xml.domToWorkspace(Blockly.utils.xml.textToDom(defaultXml), workspace);
generateCode(); // Generate code once on startup

// Warn on Exit 
window.addEventListener('beforeunload', (event) => {
  event.preventDefault();
  event.returnValue = '';
  return '';
});