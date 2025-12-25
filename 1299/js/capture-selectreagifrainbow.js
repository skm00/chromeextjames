// capture-areagif.js - Ripple Effect Version
(function() {
  console.log("capture-areagif.js: Script injected and starting full-tab GIF recording!");  // Debug

  let seconds = 0;
  let timerInterval;
  let style;
  let cursorTrail = [];
  let cursorRestoreTimeout;
  let clickRipples = [];

  // Show recording indicator
  function showIndicator() {
    const recordingIndicator = document.createElement('div');
    recordingIndicator.id = 'gif-recording-indicator';
    recordingIndicator.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #BDC1C6;
      color: white;
      padding: 4px 20px;
      border-radius: 25px;
      font-family: Arial, sans-serif;
      font-size: 14px;
      font-weight: bold;
      z-index: 2147483647;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      gap: 10px;
    `;
    recordingIndicator.innerHTML = `
      <span style="width: 10px; height: 10px; background: white; border-radius: 50%; animation: pulse 1s infinite;"></span>
      Rec. <span id="gif-timer">0s</span>
      <button id="stop-gif-recording" style="margin-left: 10px; padding: 4px 12px; background: #BDC1C6; color: black; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">X</button>
    `;
    
    // Add animations
    style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      @keyframes rippleExpand {
        0% {
          width: 0px;
          height: 0px;
          opacity: 1;
        }
        100% {
          width: 80px;
          height: 80px;
          opacity: 0;
        }
      }
      @keyframes cursorGlow {
        0%, 100% { 
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.4);
          transform: scale(1);
        }
        50% { 
          box-shadow: 0 0 25px rgba(59, 130, 246, 1), 0 0 50px rgba(59, 130, 246, 0.6);
          transform: scale(1.2);
        }
      }
      .cursor-highlight {
        position: absolute;
        width: 24px;
        height: 24px;
        border: 3px solid #3b82f6;
        border-radius: 50%;
        pointer-events: none;
        z-index: 2147483646;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
        animation: cursorGlow 1.5s ease-in-out infinite;
        box-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
      }
      .cursor-highlight::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 4px;
        height: 4px;
        background: #3b82f6;
        border-radius: 50%;
      }
      .click-ripple {
        position: absolute;
        border: 3px solid #f59e0b;
        border-radius: 50%;
        pointer-events: none;
        z-index: 2147483645;
        animation: rippleExpand 0.8s ease-out;
      }
      body * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(recordingIndicator);

    // Timer
    timerInterval = setInterval(() => {
      seconds++;
      const timerEl = document.getElementById('gif-timer');
      if (timerEl) timerEl.textContent = seconds + 's';
    }, 1000);
  }

  // Create cursor highlight
  let cursorHighlight;
  function createCursorHighlight() {
    cursorHighlight = document.createElement('div');
    cursorHighlight.className = 'cursor-highlight';
    document.body.appendChild(cursorHighlight);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
  }

  function handleMouseMove(e) {
    if (cursorHighlight) {
      cursorHighlight.style.left = (e.pageX - 12) + 'px';
      cursorHighlight.style.top = (e.pageY - 12) + 'px';
    }
  }

  function handleClick(e) {
    // Create ripple effect on click
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = (e.pageX - 40) + 'px';
    ripple.style.top = (e.pageY - 40) + 'px';
    document.body.appendChild(ripple);
    
    clickRipples.push(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
      clickRipples = clickRipples.filter(r => r !== ripple);
    }, 800);
  }

  // Remove cursor effects
  function removeCursorEffects() {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('click', handleClick);
    
    // Remove cursor highlight
    if (cursorHighlight) {
      cursorHighlight.remove();
      cursorHighlight = null;
    }
    
    // Remove all ripples
    clickRipples.forEach(ripple => ripple.remove());
    clickRipples = [];

    // Restore default cursor
    if (style && style.textContent.includes('cursor: none')) {
      style.textContent = style.textContent.replace(
        'body * {\n        cursor: none !important;\n      }',
        ''
      );
    }
  }

  // Stop recording
  function stopRecording() {
    console.log("capture-areagif.js: Stopping GIF recording after", seconds, "seconds.");  // Debug
    if (timerInterval) clearInterval(timerInterval);
    if (cursorRestoreTimeout) clearTimeout(cursorRestoreTimeout);
    
    // Remove cursor effects
    removeCursorEffects();
    
    // Update indicator to show encoding progress
    const indicator = document.getElementById('gif-recording-indicator');
    if (indicator) {
      indicator.style.background = '#ff9800'; // Orange for encoding
      indicator.innerHTML = `
        <span style="width: 10px; height: 10px; background: white; border-radius: 50%; animation: pulse 1s infinite;"></span>
        Encoding GIF... <span id="gif-progress">0%</span>
      `;
    }
    
    chrome.runtime.sendMessage({ action: 'stopGifCapture' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('capture-areagif.js: Error sending stop message:', chrome.runtime.lastError.message);
      } else {
        console.log('capture-areagif.js: Stop message sent, response:', response);
      }
    });
  }
  
  // Listen for encoding progress updates
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'GIF_ENCODING_PROGRESS') {
      const progressEl = document.getElementById('gif-progress');
      if (progressEl) {
        progressEl.textContent = Math.round(msg.progress * 100) + '%';
      }
    } else if (msg.type === 'GIF_ENCODING_COMPLETE') {
      const indicator = document.getElementById('gif-recording-indicator');
      if (indicator) {
        indicator.style.background = '#4CAF50'; // Green for complete
        indicator.innerHTML = `
          <span style="width: 10px; height: 10px; background: white; border-radius: 50%;"></span>
          GIF Saved! Closing...
        `;
        setTimeout(() => {
          indicator.remove();
          if (style) style.remove();
        }, 2000);
      }
    }
  });

  // Start full-tab recording
  async function startRecording() {
    try {
      // Full viewport area (tabCapture will capture full tab)
      const fullArea = {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
      console.log("capture-areagif.js: Sending startGifCapture with full area:", fullArea);  // Debug
      
      chrome.runtime.sendMessage({
        action: 'startGifCapture',
        area: fullArea
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('capture-areagif.js: Error sending start message:', chrome.runtime.lastError.message);
          alert('Failed to start GIF recording: ' + chrome.runtime.lastError.message);
          return;
        }
        
        console.log('capture-areagif.js: Start message sent, response:', response);
        
        if (response && !response.success) {
          console.error('capture-areagif.js: Server rejected start request:', response.error);
          alert('Failed to start GIF recording: ' + response.error);
          return;
        }
        
        showIndicator();
        createCursorHighlight();

        // Auto-restore cursor after 60 seconds (1 minute)
        cursorRestoreTimeout = setTimeout(() => {
          removeCursorEffects();
          console.log("capture-areagif.js: Cursor restored to default after 60 seconds");
        }, 60000);

        // Stop button
        setTimeout(() => {
          const stopBtn = document.getElementById('stop-gif-recording');
          if (stopBtn) {
            stopBtn.addEventListener('click', stopRecording);
          }
        }, 100);

        // Auto-stop after 30 seconds
        setTimeout(stopRecording, 300000);
      });
    } catch (error) {
      console.error('capture-areagif.js: Exception starting GIF recording:', error);
      alert('Failed to start GIF recording: ' + error.message);
    }
  }

  // ESC to cancel (optional)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      stopRecording();
    }
  }, { once: true });

  // Initialize: Directly start (no selection)
  startRecording();
})();