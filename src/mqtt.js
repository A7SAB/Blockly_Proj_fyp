// mqtt.js

import mqtt from 'mqtt'; 
import { logMessage } from './logger.js';
import { showAlert } from './ui.js';
import { getLocalizedText } from './locals/locals.js';

// --- State Variables ---
let mqttClient = null;
let robotId = ''; 
let robotAliveTimer = null; 
let isRobotOnline = false;

// --- UI Elements Cache ---
let ui = {
  connectBtn: null,
  connectText: null,
  container: null,
  rssi: null,
  dot: null,
  text: null
};

// --- Constants ---

export function setupMqtt(elements) {
  ui = { ...ui, ...elements };
  updateConnectionUI('disconnected');
  
  // Reset state
  isRobotOnline = false;
  updateRobotStatus(false);
}

export function setRobotId(newId) {
  if (robotId === newId) return;
  const oldId = robotId;
  robotId = newId;
  logMessage(`Robot ID changed to: ${robotId}`, 'log');

  if (mqttClient && mqttClient.connected) {
    mqttClient.unsubscribe(`${oldId}/console`);
    mqttClient.unsubscribe(`${oldId}/log`);
    mqttClient.unsubscribe(`${oldId}/status`);
    subscribeToRobot();
  }
}

export function connectToBroker(brokerUrl, port) {
  if (mqttClient) mqttClient.end();

  updateConnectionUI('connecting');
  const fullUrl = `ws://${brokerUrl}:${port}/mqtt`; 
  
  logMessage(`Connecting to ${fullUrl}...`, 'log');

  mqttClient = mqtt.connect(fullUrl, {
    clientId: 'web_client_' + Math.random().toString(16).substr(2, 8),
    connectTimeout: 5000,
  });

  mqttClient.on('connect', onConnect);
  mqttClient.on('error', onFailure);
  mqttClient.on('close', onConnectionLost);
  mqttClient.on('message', onMessageArrived);
}

export function disconnectBroker() {
  if (mqttClient) {
    mqttClient.end();
    mqttClient = null;
    
    // Reset Everything
    isRobotOnline = false;
    updateConnectionUI('disconnected');
    updateRobotStatus(false); 
    
    logMessage("Disconnected from broker.", 'log');
  }
}

function onConnect() {
  logMessage("Connected to MQTT Broker.", 'log');
  updateConnectionUI('connected');
  subscribeToRobot();
  
  // Connected to broker, but Robot is unknown until first heartbeat
  isRobotOnline = false;
  updateRobotStatus(false);
}

function subscribeToRobot() {
  if (!mqttClient) return;
  const topics = [`${robotId}/console`, `${robotId}/log`, `${robotId}/status`];
  mqttClient.subscribe(topics, (err) => {
    if (!err) logMessage(`Subscribed to: ${topics.join(', ')}`, 'log');
  });
}

function onFailure(error) {
  logMessage(`MQTT Error: ${error.message}`, 'error');
  updateConnectionUI('disconnected');
  isRobotOnline = false;
  updateRobotStatus(false);
}

function onConnectionLost() {
  logMessage("Connection to Broker lost.", 'warn');
  updateConnectionUI('disconnected');
  isRobotOnline = false;
  updateRobotStatus(false);
}

function onMessageArrived(topic, payload) {
  const msg = payload.toString();

  // 1. Handle Status Heartbeat
  if (topic === `${robotId}/status`) {
    try {
      const statusData = JSON.parse(msg);
      handleRobotHeartbeat(statusData);
    } catch (e) {
      logMessage(`Error parsing status: ${e.message}`, 'error');
    }
    return;
  }

  // 2. Handle Logs/Console
  if (topic === `${robotId}/console`) {
    logMessage(`${msg}`, 'console');
  } else if (topic === `${robotId}/log`) {
    logMessage(`[Robot]: ${msg}`, 'log');
  }
}

function handleRobotHeartbeat(data) {
    if (data.alive) {
        // We received a valid heartbeat -> Robot is Online
        isRobotOnline = true;
        updateRobotStatus(true, data.rssi);

        if (robotAliveTimer) clearTimeout(robotAliveTimer);
        
        // Watchdog: If 6s pass without heartbeat, mark as Offline
        robotAliveTimer = setTimeout(() => {
            isRobotOnline = false;
            updateRobotStatus(false); 
        }, 6000); 
    }
}

function updateRobotStatus(isAlive, rssi = -100) {
    if (!ui.container) return;

    const currentLang = localStorage.getItem('appLanguage') || 'en';

    ui.container.classList.remove('hidden');

    if (ui.rssi) {
        ui.rssi.classList.remove('strength-1', 'strength-2', 'strength-3', 'strength-4');
    }

    const isBrokerConnected = mqttClient && mqttClient.connected;

    if (!isBrokerConnected) {

        ui.container.classList.add('is-offline');

        if (ui.dot) ui.dot.className = 'status-dot offline';

        if (ui.text) {
            ui.text.textContent = getLocalizedText('UI_STATUS_OFFLINE', currentLang) || "Offline";
            ui.text.setAttribute('data-i18n', 'UI_STATUS_OFFLINE');
        }
        
    } else if (!isAlive) {
        ui.container.classList.add('is-offline');

        if (ui.dot) ui.dot.className = 'status-dot only_broker';

        if (ui.text) {
            ui.text.textContent = getLocalizedText('UI_STATUS_WAITING', currentLang);
            ui.text.setAttribute('data-i18n', 'UI_STATUS_WAITING') 
        }

    } else {
        ui.container.classList.remove('is-offline');

        if (ui.dot) ui.dot.className = 'status-dot online';

        let strength = 1;
        if (rssi >= -50) strength = 4;
        else if (rssi >= -65) strength = 3;
        else if (rssi >= -75) strength = 2;

        if (ui.rssi) {
            ui.rssi.classList.add(`strength-${strength}`);
            ui.rssi.title = `Signal: ${rssi} dBm`;
        }
    }
}

// --- Public Command Functions ---

export function sendRunCommand() {
  if (checkRobotOffline()) return;
  publish(`${robotId}/control`, "run");
}

export function sendStopCommand() {
  if (checkRobotOffline()) return;
  publish(`${robotId}/control`, "stop");
}

export function sendProgram(binaryPayload) {
  if (checkRobotOffline()) return;
  
  logMessage(`Uploading program to ${robotId}/program...`, 'log');
  publish(`${robotId}/program`, binaryPayload);
}

// Helper to check connection and alert user
function checkRobotOffline() {
  if (!isRobotOnline) {
    const lang = localStorage.getItem('appLanguage') || 'en';
    showAlert(getLocalizedText('MSG_ROBOT_OFFLINE', lang));
    return true; // Returns true if offline (to stop execution)
  }
  return false;
}

function publish(topic, message) {
  if (mqttClient && mqttClient.connected) {
    mqttClient.publish(topic, message);
  } else {
    alert("Error: Web Browser is not connected to MQTT Broker.");
  }
}

// --- UI Helper ---

function updateConnectionUI(state) {
  // Get current language
  const currentLang = localStorage.getItem('appLanguage') || 'en';
  
  if (!ui.connectBtn) return;
  
  // Reset classes
  ui.connectBtn.classList.remove('disconnected', 'connecting', 'connected');
  
  if (state === 'connected') {
    // --- CONNECTED STATE ---
    ui.connectBtn.classList.add('connected');    
    // Set Text & Attribute (for future lang switches)
    ui.connectText.textContent = getLocalizedText('UI_DISCONNECT', currentLang);
    ui.connectText.setAttribute('data-i18n', 'UI_DISCONNECT');
    
    // Update Status Text
    /*
    if (ui.text) {
        ui.text.textContent = getLocalizedText('UI_STATUS_ONLINE', currentLang);
        ui.text.setAttribute('data-i18n', 'UI_STATUS_ONLINE');
    }
    */

  } else if (state === 'connecting') {
    // --- CONNECTING STATE ---
    ui.connectBtn.classList.add('connecting');
    
    ui.connectText.textContent = getLocalizedText('UI_STATUS_CONNECTING', currentLang);
    ui.connectText.setAttribute('data-i18n', 'UI_STATUS_CONNECTING');
    
  } else {
    // --- DISCONNECTED STATE ---
    ui.connectBtn.classList.add('disconnected');
    
    ui.connectText.textContent = getLocalizedText('UI_CONNECT', currentLang);
    ui.connectText.setAttribute('data-i18n', 'UI_CONNECT');
    
    // Update Status Text
    if (ui.text) {
        ui.text.textContent = getLocalizedText('UI_STATUS_OFFLINE', currentLang);
        ui.text.setAttribute('data-i18n', 'UI_STATUS_OFFLINE');
    }
  }
}

export function isConnected() {
  return mqttClient && mqttClient.connected;
}