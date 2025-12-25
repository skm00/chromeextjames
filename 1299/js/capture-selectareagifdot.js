// capture-areagif.js - Spotlight Highlighter Version
(function() {
  console.log("capture-areagif.js: Script injected and starting full-tab GIF recording!");  // Debug

  let seconds = 0;
  let timerInterval;
  let style;
  let cursorRestoreTimeout;
  let spotlightElement;
  let pointerElement;
  let highlightBoxes = [];
  let isHighlighting = false;
  let highlightStart = null;

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
    
    // Add animations and styles
    style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      @keyframes pointerPulse {
        0%, 100% { 
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        }
        50% { 
          transform: translate(-50%, -50%) scale(1.1);
          opacity: 0.8;
        }
      }
      @keyframes highlightFade {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      .cursor-spotlight {
        position: absolute;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 2147483645;
        background: radial-gradient(circle, 
          rgba(255, 235, 59, 0.15) 0%, 
          rgba(255, 235, 59, 0.08) 40%, 
          transparent 70%);
        box-shadow: 0 0 40px rgba(255, 235, 59, 0.3),
                    inset 0 0 30px rgba(255, 235, 59, 0.1);
        transition: all 0.1s ease-out;
      }
      .cursor-pointer {
        position: absolute;
        width: 16px;
        height: 16px;
        pointer-events: none;
        z-index: 2147483646;
        animation: pointerPulse 1.5s ease-in-out infinite;
      }
      .cursor-pointer::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 12px;
        height: 12px;
        background: #fbbf24;
        border: 2px solid #ffffff;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(251, 191, 36, 0.6),
                    0 2px 4px rgba(0, 0, 0, 0.3);
      }
      .cursor-pointer::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 4px;
        height: 4px;
        background: #ffffff;
        border-radius: 50%;
      }
      .highlight-box {
        position: absolute;
        background: rgba(251, 191, 36, 0.2);
        border: 2px solid #fbbf24;
        pointer-events: none;
        z-index: 2147483644;
        animation: highlightFade 0.3s ease-out;
        box-shadow: 0 0 20px rgba(251, 191, 36, 0.4),
                    inset 0 0 20px rgba(251, 191, 36, 0.1);
      }
      .highlight-box::before {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        border: 1px solid rgba(251, 191, 36, 0.3);
        border-radius: 2px;
      }
      body * {
        cursor: crosshair !important;
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

  // Create cursor spotlight effect
  function createCursorSpotlight() {
    // Create spotlight
    spotlightElement = document.createElement('div');
    spotlightElement.className = 'cursor-spotlight';
    document.body.appendChild(spotlightElement);
    
    // Create pointer
    pointerElement = document.createElement('div');
    pointerElement.className = 'cursor-pointer';
    document.body.appendChild(pointerElement);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('dblclick', handleDoubleClick);
  }

  function handleMouseMove(e) {
    // Update spotlight position
    if (spotlightElement) {
      spotlightElement.style.left = (e.pageX - 60) + 'px';
      spotlightElement.style.top = (e.pageY - 60) + 'px';
    }
    
    // Update pointer position
    if (pointerElement) {
      pointerElement.style.left = (e.pageX) + 'px';
      pointerElement.style.top = (e.pageY) + 'px';
    }

    // Update highlight box while dragging
    if (isHighlighting && highlightStart) {
      const currentBox = highlightBoxes[highlightBoxes.length - 1];
      if (currentBox) {
        const x = Math.min(highlightStart.x, e.pageX);
        const y = Math.min(highlightStart.y, e.pageY);
        const width = Math.abs(e.pageX - highlightStart.x);
        const height = Math.abs(e.pageY - highlightStart.y);
        
        currentBox.style.left = x + 'px';
        currentBox.style.top = y + 'px';
        currentBox.style.width = width + 'px';
        currentBox.style.height = height + 'px';
      }
    }
  }

  function handleMouseDown(e) {
    // Start highlighting with drag
    if (e.button === 0) { // Left click only
      isHighlighting = true;
      highlightStart = { x: e.pageX, y: e.pageY };
      
      const highlightBox = document.createElement('div');
      highlightBox.className = 'highlight-box';
      highlightBox.style.left = e.pageX + 'px';
      highlightBox.style.top = e.pageY + 'px';
      highlightBox.style.width = '0px';
      highlightBox.style.height = '0px';
      document.body.appendChild(highlightBox);
      
      highlightBoxes.push(highlightBox);
    }
  }

  function handleMouseUp(e) {
    if (isHighlighting) {
      isHighlighting = false;
      
      // Remove small accidental highlights (less than 10x10 pixels)
      const currentBox = highlightBoxes[highlightBoxes.length - 1];
      if (currentBox) {
        const width = parseInt(currentBox.style.width);
        const height = parseInt(currentBox.style.height);
        
        if (width < 10 || height < 10) {
          currentBox.remove();
          highlightBoxes.pop();
        }
      }
      
      highlightStart = null;
    }
  }

  function handleDoubleClick(e) {
    // Double-click to clear all highlights
    highlightBoxes.forEach(box => {
      box.style.opacity = '0';
      setTimeout(() => box.remove(), 300);
    });
    highlightBoxes = [];
  }

  // Remove cursor effects
  function removeCursorEffects() {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('dblclick', handleDoubleClick);
    
    // Remove spotlight and pointer
    if (spotlightElement) {
      spotlightElement.remove();
      spotlightElement = null;
    }
    
    if (pointerElement) {
      pointerElement.remove();
      pointerElement = null;
    }
    
    // Remove all highlight boxes
    highlightBoxes.forEach(box => box.remove());
    highlightBoxes = [];

    // Restore default cursor
    if (style && style.textContent.includes('cursor: crosshair')) {
      style.textContent = style.textContent.replace(
        'body * {\n        cursor: crosshair !important;\n      }',
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
        createCursorSpotlight();

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