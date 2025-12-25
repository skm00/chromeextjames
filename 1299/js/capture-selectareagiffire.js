// capture-areagif.js
(function() {
  console.log("capture-areagif.js: Professional Cursor Loaded"); 
  let seconds = 0;
  let timerInterval;
  let style;
  let cursorRestoreTimeout;

  // Custom Cursor Element
  const customCursor = document.createElement('div');
  customCursor.id = 'prof-gif-cursor';

  function showIndicator() {
    const recordingIndicator = document.createElement('div');
    recordingIndicator.id = 'gif-recording-indicator';
    recordingIndicator.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #202124;
      color: #FFFFFF;
      padding: 5px 15px;
      border-radius: 4px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 12px;
      z-index: 2147483647;
      box-shadow: 0 2px 10px rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      gap: 8px;
      border-left: 3px solid #ea4335;
    `;
    recordingIndicator.innerHTML = `
      <span style="width: 8px; height: 8px; background: #ea4335; border-radius: 50%; animation: blink 1s step-end infinite;"></span>
      <span>RECORDING: <span id="gif-timer">0s</span></span>
      <button id="stop-gif-recording" style="margin-left: 8px; background: #3c4043; color: white; border: none; padding: 2px 8px; border-radius: 3px; cursor: pointer; font-size: 10px;">DONE</button>
    `;
    
    style = document.createElement('style');
    style.textContent = `
      @keyframes blink { 50% { opacity: 0; } }
      @keyframes clickRipple {
        0% { transform: scale(1); opacity: 0.8; }
        100% { transform: scale(3); opacity: 0; }
      }
      
      #prof-gif-cursor {
        position: absolute;
        width: 12px;
        height: 12px;
        background: white;
        border: 2px solid black;
        border-radius: 50%;
        pointer-events: none;
        z-index: 2147483646;
        box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.1s, height 0.1s;
      }

      .click-ripple {
        position: absolute;
        border: 2px solid #ea4335;
        border-radius: 50%;
        pointer-events: none;
        z-index: 2147483645;
        transform: translate(-50%, -50%);
        animation: clickRipple 0.4s ease-out forwards;
      }

      /* Hide native cursor to prevent double-cursor glitch in recording */
      body, body * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(recordingIndicator);
    document.body.appendChild(customCursor);

    timerInterval = setInterval(() => {
      seconds++;
      const timerEl = document.getElementById('gif-timer');
      if (timerEl) timerEl.textContent = seconds + 's';
    }, 1000);
  }

  function handleMouseMove(e) {
    customCursor.style.left = e.pageX + 'px';
    customCursor.style.top = e.pageY + 'px';
  }

  function handleMouseDown(e) {
    // Visual feedback for clicking
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = e.pageX + 'px';
    ripple.style.top = e.pageY + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    document.body.appendChild(ripple);
    
    // Slight shrink effect on main cursor
    customCursor.style.width = '10px';
    customCursor.style.height = '10px';

    setTimeout(() => ripple.remove(), 400);
  }

  function handleMouseUp() {
    customCursor.style.width = '12px';
    customCursor.style.height = '12px';
  }

  function setupCursor() {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function removeCursor() {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mouseup', handleMouseUp);
    if (customCursor) customCursor.remove();
    if (style) style.remove();
  }

  function stopRecording() {
    if (timerInterval) clearInterval(timerInterval);
    if (cursorRestoreTimeout) clearTimeout(cursorRestoreTimeout);
    removeCursor();
    
    const indicator = document.getElementById('gif-recording-indicator');
    if (indicator) {
      indicator.style.borderLeft = '3px solid #fbbc04';
      indicator.innerHTML = `Encoding professional GIF... <span id="gif-progress">0%</span>`;
    }
    
    chrome.runtime.sendMessage({ action: 'stopGifCapture' });
  }

  // Encoding Listeners
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'GIF_ENCODING_PROGRESS') {
      const progressEl = document.getElementById('gif-progress');
      if (progressEl) progressEl.textContent = Math.round(msg.progress * 100) + '%';
    } else if (msg.type === 'GIF_ENCODING_COMPLETE') {
      const indicator = document.getElementById('gif-recording-indicator');
      if (indicator) {
        indicator.style.borderLeft = '3px solid #34a853';
        indicator.innerHTML = `✔ GIF Exported Successfully`;
        setTimeout(() => indicator.remove(), 2500);
      }
    }
  });

  async function startRecording() {
    try {
      const fullArea = { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight };
      chrome.runtime.sendMessage({ action: 'startGifCapture', area: fullArea }, (response) => {
        if (chrome.runtime.lastError || (response && !response.success)) return;
        
        showIndicator();
        setupCursor();
        
        // Safety timeout
        cursorRestoreTimeout = setTimeout(removeCursor, 60000);
        
        setTimeout(() => {
          const stopBtn = document.getElementById('stop-gif-recording');
          if (stopBtn) stopBtn.addEventListener('click', stopRecording);
        }, 100);
        
        // Auto-stop after 30s for performance
        setTimeout(stopRecording, 300000);
      });
    } catch (e) { console.error(e); }
  }

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') stopRecording(); }, { once: true });
  startRecording();
})();