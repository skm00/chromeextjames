// capture-areagif.js
(function() {
  console.log("capture-areagif.js: High-Contrast Ghost Loaded"); 
  let seconds = 0;
  let timerInterval;
  let style;

  const customCursor = document.createElement('div');
  customCursor.id = 'ghost-cursor-pointer';

  function showIndicator() {
    const recordingIndicator = document.createElement('div');
    recordingIndicator.id = 'gif-recording-indicator';
    recordingIndicator.className = 'ignore-cursor-hide'; 
    
    recordingIndicator.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #000000;
      color: #FFFFFF;
      padding: 12px 20px;
      border-radius: 8px;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 13px;
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.4);
      border: 1px solid rgba(255,255,255,0.2);
      min-width: 200px;
    `;
    
    recordingIndicator.innerHTML = `
      <div id="gif-status-header" style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 10px; height: 10px; background: #00E676; border-radius: 50%; animation: ghost-blink 1s infinite;"></div>
          <span style="font-weight: 700; letter-spacing: 0.5px;">LIVE CAPTURE</span>
        </div>
        <span id="gif-timer" style="font-family: monospace; font-size: 14px;">00:00</span>
      </div>
      
      <div id="progress-container" style="display: none;">
         <div style="width: 100%; height: 4px; background: #333; border-radius: 2px; overflow: hidden; margin-bottom: 4px;">
           <div id="progress-bar-fill" style="width: 0%; height: 100%; background: #00E676; transition: width 0.2s linear;"></div>
         </div>
         <div style="display: flex; justify-content: space-between; font-size: 11px; color: #888;">
            <span>ENCODING GIF...</span>
            <span id="gif-percent">0%</span>
         </div>
      </div>

      <button id="stop-gif-recording" style="
        width: 100%;
        background: #FFFFFF; 
        color: #000000; 
        border: none; 
        padding: 8px; 
        border-radius: 4px; 
        cursor: pointer !important;
        font-size: 12px; 
        font-weight: 800;
        text-transform: uppercase;
      ">Stop Recording</button>
    `;
    
    style = document.createElement('style');
    style.textContent = `
      @keyframes ghost-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      
      #ghost-cursor-pointer {
        position: fixed; /* Fixed is more reliable for screen capture */
        top: 0;
        left: 0;
        width: 30px;
        height: 30px;
        border: 3px solid #00E676; /* Bright Neon Green */
        background: rgba(0, 230, 118, 0.1);
        border-radius: 50%;
        pointer-events: none;
        z-index: 2147483646;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 0 2px white, 0 0 15px rgba(0, 230, 118, 0.6); /* Double border for visibility */
        display: block !important;
        visibility: visible !important;
      }

      .ghost-click-ring {
        position: fixed;
        border: 4px solid white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 2147483645;
        transform: translate(-50%, -50%);
        animation: ghost-ripple 0.4s ease-out forwards;
      }

      @keyframes ghost-ripple {
        0% { width: 0; height: 0; opacity: 1; }
        100% { width: 80px; height: 80px; opacity: 0; }
      }

      /* HIDE NATIVE CURSOR EXCEPT ON THE UI */
      body, body * { cursor: none !important; }
      .ignore-cursor-hide, .ignore-cursor-hide * { cursor: default !important; }
    `;
    document.head.appendChild(style);
    document.body.appendChild(recordingIndicator);
    document.body.appendChild(customCursor);

    timerInterval = setInterval(() => {
      seconds++;
      const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
      const secs = (seconds % 60).toString().padStart(2, '0');
      const timerEl = document.getElementById('gif-timer');
      if (timerEl) timerEl.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  function handleMouseMove(e) {
    // clientX/Y works best with position: fixed
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
  }

  function handleMouseDown(e) {
    const ring = document.createElement('div');
    ring.className = 'ghost-click-ring';
    ring.style.left = e.clientX + 'px';
    ring.style.top = e.clientY + 'px';
    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), 400);
  }

  function setupCursor() {
    window.addEventListener('mousemove', handleMouseMove, true);
    window.addEventListener('mousedown', handleMouseDown, true);
  }

  function removeCursor() {
    window.removeEventListener('mousemove', handleMouseMove, true);
    window.removeEventListener('mousedown', handleMouseDown, true);
    if (customCursor) customCursor.remove();
  }

  function stopRecording() {
    if (timerInterval) clearInterval(timerInterval);
    removeCursor();

    const stopBtn = document.getElementById('stop-gif-recording');
    const progContainer = document.getElementById('progress-container');
    const statusText = document.querySelector('#gif-status-header span');

    if (stopBtn) stopBtn.style.display = 'none';
    if (statusText) statusText.textContent = 'SAVING...';
    if (progContainer) progContainer.style.display = 'block';

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
        indicator.style.background = '#00E676';
        indicator.style.color = '#000';
        indicator.innerHTML = `<div style="text-align:center; font-weight:900;">GIF READY!</div>`;
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
      setupCursor();
      setTimeout(() => {
        const btn = document.getElementById('stop-gif-recording');
        if(btn) btn.onclick = stopRecording;
      }, 100);
    });
	
	        setTimeout(stopRecording, 300000);

	
  }

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') stopRecording(); }, { once: true });
  startRecording();
})();