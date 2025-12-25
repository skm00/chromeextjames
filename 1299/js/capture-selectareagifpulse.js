// capture-areagif.js
(function() {
  console.log("capture-areagif.js: Neo-Corporate Precision Style Loaded"); 
  
  let startTime;
  let timerInterval;
  let style;
  let recordingLimitTimeout;

  const customCursor = document.createElement('div');
  customCursor.id = 'neo-corp-cursor';

  function showIndicator() {
    const recordingIndicator = document.createElement('div');
    recordingIndicator.id = 'gif-recording-indicator';
    recordingIndicator.className = 'ignore-cursor-hide'; 
    
    recordingIndicator.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #121212;
      color: #00FF41; /* Matrix/Terminal Green for high visibility */
      padding: 15px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      gap: 12px;
      border: 1px solid #00FF41;
      box-shadow: 0 0 15px rgba(0, 255, 65, 0.2);
      min-width: 200px;
    `;
    
    recordingIndicator.innerHTML = `
      <div id="gif-status-header" style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="width: 8px; height: 8px; background: #FF3131; border-radius: 50%; animation: rec-blink 1s infinite;"></span>
          <span style="font-weight: bold; letter-spacing: 1px;">SYSTEM_RECORDING</span>
        </div>
        <span id="gif-timer">00:00</span>
      </div>
      
      <div id="progress-section" style="display: none;">
        <div style="margin-bottom: 5px; font-size: 10px;">ENCODING_DATA... <span id="gif-percent">0%</span></div>
        <div style="width: 100%; height: 2px; background: #222;">
          <div id="progress-bar-fill" style="width: 0%; height: 100%; background: #00FF41; box-shadow: 0 0 10px #00FF41;"></div>
        </div>
      </div>

      <button id="stop-gif-recording" style="
        background: transparent;
        color: #00FF41;
        border: 1px solid #00FF41;
        padding: 6px;
        cursor: pointer !important;
        font-family: inherit;
        font-weight: bold;
        text-transform: uppercase;
        transition: all 0.2s;
      ">Terminate & Save</button>
    `;
    
    style = document.createElement('style');
    style.textContent = `
      @keyframes rec-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      
      #neo-corp-cursor {
        position: fixed;
        top: 0; left: 0;
        width: 24px; height: 24px;
        border: 2px solid #00FF41;
        background: rgba(0, 255, 65, 0.05);
        pointer-events: none;
        z-index: 2147483646;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 8px rgba(0, 255, 65, 0.4);
      }

      .click-effect {
        position: fixed;
        width: 40px; height: 40px;
        border: 1px solid #FF3131;
        pointer-events: none;
        z-index: 2147483645;
        transform: translate(-50%, -50%);
        animation: click-expand 0.4s ease-out forwards;
      }

      @keyframes click-expand {
        0% { transform: translate(-50%, -50%) scale(0.2); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
      }

      body, body * { cursor: none !important; }
      .ignore-cursor-hide, .ignore-cursor-hide * { cursor: crosshair !important; }
      #stop-gif-recording:hover { background: #00FF41; color: #000; }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(recordingIndicator);
    document.body.appendChild(customCursor);

    // FIXED TIMER LOGIC
    startTime = Date.now();
    timerInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const mins = Math.floor(elapsed / 60000).toString().padStart(2, '0');
      const secs = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
      const timerEl = document.getElementById('gif-timer');
      if (timerEl) timerEl.textContent = `${mins}:${secs}`;
    }, 100); // Update every 100ms for visual smoothness
  }

  function handleMouseMove(e) {
    // requestAnimationFrame ensures the cursor doesn't "jitter" during high CPU load
    requestAnimationFrame(() => {
      customCursor.style.left = e.clientX + 'px';
      customCursor.style.top = e.clientY + 'px';
    });
  }

  function handleMouseDown(e) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.style.left = e.clientX + 'px';
    effect.style.top = e.clientY + 'px';
    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 400);
  }

  function stopRecording() {
    if (timerInterval) clearInterval(timerInterval);
    if (recordingLimitTimeout) clearTimeout(recordingLimitTimeout);
    
    window.removeEventListener('mousemove', handleMouseMove, true);
    window.removeEventListener('mousedown', handleMouseDown, true);
    if (customCursor) customCursor.remove();

    // UI Switch
    const stopBtn = document.getElementById('stop-gif-recording');
    const progSection = document.getElementById('progress-section');
    const statusText = document.querySelector('#gif-status-header span:last-child');

    if (stopBtn) stopBtn.style.display = 'none';
    if (statusText) statusText.textContent = '00:00'; 
    if (progSection) progSection.style.display = 'block';

    chrome.runtime.sendMessage({ action: 'stopGifCapture' });
  }

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'GIF_ENCODING_PROGRESS') {
      const percent = Math.round(msg.progress * 100);
      const percentText = document.getElementById('gif-percent');
      const barFill = document.getElementById('progress-bar-fill');
      if (percentText) percentText.textContent = percent + '%';
      if (barFill) barFill.style.width = percent + '%';
    } else if (msg.type === 'GIF_ENCODING_COMPLETE') {
      const indicator = document.getElementById('gif-recording-indicator');
      if (indicator) {
        indicator.innerHTML = `<div style="text-align:center; color:#00FF41; font-weight:bold;">EXPORT_SUCCESSFUL</div>`;
        setTimeout(() => {
          indicator.remove();
          if (style) style.remove();
        }, 2000);
      }
    }
  });

  async function startRecording() {
    chrome.runtime.sendMessage({ 
      action: 'startGifCapture', 
      area: { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight } 
    }, (response) => {
      if (chrome.runtime.lastError) return;
      showIndicator();
      window.addEventListener('mousemove', handleMouseMove, true);
      window.addEventListener('mousedown', handleMouseDown, true);
      
      const btn = document.getElementById('stop-gif-recording');
      if(btn) btn.onclick = stopRecording;

      // SET SAFETY LIMIT TO 10 MINUTES INSTEAD OF 30 SECONDS
      recordingLimitTimeout = setTimeout(stopRecording, 300000); 
    });
  }

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') stopRecording(); }, { once: true });
  startRecording();
})();