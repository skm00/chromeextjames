// capture-areagif.js
(function() {
  console.log("capture-areagif.js: Modern Touch Cursor Loaded"); 
  let seconds = 0;
  let timerInterval;
  let style;
  let cursorRestoreTimeout;

  // Custom Cursor Element
  const customCursor = document.createElement('div');
  customCursor.id = 'prof-touch-cursor';

  function showIndicator() {
    // --- Updated Recording Indicator Styling for a cleaner look ---
    const recordingIndicator = document.createElement('div');
    recordingIndicator.id = 'gif-recording-indicator';
    recordingIndicator.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.95);
      color: #333;
      padding: 6px 16px;
      border-radius: 30px; /* Pill shape */
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 13px;
      font-weight: 500;
      z-index: 2147483647;
      box-shadow: 0 4px 15px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      gap: 10px;
      border: 1px solid #e0e0e0;
    `;
    recordingIndicator.innerHTML = `
      <span style="width: 10px; height: 10px; background: #FF3B30; border-radius: 50%; animation: breathe 2s infinite ease-in-out;"></span>
      <span>Recording <span id="gif-timer" style="font-variant-numeric: tabular-nums;">0s</span></span>
      <button id="stop-gif-recording" style="margin-left: 5px; background: #F2F2F7; color: #007AFF; border: none; padding: 4px 12px; border-radius: 15px; cursor: pointer; font-size: 11px; font-weight: 600;">STOP</button>
    `;
    
    style = document.createElement('style');
    style.textContent = `
      /* Indicator breathing animation */
      @keyframes breathe { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.9); } }
      
      /* Click Ripple Animation */
      @keyframes touchRipple {
        0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.6; }
        100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
      }
      
      /* THE MAIN CURSOR STYLE */
      #prof-touch-cursor {
        position: absolute;
        width: 22px;
        height: 22px;
        /* Professional Blue, semi-transparent fill */
        background: rgba(0, 122, 255, 0.25); 
        /* Solid border for definition */
        border: 1.5px solid rgba(0, 122, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 2147483646;
        transform: translate(-50%, -50%);
        transition: all 0.15s ease-out;
        box-sizing: border-box;
      }

      /* State when mouse button is held down */
      #prof-touch-cursor.is-down {
        width: 18px;
        height: 18px;
        background: rgba(0, 122, 255, 0.5); /* Darker on press */
        border-color: rgba(0, 122, 255, 0.9);
      }

      /* The expanding ripple element */
      .touch-ripple-effect {
        position: absolute;
        width: 22px;
        height: 22px;
        background: rgba(0, 122, 255, 0.4);
        border-radius: 50%;
        pointer-events: none;
        z-index: 2147483645;
        transform: translate(-50%, -50%);
        animation: touchRipple 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
      }

      /* Hide native cursor */
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
    // Use requestAnimationFrame for smoother tracking in recording
    requestAnimationFrame(() => {
      customCursor.style.left = e.pageX + 'px';
      customCursor.style.top = e.pageY + 'px';
    });
  }

  function handleMouseDown(e) {
    // 1. Visual feedback on the main cursor itself
    customCursor.classList.add('is-down');

    // 2. Create separate ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'touch-ripple-effect';
    ripple.style.left = e.pageX + 'px';
    ripple.style.top = e.pageY + 'px';
    document.body.appendChild(ripple);
    
    // Cleanup ripple element
    setTimeout(() => ripple.remove(), 550);
  }

  function handleMouseUp() {
    customCursor.classList.remove('is-down');
  }

  function setupCursor() {
    // Using capture phase (true) to ensure we catch events before page elements stop propagation
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
        // Update indicator to encoding state
        indicator.style.background = '#fff';
        indicator.innerHTML = `
          <span style="width: 10px; height: 10px; background: #FF9500; border-radius: 50%; animation: breathe 1s infinite;"></span>
          Encoding GIF <span id="gif-progress" style="font-weight:bold; margin-left:5px;">0%</span>...`;
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
        indicator.innerHTML = `
          <span style="color: #34C759; font-size: 16px;">✔</span>
          <span style="font-weight: 600;">GIF Ready!</span>`;
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