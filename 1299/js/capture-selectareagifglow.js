// capture-areagif.js
(function() {
  console.log("capture-areagif.js: Premium Studio Cursor Loaded"); 
  let seconds = 0;
  let timerInterval;
  let style;
  let cursorRestoreTimeout;

  const customCursor = document.createElement('div');
  customCursor.id = 'studio-precision-cursor';

  function showIndicator() {
    const recordingIndicator = document.createElement('div');
    recordingIndicator.id = 'gif-recording-indicator';
    // Glassmorphism styling for the indicator
    recordingIndicator.style.cssText = `
      position: fixed;
      top: 24px;
      right: 24px;
      background: rgba(28, 28, 30, 0.85);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      color: #FFFFFF;
      padding: 8px 16px;
      border-radius: 12px;
      font-family: 'Inter', -apple-system, sans-serif;
      font-size: 13px;
      font-weight: 500;
      z-index: 2147483647;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      gap: 12px;
      border: 1px solid rgba(255,255,255,0.1);
    `;
    recordingIndicator.innerHTML = `
      <div style="position: relative; display: flex; align-items: center; justify-content: center;">
        <span style="width: 8px; height: 8px; background: #FF3B30; border-radius: 50%;"></span>
        <span style="position: absolute; width: 16px; height: 16px; background: #FF3B30; border-radius: 50%; opacity: 0.4; animation: studio-pulse 2s infinite;"></span>
      </div>
      <span style="letter-spacing: 0.5px;">REC <span id="gif-timer" style="color: #A1A1A6; margin-left: 4px;">00:00</span></span>
      <div style="width: 1px; height: 16px; background: rgba(255,255,255,0.2);"></div>
      <button id="stop-gif-recording" style="background: transparent; color: #FF453A; border: none; padding: 0; cursor: pointer; font-size: 12px; font-weight: 700; letter-spacing: 0.5px;">STOP</button>
    `;
    
    style = document.createElement('style');
    style.textContent = `
      @keyframes studio-pulse {
        0% { transform: scale(1); opacity: 0.4; }
        100% { transform: scale(2.5); opacity: 0; }
      }
      
      @keyframes click-implode {
        0% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(0.7); }
        100% { transform: translate(-50%, -50%) scale(1); }
      }

      #studio-precision-cursor {
        position: absolute;
        width: 10px;
        height: 10px;
        background: #5856D6; /* Premium Indigo */
        border: 2px solid white;
        border-radius: 50%;
        pointer-events: none;
        z-index: 2147483646;
        transform: translate(-50%, -50%);
        box-shadow: 0 2px 10px rgba(0,0,0,0.3), 0 0 0 4px rgba(88, 86, 214, 0.2);
        transition: transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.2s;
      }

      .click-highlight {
        position: absolute;
        width: 30px;
        height: 30px;
        background: rgba(88, 86, 214, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 2147483645;
        transform: translate(-50%, -50%) scale(0);
        animation: click-expand 0.4s ease-out forwards;
      }

      @keyframes click-expand {
        to { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
      }

      body, body * {
        cursor: none !important;
      }
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
    customCursor.style.left = e.pageX + 'px';
    customCursor.style.top = e.pageY + 'px';
  }

  function handleMouseDown(e) {
    customCursor.style.background = '#FF2D55'; // Change to Pink on click
    customCursor.style.animation = 'click-implode 0.2s ease-in-out';
    
    const highlight = document.createElement('div');
    highlight.className = 'click-highlight';
    highlight.style.left = e.pageX + 'px';
    highlight.style.top = e.pageY + 'px';
    document.body.appendChild(highlight);
    setTimeout(() => {
        highlight.remove();
        customCursor.style.animation = '';
    }, 400);
  }

  function handleMouseUp() {
    customCursor.style.background = '#5856D6';
  }

  function setupCursor() {
    document.addEventListener('mousemove', handleMouseMove, true);
    document.addEventListener('mousedown', handleMouseDown, true);
    document.addEventListener('mouseup', handleMouseUp, true);
  }

  function removeCursor() {
    document.removeEventListener('mousemove', handleMouseMove, true);
    document.removeEventListener('mousedown', handleMouseDown, true);
    document.removeEventListener('mouseup', handleMouseUp, true);
    if (customCursor) customCursor.remove();
    if (style) style.remove();
  }

  function stopRecording() {
    if (timerInterval) clearInterval(timerInterval);
    if (cursorRestoreTimeout) clearTimeout(cursorRestoreTimeout);
    removeCursor();
    
    const indicator = document.getElementById('gif-recording-indicator');
    if (indicator) {
        indicator.innerHTML = `
          <div style="width: 12px; height: 12px; border: 2px solid #A1A1A6; border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
          <span>Processing GIF... <span id="gif-progress">0%</span></span>
        `;
    }
    
    chrome.runtime.sendMessage({ action: 'stopGifCapture' });
  }

  // Basic spin animation for processing state
  const spinStyle = document.createElement('style');
  spinStyle.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
  document.head.appendChild(spinStyle);

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'GIF_ENCODING_PROGRESS') {
      const progressEl = document.getElementById('gif-progress');
      if (progressEl) progressEl.textContent = Math.round(msg.progress * 100) + '%';
    } else if (msg.type === 'GIF_ENCODING_COMPLETE') {
      const indicator = document.getElementById('gif-recording-indicator');
      if (indicator) {
        indicator.innerHTML = `<span style="color: #32D74B;">✔</span> <span>Saved to Library</span>`;
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
        cursorRestoreTimeout = setTimeout(removeCursor, 60000);
        setTimeout(() => {
          const stopBtn = document.getElementById('stop-gif-recording');
          if (stopBtn) stopBtn.addEventListener('click', stopRecording);
        }, 100);
        setTimeout(stopRecording, 300000);
      });
    } catch (e) { console.error(e); }
  }

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') stopRecording(); }, { once: true });
  startRecording();
})();