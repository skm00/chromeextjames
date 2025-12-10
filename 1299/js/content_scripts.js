// Check if the content script has already been initialized to avoid duplicate listeners
if (!window.isContentScriptInitialized) {
  window.isContentScriptInitialized = true;

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("Message received:", request);

    if (request.cmd === "getImgSrc") {
      handleGetImgSrc(request.mode);
    }
	
  });
}






function addSaveScreenshotButton() {
    // Find the YouTube player's right controls
    const controls = document.querySelector('.ytp-right-controls');
    if (!controls) {
        console.error('YouTube player controls not found.');
        return;
    }

    // Create the button
    const saveButtonyt = document.createElement('button');
   // saveButtonyt.innerText = 'Save Screenshot';
       saveButtonyt.innerText = '';

    saveButtonyt.style.marginLeft = '10px';
	    saveButtonyt.style.marginBottom = '1px';

    saveButtonyt.style.padding = '5px 5px 0px 0px';
    saveButtonyt.style.backgroundColor = 'transparent';
    saveButtonyt.style.color = '#fff';
    saveButtonyt.style.border = 'none';
    saveButtonyt.style.cursor = 'pointer';
    saveButtonyt.style.fontSize = '14px';
    saveButtonyt.style.fontWeight = 'bold';
    saveButtonyt.style.display = 'inline';
    saveButtonyt.style.alignItems = 'center';
    saveButtonyt.style.justifyContent = 'center';
saveButtonyt.className = 'ytp-button';
// Corrected syntax for vertical alignment and padding
saveButtonyt.style.verticalAlign = 'top'; // Use lowercase 'top'
//saveButtonyt.style.paddingTop = '0px'; // Correct camelCase syntax


    // Add an icon (optional)
    // const icon = document.createElement('span');
    // icon.innerText = '📷 SCRCHT'; 
    // saveButtonyt.prepend(icon);

const icon = document.createElement('img');
icon.src = chrome.runtime.getURL('./toolbar_res/captureecamera.png'); 

icon.alt = 'Screenshot Icon'; // Add alt text for accessibility
icon.style.marginRight = '5px';
icon.style.width = '20px'; // Set the width of the icon
icon.style.height = '20px'; // Set the height of the icon

// Add the icon to the button
saveButtonyt.prepend(icon);


    // Add the button to the controls
    controls.prepend(saveButtonyt);

    // Handle button click
    saveButtonyt.addEventListener('click', (e) => {
        e.stopPropagation();

        // Find the YouTube player element
        const youtubePlayer = document.querySelector('.html5-video-player');
        if (!youtubePlayer) {
            console.error('YouTube player not found.');
            return;
        }

        // Get the bounding rectangle of the YouTube player
        const rect = youtubePlayer.getBoundingClientRect();

        // Request a screenshot of the player
        chrome.runtime.sendMessage(
            { action: "captureScreenshot", rect: rect },
            (response) => {
                if (response.success) {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    // Factor in devicePixelRatio for high-resolution screens
                    const dpr = window.devicePixelRatio || 1;

                    // Set canvas dimensions considering the device pixel ratio
                    canvas.width = Math.round(rect.width * dpr);
                    canvas.height = Math.round(rect.height * dpr);

                    console.log("Canvas Width:", canvas.width);
                    console.log("Canvas Height:", canvas.height);

                    const img = new Image();
                    img.src = response.dataUrl;

                    img.onload = () => {
                        // Calculate the exact portion of the image to draw on the canvas
                        const scaleX = img.width / window.innerWidth;
                        const scaleY = img.height / window.innerHeight;

                        const sourceX = Math.round(rect.left * scaleX);
                        const sourceY = Math.round(rect.top * scaleY);
                        const sourceWidth = Math.round(rect.width * scaleX);
                        const sourceHeight = Math.round(rect.height * scaleY);

                        ctx.drawImage(
                            img,
                            sourceX,
                            sourceY,
                            sourceWidth,
                            sourceHeight,
                            0,
                            0,
                            canvas.width,
                            canvas.height
                        );

                        // Convert the cropped image to a data URL
                        const croppedDataUrl = canvas.toDataURL("image/png");

                        // Download the image
                        const a = document.createElement("a");
                        a.href = croppedDataUrl;
                        a.download = "scrsht-youtube.png";
                        a.click();

                        console.log("YouTube player screenshot saved successfully.");
                    };

                    img.onerror = () => {
                        console.error("Failed to load the screenshot image.");
                    };
                } else {
                    console.error("Screenshot capture failed:", response.error);
                }
            }
        );
    });
}

// Wait for the YouTube player to load
const waitForPlayer = setInterval(() => {
    const player = document.querySelector('.ytp-right-controls');
    if (player) {
        clearInterval(waitForPlayer);
        addSaveScreenshotButton();
    }
}, 500);






 
// Function to handle the "getImgSrc" command
async function handleGetImgSrc(mode) {
  console.log("Processing screenshot request with mode:", mode);

  // Hide scrollbars
  // document.documentElement.style.overflow = "hidden";
  // document.body.style.overflow = "hidden";
  // console.log("Overflow set to hidden:", document.documentElement.style.overflow, document.body.style.overflow);

 

  // Capture the full page or visible part
  await captureFullPage(mode);

  // Restore scrollbars
  // document.documentElement.style.overflow = "auto";
  // document.body.style.overflow = "auto";
  // console.log("Overflow restored to auto:", document.documentElement.style.overflow, document.body.style.overflow);
}

// Function to capture the visible tab
async function captureVisibleTab() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ capture: true }, (response) => {
      resolve(response.dataUrl);
    });
  });
}

// Function to capture the full page, stitching together screenshots if necessary
async function captureFullPage(mode) {
    const isPdf = document.contentType === "application/pdf" || location.href.endsWith(".pdf");

    if (isPdf) {
        console.log("PDF detected. Using visible tab capture.");
        const imgSrc = await captureVisibleTab();
        if (imgSrc) {
            chrome.runtime.sendMessage({ cmd: "imgSrc", imgSrc });
        } else {
            console.error("Failed to capture visible tab for PDF.");
        }
        return;
    }

    let totalHeight = document.documentElement.scrollHeight; // Use let to allow reassignment
    const viewportHeight = window.innerHeight;
    const images = [];
    const capturedScrolls = new Set(); // Track captured scroll positions
    let currentScroll = 0;
    const hiddenElements = [];
    const maxRetries = 3; // Max retries for sites with inconsistent scroll heights
    let retryCount = 0;

    // Hide scrollbars
    const originalOverflow = getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    console.log("Scrollbars hidden for screenshot");

    while (currentScroll < totalHeight) {
        if (capturedScrolls.has(currentScroll)) {
            console.log("Scroll position already captured:", currentScroll);
            break;
        }

        capturedScrolls.add(currentScroll);

        if (mode === "allPage") {
            window.scrollTo(0, currentScroll);
        }

        await new Promise((resolve) => setTimeout(resolve, 500));

        if (currentScroll !== 0) {
            const allElements = document.querySelectorAll("*");
            allElements.forEach((element) => {
                const position = getComputedStyle(element).position;
                if (position === "fixed" || position === "sticky") {
                    element.style.display = "none";
                    hiddenElements.push(element);
                }
            });
        }

        await new Promise((resolve) => setTimeout(resolve, 500));

        const imgSrc = await captureVisibleTab();
        if (imgSrc) {
            images.push(imgSrc);
        }

        // if (mode === "selecto" || mode === "allShow") {
	        if (mode === "selecto" || mode === "allShow" || mode === "capturesave" || mode === "capturecopy") {
		
            break;
        }

        const previousScroll = currentScroll;
        currentScroll += viewportHeight;




        // Detect if the scroll height changed (dynamic content load)
        if (currentScroll >= totalHeight && retryCount < maxRetries) {
            const newTotalHeight = document.body.scrollHeight;
            if (newTotalHeight > totalHeight) {
                totalHeight = newTotalHeight; // Now totalHeight is mutable
                retryCount++;
            }
        }

        // Break if scrolling doesn't progress
        if (previousScroll === currentScroll) {
            console.log("Scroll stuck, breaking the loop.");
            break;
        }
    }

    // Restore hidden elements
    hiddenElements.forEach((element) => {
        element.style.display = "block";
    });

    // Restore scrollbars
    document.body.style.overflow = originalOverflow;
    console.log("Scrollbars restored");

    if (images.length > 1) {
        const combinedImage = await combineBase64Images(images, totalHeight);
        chrome.runtime.sendMessage({ cmd: "imgSrc", imgSrc: combinedImage });
    } else if (images.length === 1) {
        chrome.runtime.sendMessage({ cmd: "imgSrc", imgSrc: images[0] });
    }
}



// Function to combine multiple base64 images into one
function combineBase64Images(base64Images, totalHeight) {
  return new Promise((resolve, reject) => {
    const images = [];
    let maxWidth = 0;

    // Create Image objects for all base64 images
    base64Images.forEach((base64) => {
      const img = new Image();
      img.src = base64;
      images.push(img);
    });

    // Wait for all images to load
    Promise.all(
      images.map((img) => {
        return new Promise((resolve, reject) => {
          img.onload = () => {
            maxWidth = Math.max(maxWidth, img.width);
            resolve();
          };
          img.onerror = () => reject(new Error("Image loading failed"));
        });
      })
    )
      .then(() => {
        // Create a canvas to stitch the images together
        const canvas = document.createElement("canvas");
        canvas.width = maxWidth;
        canvas.height = totalHeight;
        const ctx = canvas.getContext("2d");

        let yOffset = 0;

        // Draw each image onto the canvas
        for (const img of images) {
          ctx.drawImage(img, 0, yOffset);
          yOffset += img.height;
        }

        // Convert the canvas to a base64 image
        const combinedBase64 = canvas.toDataURL();
        resolve(combinedBase64);
      })
      .catch(reject);
  });
}