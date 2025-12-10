// offscreen.js
let video, canvas, ctx, gif, frameInterval;
let isRecording = false;
let area = { x: 0, y: 0, width: 800, height: 600 };  // Default

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'START_GIF_RECORDING') {
    console.log('offscreen.js: Starting GIF recording...');  // Debug
    area = msg.area;
    startGifCapture(msg.streamId);
  } else if (msg.type === 'STOP_GIF_RECORDING') {
    console.log('offscreen.js: Stopping GIF recording...');  // Debug
    stopGifCapture();
  }
});

async function startGifCapture(streamId) {
  if (isRecording) return;
  isRecording = true;

  // Get tab stream
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
  await video.play();  // Wait for stream to load

  // Set canvas to area size (crop if needed)
  canvas.width = area.width;
  canvas.height = area.height;

  // Init GIF encoder (4 workers for speed, quality 10 = smaller file)
  gif = new GIF({
    workers: 4,
    quality: 10,
    width: area.width,
    height: area.height,
    workerScript: chrome.runtime.getURL('js/gif.worker.js')
  });

  gif.on('finished', (blob) => {
    const blobUrl = URL.createObjectURL(blob);
    chrome.runtime.sendMessage({
      type: 'GIF_FINISHED',
      blobUrl: blobUrl
    });
    // Cleanup stream
    stream.getTracks().forEach(track => track.stop());
  });

  // Capture frames at 10 FPS (100ms delay)
  frameInterval = setInterval(captureFrame, 100);
}

function captureFrame() {
  if (!isRecording || !video.videoWidth) return;
  // Draw cropped area from video to canvas
  ctx.drawImage(video, area.x, area.y, area.width, area.height, 0, 0, area.width, area.height);
  // Add frame to GIF (copy: true for efficiency)
  gif.addFrame(canvas, { copy: true, delay: 100 });
}

function stopGifCapture() {
  if (!isRecording) return;
  isRecording = false;
  if (frameInterval) clearInterval(frameInterval);
  if (gif) gif.render();
}