document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const uploadTrigger = document.getElementById('uploadTrigger');
    const processBtn = document.getElementById('processBtn');
    const statusEl = document.getElementById('status');
    const previewContainer = document.getElementById('preview-container');
    const hiddenImg = document.getElementById('gif-hidden');
    const progressBar = document.getElementById('progressBar');
    const progressWrapper = document.getElementById('progress-wrapper');
        const downlodbtn = document.getElementById('downlodbtn');

	
	
	
    let uploadedFile = null;
    let superGifObj = null;

    // 1. Handle File Upload (Click Trigger)
    uploadTrigger.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'image/gif') {
            uploadedFile = file;
            statusEl.textContent = `Loaded: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
            processBtn.disabled = false;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                hiddenImg.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // 2. Process Button Click
    processBtn.addEventListener('click', () => {
        if (!uploadedFile) return;
        
        processBtn.disabled = true;
        statusEl.textContent = "Parsing GIF frames...";
        previewContainer.innerHTML = '';
        progressWrapper.style.display = 'block';
        progressBar.value = 0;

        // Initialize libgif decoder
        // "auto_play: false" prevents it from playing automatically in the hidden tag
        superGifObj = new SuperGif({ gif: hiddenImg, auto_play: false });
        
        superGifObj.load(() => {
            // Wait a brief moment to ensure UI updates before heavy lifting
            setTimeout(startCompression, 50);
        });
    });

    // 3. Main Compression Logic
    function startCompression() {
        const scale = parseFloat(document.getElementById('scale').value);
        const fpsSetting = parseInt(document.getElementById('fps').value); // Always an integer now
        
        const originalWidth = superGifObj.get_canvas().width;
        const originalHeight = superGifObj.get_canvas().height;
        const newWidth = Math.floor(originalWidth * scale);
        const newHeight = Math.floor(originalHeight * scale);

        statusEl.textContent = `Resizing to ${newWidth}x${newHeight}...`;

        // Configure Encoder
        const gif = new GIF({
            workers: 2,
            quality: 10,
            width: newWidth,
            height: newHeight,
            workerScript: '../libs/gif/gif.worker.js' // Ensure this path is correct
        });

        const frameCount = superGifObj.get_length();
        const frameCanvas = document.createElement('canvas');
        const ctx = frameCanvas.getContext('2d', { willReadFrequently: true });
        
        frameCanvas.width = newWidth;
        frameCanvas.height = newHeight;

        // We calculate delay based on user selection
        // 1000ms / 10fps = 100ms delay per frame
        const delay = 1000 / fpsSetting;

        // Loop through all frames
        for (let i = 0; i < frameCount; i++) {
            // Move decoder to specific frame
            superGifObj.move_to(i);
            
            // Get the current frame data from libgif
            const currentFrameCanvas = superGifObj.get_canvas();
            
            // Clear and Draw resized frame
            ctx.clearRect(0, 0, newWidth, newHeight);
            ctx.drawImage(currentFrameCanvas, 0, 0, newWidth, newHeight);

            // Add frame to encoder
            gif.addFrame(ctx, {copy: true, delay: delay});
        }

        // Update Status
        statusEl.textContent = "Encoding GIF... (This might take a moment)";

        // Progress Bar Event
        gif.on('progress', (p) => {
            // p is 0.0 to 1.0
            progressBar.value = Math.round(p * 100);
            statusEl.textContent = `Encoding: ${Math.round(p * 100)}%`;
        });

        // Finished Event
        gif.on('finished', (blob) => {
            const finalUrl = URL.createObjectURL(blob);
            const sizeMB = (blob.size / 1024 / 1024).toFixed(2);
            
            statusEl.textContent = `Done! New Size: ${sizeMB} MB`;
            progressWrapper.style.display = 'none';
            
            // Create Result Elements
            const img = document.createElement('img');
            img.src = finalUrl;
            
            const downloadBtn = document.createElement('a');
            downloadBtn.href = finalUrl;
            downloadBtn.download = `compressed_${uploadedFile.name}`;
            downloadBtn.textContent = "Download Compressed GIF";
            downloadBtn.className = "cssbuttons-io-button";
            downloadBtn.style.display = "block";
            downloadBtn.style.marginTop = "10px";

            previewContainer.appendChild(img);
            // previewContainer.appendChild(downloadBtn);
			            downlodbtn.appendChild(downloadBtn);

			
            
            processBtn.disabled = false;
        });

        // Start the encoding process
        gif.render();
    }
});