// capture-areagif.js
(function() {
  console.log("capture-areagif.js: Script injected and starting full-tab GIF recording!");  // Debug

  let seconds = 0;
  let timerInterval;
  let style;

  // Show recording indicator
  function showIndicator() {
    const recordingIndicator = document.createElement('div');
    recordingIndicator.id = 'gif-recording-indicator';
    recordingIndicator.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff0000;
      color: white;
      padding: 12px 20px;
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
      Recording GIF (Full Tab)... <span id="gif-timer">0s</span>
      <button id="stop-gif-recording" style="margin-left: 10px; padding: 4px 12px; background: white; color: black; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">Stop</button>
    `;
    
    // Add pulsing animation
    style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
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

  // Stop recording
  function stopRecording() {
    console.log("capture-areagif.js: Stopping GIF recording after", seconds, "seconds.");  // Debug
    if (timerInterval) clearInterval(timerInterval);
    const indicator = document.getElementById('gif-recording-indicator');
    if (indicator) indicator.remove();
    if (style) style.remove();
    chrome.runtime.sendMessage({ action: 'stopGifCapture' });
  }

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
      });
      
      showIndicator();

      // Stop button
      document.getElementById('stop-gif-recording').addEventListener('click', stopRecording);

      // Auto-stop after 10 seconds
      setTimeout(stopRecording, 10000);
    } catch (error) {
      console.error('Error starting GIF recording:', error);
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
