// offscreen.js
console.log('=== offscreen.js: Script loaded and initialized ===');

let video, canvas, ctx, gif, frameInterval;
let isRecording = false;
let area = { x: 0, y: 0, width: 800, height: 600 };  // Default

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log('=== offscreen.js: Received message ===');
  console.log('Message type:', msg.type);
  console.log('Full message:', msg);
  
  if (msg.type === 'START_GIF_RECORDING') {
    console.log('offscreen.js: Starting GIF recording with streamId:', msg.streamId);
    area = msg.area;
    startGifCapture(msg.streamId)
      .then(() => {
        console.log('offscreen.js: GIF capture started successfully');
        sendResponse({ success: true });
      })
      .catch((error) => {
        console.error('offscreen.js: Failed to start GIF capture:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // Keep channel open for async response
  } else if (msg.type === 'STOP_GIF_RECORDING') {
    console.log('offscreen.js: Stopping GIF recording...');
    stopGifCapture();
    sendResponse({ success: true });
    return true;
  }
});

async function startGifCapture(streamId) {
  if (isRecording) {
    console.log('offscreen.js: Already recording, ignoring new request');
    return;
  }
  
  try {
    isRecording = true;

    // Get tab stream
    console.log('offscreen.js: Getting media stream with ID:', streamId);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        mandatory: {
          chromeMediaSource: 'tab',
          chromeMediaSourceId: streamId
        }
      },
      audio: false  // No audio for GIF
    });

    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    video.srcObject = stream;
    
    // Wait for video to be ready
    await new Promise((resolve) => {
      video.onloadedmetadata = () => {
        video.play();
        resolve();
      };
    });
    
    console.log('offscreen.js: Video stream ready, dimensions:', video.videoWidth, 'x', video.videoHeight);

    // Set canvas to area size (or use video dimensions if area is larger)
    canvas.width = Math.min(area.width, video.videoWidth);
    canvas.height = Math.min(area.height, video.videoHeight);

    // Init GIF encoder (2 workers for better compatibility, quality 10 = smaller file)
    // Note: In offscreen documents, we need to use a relative path for the worker script
    gif = new GIF({
      workers: 2,
      quality: 10,
      width: canvas.width,
      height: canvas.height,
      workerScript: 'js/gif.worker.js'  // Use relative path in offscreen document
    });

    gif.on('finished', (blob) => {
      console.log('offscreen.js: GIF encoding finished, size:', blob.size, 'bytes');
      const blobUrl = URL.createObjectURL(blob);
      chrome.runtime.sendMessage({
        type: 'GIF_FINISHED',
        blobUrl: blobUrl
      });
      // Cleanup stream
      stream.getTracks().forEach(track => track.stop());
      video.srcObject = null;
    });

    gif.on('progress', (progress) => {
      console.log('offscreen.js: GIF encoding progress:', Math.round(progress * 100) + '%');
      // Send progress to service worker to forward to content script
      chrome.runtime.sendMessage({
        type: 'GIF_ENCODING_PROGRESS',
        progress: progress
      }).catch(err => console.log('Could not send progress:', err));
    });

    // Wait a bit for the stream to stabilize
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('offscreen.js: Starting frame capture at 10 FPS');
    // Capture frames at 10 FPS (100ms delay)
    frameInterval = setInterval(captureFrame, 100);
  } catch (error) {
    console.error('offscreen.js: Error starting GIF capture:', error);
    isRecording = false;
    throw error;
  }
}

function captureFrame() {
  if (!isRecording || !video || !video.videoWidth || !gif) {
    return;
  }
  
  try {
    // Draw video frame to canvas (full video, no cropping for simplicity)
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Add frame to GIF (copy: true for efficiency)
    gif.addFrame(canvas, { copy: true, delay: 100 });
  } catch (error) {
    console.error('offscreen.js: Error capturing frame:', error);
  }
}

function stopGifCapture() {
  if (!isRecording) {
    console.log('offscreen.js: Not recording, nothing to stop');
    return;
  }
  
  console.log('offscreen.js: Stopping capture and starting GIF encoding...');
  isRecording = false;
  
  if (frameInterval) {
    clearInterval(frameInterval);
    frameInterval = null;
  }
  
  if (gif) {
    gif.render();
  } else {
    console.error('offscreen.js: No GIF encoder found');
  }
}