// capture-areagif.js - Laser Pointer Version
(function() {
  console.log("capture-areagif.js: Script injected and starting full-tab GIF recording!");  // Debug

  let seconds = 0;
  let timerInterval;
  let style;
  let cursorRestoreTimeout;
  let laserDot;
  let laserBeam;
  let particleContainer;
  let particles = [];
  let lastPosition = null;

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
      @keyframes laserPulse {
        0%, 100% { 
          transform: translate(-50%, -50%) scale(1);
          box-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000, 0 0 60px #ff0000;
        }
        50% { 
          transform: translate(-50%, -50%) scale(1.3);
          box-shadow: 0 0 30px #ff0000, 0 0 60px #ff0000, 0 0 90px #ff0000;
        }
      }
      @keyframes particleFade {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(0.3);
        }
      }
      .laser-dot {
        position: absolute;
        width: 18px;
        height: 18px;
        pointer-events: none;
        z-index: 2147483646;
        animation: laserPulse 0.8s ease-in-out infinite;
      }
      .laser-dot::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 14px;
        height: 14px;
        background: radial-gradient(circle, #ff0000 0%, #ff3333 40%, transparent 70%);
        border-radius: 50%;
        box-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000;
      }
      .laser-dot::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 6px;
        height: 6px;
        background: #ffffff;
        border-radius: 50%;
        box-shadow: 0 0 10px #ffffff;
      }
      .laser-beam {
        position: absolute;
        height: 2px;
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(255, 0, 0, 0.8) 20%, 
          rgba(255, 0, 0, 0.9) 50%, 
          rgba(255, 0, 0, 0.8) 80%, 
          transparent 100%);
        pointer-events: none;
        z-index: 2147483645;
        box-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
        opacity: 0;
        transition: opacity 0.1s ease-out;
      }
      .laser-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, #ff6666 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 2147483644;
        animation: particleFade 0.6s ease-out forwards;
      }
      .particle-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2147483644;
      }
      .laser-circle {
        position: absolute;
        width: 40px;
        height: 40px;
        border: 2px solid rgba(255, 0, 0, 0.4);
        border-radius: 50%;
        pointer-events: none;
        z-index: 2147483645;
        transition: all 0.1s ease-out;
      }
      .laser-circle::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -20px;
        width: 15px;
        height: 1px;
        background: rgba(255, 0, 0, 0.6);
      }
      .laser-circle::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -20px;
        width: 15px;
        height: 1px;
        background: rgba(255, 0, 0, 0.6);
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

  // Create laser pointer effect
  function createLaserPointer() {
    // Create particle container
    particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    document.body.appendChild(particleContainer);

    // Create laser beam (initially hidden)
    laserBeam = document.createElement('div');
    laserBeam.className = 'laser-beam';
    document.body.appendChild(laserBeam);
    
    // Create targeting circle
    const laserCircle = document.createElement('div');
    laserCircle.className = 'laser-circle';
    laserCircle.id = 'laser-circle';
    document.body.appendChild(laserCircle);
    
    // Create laser dot
    laserDot = document.createElement('div');
    laserDot.className = 'laser-dot';
    document.body.appendChild(laserDot);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
  }

  function handleMouseMove(e) {
    const currentPos = { x: e.pageX, y: e.pageY };
    
    // Update laser dot position
    if (laserDot) {
      laserDot.style.left = currentPos.x + 'px';
      laserDot.style.top = currentPos.y + 'px';
    }
    
    // Update targeting circle
    const circle = document.getElementById('laser-circle');
    if (circle) {
      circle.style.left = (currentPos.x - 20) + 'px';
      circle.style.top = (currentPos.y - 20) + 'px';
    }

    // Create laser beam effect when moving
    if (lastPosition && laserBeam) {
      const dx = currentPos.x - lastPosition.x;
      const dy = currentPos.y - lastPosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 5) { // Only show beam if moving
        const angle = Math.atan2(dy, dx);
        
        laserBeam.style.width = distance + 'px';
        laserBeam.style.left = lastPosition.x + 'px';
        laserBeam.style.top = lastPosition.y + 'px';
        laserBeam.style.transform = `rotate(${angle}rad)`;
        laserBeam.style.transformOrigin = '0 50%';
        laserBeam.style.opacity = '0.6';
        
        // Fade out beam
        setTimeout(() => {
          if (laserBeam) laserBeam.style.opacity = '0';
        }, 50);
        
        // Create particles along movement
        if (distance > 15) {
          createParticles(currentPos.x, currentPos.y);
        }
      }
    }
    
    lastPosition = currentPos;
  }

  function handleClick(e) {
    // Create burst of particles on click
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const distance = 15 + Math.random() * 15;
      const x = e.pageX + Math.cos(angle) * distance;
      const y = e.pageY + Math.sin(angle) * distance;
      
      setTimeout(() => {
        createParticles(x, y, true);
      }, i * 20);
    }
    
    // Flash effect on circle
    const circle = document.getElementById('laser-circle');
    if (circle) {
      circle.style.borderColor = 'rgba(255, 0, 0, 1)';
      circle.style.borderWidth = '3px';
      setTimeout(() => {
        circle.style.borderColor = 'rgba(255, 0, 0, 0.4)';
        circle.style.borderWidth = '2px';
      }, 150);
    }
  }

  function createParticles(x, y, burst = false) {
    const count = burst ? 3 : 2;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'laser-particle';
      
      const offsetX = (Math.random() - 0.5) * 10;
      const offsetY = (Math.random() - 0.5) * 10;
      
      particle.style.left = (x + offsetX) + 'px';
      particle.style.top = (y + offsetY) + 'px';
      
      particleContainer.appendChild(particle);
      particles.push(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        particle.remove();
        particles = particles.filter(p => p !== particle);
      }, 600);
    }
  }

  // Remove laser effects
  function removeLaserEffects() {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('click', handleClick);
    
    // Remove laser elements
    if (laserDot) {
      laserDot.remove();
      laserDot = null;
    }
    
    if (laserBeam) {
      laserBeam.remove();
      laserBeam = null;
    }
    
    const circle = document.getElementById('laser-circle');
    if (circle) circle.remove();
    
    if (particleContainer) {
      particleContainer.remove();
      particleContainer = null;
    }
    
    // Remove all particles
    particles.forEach(p => p.remove());
    particles = [];

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
    
    // Remove laser effects
    removeLaserEffects();
    
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
        createLaserPointer();

        // Auto-restore cursor after 60 seconds (1 minute)
        cursorRestoreTimeout = setTimeout(() => {
          removeLaserEffects();
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