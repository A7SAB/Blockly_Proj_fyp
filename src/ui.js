
import { clearLogs, logMessage } from './logger.js';
import * as Blockly from 'blockly';


let saveModalEl, saveConfirmBtn, saveCancelBtn, saveFilenameInput;
let confirmModalEl, confirmMessageEl, confirmConfirmBtn, confirmCancelBtn;
let alertModalEl, alertMessageEl, alertOkBtn;
let variableModalEl, variableMessageEl, variableInputEl, variableConfirmBtn, variableCancelBtn, variableTitleEl;
let activeVariableCallback = null;
let activeConfirmCallback = null;
let activeSaveCallback = null;
let activeCancelCallback = null;

/**
 * Grabs references to all modal elements.
 */
export function initModals() {
  saveModalEl = document.getElementById('save-modal');
  saveConfirmBtn = document.getElementById('save-modal-confirm-btn');
  saveCancelBtn = document.getElementById('save-modal-cancel-btn');
  saveFilenameInput = document.getElementById('save-filename-input');

  confirmModalEl = document.getElementById('confirm-modal');
  confirmMessageEl = document.getElementById('confirm-modal-message');
  confirmConfirmBtn = document.getElementById('confirm-modal-confirm-btn');
  confirmCancelBtn = document.getElementById('confirm-modal-cancel-btn');

  alertModalEl = document.getElementById('alert-modal');
  alertMessageEl = document.getElementById('alert-modal-message');
  alertOkBtn = document.getElementById('alert-modal-ok-btn');

  variableModalEl = document.getElementById('variable-modal');
  variableMessageEl = document.getElementById('variable-modal-message');
  variableInputEl = document.getElementById('variable-name-input');
  variableConfirmBtn = document.getElementById('variable-modal-confirm-btn');
  variableCancelBtn = document.getElementById('variable-modal-cancel-btn');
  variableTitleEl = document.getElementById('variable-modal-title');
  

  // --- Setup Listeners ---
  
  // Save Modal
  saveModalEl.addEventListener('click', (e) => {
    if (e.target === saveModalEl) hideSaveDialog();
  });
  saveCancelBtn.addEventListener('click', hideSaveDialog);
  saveConfirmBtn.addEventListener('click', () => {
    if (activeSaveCallback) {
      activeSaveCallback(saveFilenameInput.value);
    }
    hideSaveDialog();
  });

  // Confirm Modal
 confirmModalEl.addEventListener('click', (e) => {
    if (e.target === confirmModalEl) {
      if (activeCancelCallback) activeCancelCallback(); 
      hideConfirmDialog();
    }
  });
  confirmCancelBtn.addEventListener('click', () => {
    if (activeCancelCallback) activeCancelCallback(); 
    hideConfirmDialog();
  });
  confirmConfirmBtn.addEventListener('click', () => {
    if (activeConfirmCallback) {
      activeConfirmCallback();
    }
    hideConfirmDialog();
  });


  alertModalEl.addEventListener('click', (e) => {
      if (e.target === alertModalEl) {
        if (activeConfirmCallback) activeConfirmCallback(); 
        hideAlertDialog();
      }
    });
    alertOkBtn.addEventListener('click', () => {
      if (activeConfirmCallback) activeConfirmCallback(); 
      hideAlertDialog();
    });
    // ----------------------------

    variableModalEl.addEventListener('click', (e) => {
      if (e.target === variableModalEl) hideVariableDialog();
      });
      variableCancelBtn.addEventListener('click', hideVariableDialog);
      variableConfirmBtn.addEventListener('click', () => {
        if (activeVariableCallback) {
          activeVariableCallback(variableInputEl.value);
        }
        hideVariableDialog(true); // Pass flag to prevent re-calling callback
      });
};

/**
 * Shows the custom save file dialog.
 * @param {function(string)} onSave - Callback function, receives filename.
 * @param {string} [defaultName='program.xml'] - Default value for input.
 */
export function showSaveDialog(onSave, defaultName = 'program.xml') {
  activeSaveCallback = onSave;
  saveFilenameInput.value = defaultName;
  saveModalEl.classList.remove('hidden');
  saveFilenameInput.focus();
  saveFilenameInput.select();
}

/**
 * Shows the custom confirm dialog.
 * @param {string} message - The message to display.
 * @param {function} onConfirm - Callback function if user confirms.
 */
export function showConfirmDialog(message, onConfirm, onCancel = null) { // <-- UPDATE SIGNATURE
  activeConfirmCallback = onConfirm;
  activeCancelCallback = onCancel;
  confirmMessageEl.textContent = message;
  confirmModalEl.classList.remove('hidden');
  confirmConfirmBtn.focus();
}

export function showAlert(message, onOk = null) {
  activeConfirmCallback = onOk; 
  alertMessageEl.textContent = message;
  alertModalEl.classList.remove('hidden');
  alertOkBtn.focus();
}

export function showVariableDialog(message, defaultValue, callback) {
  activeVariableCallback = callback;
  variableMessageEl.textContent = message;
  variableInputEl.value = defaultValue;

  
  variableModalEl.classList.remove('hidden');
  variableInputEl.focus();
  variableInputEl.select();
}

// Hide Functions 
function hideSaveDialog() {
  activeSaveCallback = null;
  saveModalEl.classList.add('hidden');
}

function hideConfirmDialog() {
  activeConfirmCallback = null;
  activeCancelCallback = null; 
  confirmModalEl.classList.add('hidden');
}

function hideAlertDialog() {
  activeConfirmCallback = null; // Clear the callback
  alertModalEl.classList.add('hidden');
}

function hideVariableDialog(confirmed = false) {
  if (!confirmed && activeVariableCallback) {
    // Only call with null if it was a cancel (not a confirm)
    activeVariableCallback(null);
  }
  activeVariableCallback = null;
  variableModalEl.classList.add('hidden');
}

/**
 * Sets up all UI event listeners for tabs and buttons.
 */
export function setupUI(
  jsonOutputEl, 
  logOutputEl, 
  consoleOutputEl,
  showJsonBtn,
  showLogsBtn,
  showConsoleBtn,
  clearLogBtn,
  outputAreaEl,   
  outputTabsEl,
  isAdvanced
) {

  const tabs = [showJsonBtn, showLogsBtn, showConsoleBtn];
  const panels = [jsonOutputEl, logOutputEl, consoleOutputEl];

  function showPanel(panelToShow, btnToActivate) {
    panels.forEach(p => p.style.display = 'none');
    tabs.forEach(t => t.classList.remove('active'));
    
    panelToShow.style.display = 'block';
    btnToActivate.classList.add('active');
  }
  
  showJsonBtn.addEventListener('click', () => showPanel(jsonOutputEl, showJsonBtn));
  showLogsBtn.addEventListener('click', () => showPanel(logOutputEl, showLogsBtn));
  showConsoleBtn.addEventListener('click', () => showPanel(consoleOutputEl, showConsoleBtn));

  clearLogBtn.addEventListener('click', clearLogs);

  if (isAdvanced) {
    showPanel(logOutputEl, showLogsBtn);
  } else {
    showPanel(consoleOutputEl, showConsoleBtn);
  }

  makeElementDraggable(outputAreaEl, outputTabsEl);
}

/**
 * Finds the first block on the workspace with an empty input.
 * @param {Blockly.WorkspaceSvg} workspace - The main Blockly workspace.
 * @returns {Blockly.Block | null} The invalid block or null.
 */
export function findFirstEmptyInput(workspace) {
  // Get all blocks (false = unordered, which is faster)
  const allBlocks = workspace.getAllBlocks(false);

  for (const block of allBlocks) {
    
    if (!block.isEnabled()) {
      continue;
    }

    // These are the "ghost" blocks that appear while dragging.
    if (block.isInsertionMarker()) {
      continue;
    }
    
    // If you only want to check code attached to a "Start" or "Setup" block,

    for (const input of block.inputList) {
      // We only care about VALUE inputs 
      if (input.type === Blockly.INPUT_VALUE) {
        
        // Check if the connection exists and if nothing is attached
        if (input.connection && !input.connection.targetBlock()) {
          
          // If a block has a default "shadow" (like a number 0), it is NOT considered empty.
          // targetBlock() returns the shadow block if one exists.
          // So !targetBlock() correctly means "really empty".
          
          return block; // Found the error
        }
      }
    }
  }

  return null; 
}

// Draggable Element Logic
function makeElementDraggable(elmnt, handle) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  handle.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
  e = e || window.event;
  e.preventDefault();
  pos1 = pos3 - e.clientX;
  pos2 = pos4 - e.clientY;
  pos3 = e.clientX;
  pos4 = e.clientY;

  // Standard drag sets top/left
  elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
  elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  
  elmnt.style.right = 'auto'; 
}

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}