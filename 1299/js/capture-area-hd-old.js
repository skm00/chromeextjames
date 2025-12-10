(function () {
    if (document.getElementById("scrshtAreaOverlay")) return;
    const overlay = document.createElement("div");
    overlay.id = "scrshtAreaOverlay"
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    overlay.style.zIndex = 999999;
    overlay.style.cursor = "crosshair";
    document.body.appendChild(overlay);
    let startX, startY, endX, endY, isDragging = false, isResizing = false, resizeDirection = null;
    let hasSelection = false;
    const selectionBox = document.createElement("div");
    let selectionBoxRect;
    selectionBox.style.position = "absolute";
    selectionBox.style.border = "2px dashed #e6ede8";
    selectionBox.id = "scrshtAreaselectionBox"
    selectionBox.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    overlay.appendChild(selectionBox);
    const buttonContainer = document.createElement("div");
    buttonContainer.style.position = "absolute";
    buttonContainer.style.zIndex = 9999999;
    buttonContainer.style.display = "none";
    buttonContainer.style.display = "none";
    buttonContainer.setAttribute("id", "hiddenbtnscrsht");
    buttonContainer.style.flexDirection = "row";
    buttonContainer.style.alignItems = "center";
    buttonContainer.style.justifyContent = "center";
    buttonContainer.style.gap = "10px";
    overlay.appendChild(buttonContainer);
    //document.body.appendChild(buttonContainer);
    const buttonStyles = `
    background-color: #fff; /* Default color */
    color: white;
    border: none;
    padding: 5px 6px;
    margin: 0px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-transform: uppercase;
`;
    const hoverEffects = `
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
`;
    // Save Button
    const upllButton = document.createElement("button");
    upllButton.innerHTML = `<img id="select_upll" src="${chrome.runtime.getURL('toolbar_res/hor_upload.png')}" />`;
    upllButton.style.cssText = buttonStyles + "background-color: #fff;";
    upllButton.addEventListener("mouseover", () => upllButton.style.cssText += hoverEffects);
    upllButton.addEventListener("mouseout", () => upllButton.style.cssText = buttonStyles + "background-color: #f5f0f0;");
    buttonContainer.appendChild(upllButton);
    const progressContainer = document.createElement("div");
    progressContainer.id = "progressContainer";
    progressContainer.style.cssText = `
    position: fixed;
    width: 100%;
    height: 20px;
    background-color: #f0f0f0;
    border-radius: 5px;
    margin-top: 10px;
    overflow: hidden;
    display: none; /* Hidden initially */
`;
    // Create progress bar
    const progressBar = document.createElement("div");
    progressBar.id = "progressBar";
    progressBar.style.cssText = `
    width: 0%;
    height: 100%;
    background-color: #4caf50;
    transition: width 0.3s ease;
`;
    // Create progress number
    const progressNumber = document.createElement("span");
    progressNumber.id = "progressNumber";
    progressNumber.style.cssText = `
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    font-weight: bold;
    color: #000;
`;
    // Append progress bar and number to the container
    progressContainer.appendChild(progressBar);
    progressContainer.appendChild(progressNumber);
    // Append progress container to the button container or any other parent
    buttonContainer.appendChild(progressContainer);
    const saveButton = document.createElement("button");
    saveButton.innerHTML = `<img id="select_save" src="${chrome.runtime.getURL('toolbar_res/hor_save.png')}" />`;
    saveButton.style.cssText = buttonStyles + "background-color: #fff;";
    saveButton.addEventListener("mouseover", () => saveButton.style.cssText += hoverEffects);
    saveButton.addEventListener("mouseout", () => saveButton.style.cssText = buttonStyles + "background-color: #f5f0f0;");
    buttonContainer.appendChild(saveButton);
    // Copy Button
    const copyButton = document.createElement("button");
    copyButton.innerHTML = `<img id="select_copy" src="${chrome.runtime.getURL('toolbar_res/hor_copy.png')}" />`;
    copyButton.style.cssText = buttonStyles + "background-color: #fff;";
    copyButton.addEventListener("mouseover", () => copyButton.style.cssText += hoverEffects);
    copyButton.addEventListener("mouseout", () => copyButton.style.cssText = buttonStyles + "background-color: #f5f0f0;");
    buttonContainer.appendChild(copyButton);
    // Edit Button
    const editButton = document.createElement("button");
    editButton.innerHTML = `<img id="select_edit" src="${chrome.runtime.getURL('toolbar_res/draw_pencil.png')}" />`;
    editButton.style.cssText = buttonStyles + "background-color: #fff; color: black;";
    editButton.addEventListener("mouseover", () => editButton.style.cssText += hoverEffects);
    editButton.addEventListener("mouseout", () => editButton.style.cssText = buttonStyles + "background-color: #FFDA04; color: black;");
    buttonContainer.appendChild(editButton);
    // Cancel Button
    const cancelButton = document.createElement("button");
    cancelButton.innerHTML = `<img id="select_cancel" src="${chrome.runtime.getURL('toolbar_res/hor_close.png')}" />`;
    cancelButton.style.cssText = buttonStyles + "background-color: #fff;";
    cancelButton.addEventListener("mouseover", () => cancelButton.style.cssText += hoverEffects);
    cancelButton.addEventListener("mouseout", () => cancelButton.style.cssText = buttonStyles + "background-color: #f5f0f0;");
    buttonContainer.appendChild(cancelButton);
    overlay.addEventListener("mousedown", (e) => {
        if (!hasSelection && e.target === overlay) {
            startX = e.clientX;
            startY = e.clientY;
            selectionBox.style.left = `${startX}px`;
            selectionBox.style.top = `${startY}px`;
            selectionBox.style.width = `0px`;
            selectionBox.style.height = `0px`;
            buttonContainer.style.display = "none"; // Hide buttons during dragging
        }
      
        if (hasSelection) {
            if (overlay.style.cursor === "nwse-resize" || overlay.style.cursor === "nesw-resize" ||
                overlay.style.cursor === "ew-resize" || overlay.style.cursor === "ns-resize") {
                isResizing = true;
                startX = e.clientX;
                startY = e.clientY;
                selectionBoxRect = selectionBox.getBoundingClientRect();
            } else if (overlay.style.cursor === "move") {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
            }
        }
    });
    overlay.addEventListener("mousemove", (e) => {
        if (isDragging) {
            overlay.style.cursor = "move"; // Set cursor to move during dragging
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            selectionBox.style.left = `${selectionBox.offsetLeft + deltaX}px`;
            selectionBox.style.top = `${selectionBox.offsetTop + deltaY}px`;
            startX = e.clientX;
            startY = e.clientY;
        } else if (isResizing) {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            switch (resizeDirection) {
                case "bottom-right":
                    selectionBox.style.width = `${selectionBoxRect.width + deltaX}px`;
                    selectionBox.style.height = `${selectionBoxRect.height + deltaY}px`;
                    break;
                case "bottom-left":
                    selectionBox.style.width = `${selectionBoxRect.width - deltaX}px`;
                    selectionBox.style.height = `${selectionBoxRect.height + deltaY}px`;
                    selectionBox.style.left = `${selectionBoxRect.left + deltaX}px`;
                    break;
                case "top-right":
                    selectionBox.style.width = `${selectionBoxRect.width + deltaX}px`;
                    selectionBox.style.height = `${selectionBoxRect.height - deltaY}px`;
                    selectionBox.style.top = `${selectionBoxRect.top + deltaY}px`;
                    break;
                case "top-left":
                    selectionBox.style.width = `${selectionBoxRect.width - deltaX}px`;
                    selectionBox.style.height = `${selectionBoxRect.height - deltaY}px`;
                    selectionBox.style.top = `${selectionBoxRect.top + deltaY}px`;
                    selectionBox.style.left = `${selectionBoxRect.left + deltaX}px`;
                    break;
                case "right":
                    selectionBox.style.width = `${selectionBoxRect.width + deltaX}px`;
                    break;
                case "left":
                    selectionBox.style.width = `${selectionBoxRect.width - deltaX}px`;
                    selectionBox.style.left = `${selectionBoxRect.left + deltaX}px`;
                    break;
                case "bottom":
                    selectionBox.style.height = `${selectionBoxRect.height + deltaY}px`;
                    break;
                case "top":
                    selectionBox.style.height = `${selectionBoxRect.height - deltaY}px`;
                    selectionBox.style.top = `${selectionBoxRect.top + deltaY}px`;
                    break;
            }
        } else if (!hasSelection) {
            // Create selection box if not done already
            endX = e.clientX;
            endY = e.clientY;
            selectionBox.style.left = `${Math.min(startX, endX)}px`;
            selectionBox.style.top = `${Math.min(startY, endY)}px`;
            selectionBox.style.width = `${Math.abs(startX - endX)}px`;
            selectionBox.style.height = `${Math.abs(startY - endY)}px`;
        }
        if (!hasSelection) return;
        const rect = selectionBox.getBoundingClientRect();
        if (e.clientX >= rect.right - 10 && e.clientX <= rect.right + 10 &&
            e.clientY >= rect.bottom - 10 && e.clientY <= rect.bottom + 10) {
            overlay.style.cursor = "nwse-resize";
            resizeDirection = "bottom-right";
        } else if (e.clientX >= rect.left - 10 && e.clientX <= rect.left + 10 &&
            e.clientY >= rect.bottom - 10 && e.clientY <= rect.bottom + 10) {
            overlay.style.cursor = "nesw-resize";
            resizeDirection = "bottom-left";
        } else if (e.clientX >= rect.right - 10 && e.clientX <= rect.right + 10 &&
            e.clientY >= rect.top - 10 && e.clientY <= rect.top + 10) {
            overlay.style.cursor = "nesw-resize";
            resizeDirection = "top-right";
        } else if (e.clientX >= rect.left - 10 && e.clientX <= rect.left + 10 &&
            e.clientY >= rect.top - 10 && e.clientY <= rect.top + 10) {
            overlay.style.cursor = "nwse-resize";
            resizeDirection = "top-left";
        } else if (e.clientX >= rect.right - 10 && e.clientX <= rect.right + 10) {
            overlay.style.cursor = "ew-resize";
            resizeDirection = "right";
        } else if (e.clientX >= rect.left - 10 && e.clientX <= rect.left + 10) {
            overlay.style.cursor = "ew-resize";
            resizeDirection = "left";
        } else if (e.clientY >= rect.bottom - 10 && e.clientY <= rect.bottom + 10) {
            overlay.style.cursor = "ns-resize";
            resizeDirection = "bottom";
        } else if (e.clientY >= rect.top - 10 && e.clientY <= rect.top + 10) {
            overlay.style.cursor = "ns-resize";
            resizeDirection = "top";
        } else if (e.clientX > rect.left && e.clientX < rect.right &&
            e.clientY > rect.top && e.clientY < rect.bottom) {
            overlay.style.cursor = "move";
        } else {
            overlay.style.cursor = "default";
        }
    });
    overlay.addEventListener("mousedown", (e) => {
    });
    overlay.addEventListener("mouseup", () => {
        isDragging = false;
        isResizing = false;
        if (!hasSelection) {
            hasSelection = true;
            buttonContainer.style.display = "flex"; // Show buttons after selection
            positionButtons();
        }
    });
    function checkAndTrigger() {
        const hiddenButton = document.getElementById("hiddenbtnscrsht");
        if (hiddenButton) {
            const isFlex = getComputedStyle(hiddenButton).display === "flex";
            if (isFlex) {
              // console.log("Button with ID 'hiddenbtnscrsht' is now visible. Triggering actions...");
                hideoverlay();
                hiddenButton.style.display = "none";
            const overlaytttyr = document.getElementById("scrshtAreaOverlay");
                overlaytttyr.style.backgroundColor = "transparent";
       const overlaytttyrtytt = document.getElementById("scrshtAreaselectionBox");
                overlaytttyrtytt.style.backgroundColor = "transparent";
    overlaytttyrtytt.style.border = "none";
    overlaytttyrtytt.style.outline = "none";
    overlaytttyr.style.border = "none";
    overlaytttyr.style.outline = "none";
                triggerSelectEditClick();
              
                // Stop checking once triggered
                clearInterval(checkInterval);
            } else {
             // console.log("Button with ID 'hiddenbtnscrsht' exists but is still not visible.");
            }
        } else {
        // console.log("Button with ID 'hiddenbtnscrsht' does not exist.");
        }
    }
    // Check visibility every second until it's visible
    const checkInterval = setInterval(checkAndTrigger, 20000);
    saveButton.addEventListener("click", (e) => {
    hideoverlay();
        e.stopPropagation();
        const rect = selectionBox.getBoundingClientRect();
        document.body.removeChild(overlay);
        requestAnimationFrame(() => {
            chrome.runtime.sendMessage(
                { action: "captureScreenshot", rect: rect },
                (response) => {
                    if (response.success) {
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");
                        // Factor in devicePixelRatio for high-resolution screens
                        const dpr = window.devicePixelRatio || 1;
                        const hdScale = 2; // For super HD, upscale by 2x
                        // Set canvas dimensions considering the device pixel ratio and HD scale
                        canvas.width = Math.round(rect.width * dpr * hdScale);
                        canvas.height = Math.round(rect.height * dpr * hdScale);
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
                            a.download = "screenshot.png";
                            a.click();
                            console.log("Screenshot saved successfully.");
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
    });
       copyButton.addEventListener("click", (e) => {
     
        hideoverlay();
        e.stopPropagation();
        const rect = selectionBox.getBoundingClientRect();
        document.body.removeChild(overlay);
        const dpr = window.devicePixelRatio || 1; // Add this
        const hdScale = 2; // For super HD, upscale by 2x
        chrome.runtime.sendMessage(
            { action: "captureScreenshot", rect: rect },
            (response) => {
                if (response.success) {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    // Ensure canvas dimensions match the selection rectangle, scaled by dpr and HD scale
                    canvas.width = Math.round(rect.width * dpr * hdScale);
                    canvas.height = Math.round(rect.height * dpr * hdScale);
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
                        // Convert the canvas content to a blob and copy it to the clipboard
                        canvas.toBlob((blob) => {
                            if (blob) {
                                const item = new ClipboardItem({ "image/png": blob });
                                navigator.clipboard.write([item]).then(
                                    () => {
                                        console.log("Image copied to clipboard successfully!");
                                    },
                                    (err) => {
                                        console.error("Failed to copy image to clipboard:", err);
                                    }
                                );
                            } else {
                                console.error("Failed to create a Blob from the canvas.");
                            }
                        });
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
    editButton.addEventListener("click", (e) => {
    hideoverlay();
        e.stopPropagation();
        const rect = selectionBox.getBoundingClientRect();
        document.body.removeChild(overlay);
        const dpr = window.devicePixelRatio || 1; // Add this
        const hdScale = 2; // For super HD, upscale by 2x
        chrome.runtime.sendMessage(
            { action: "captureScreenshot", rect: rect },
            (response) => {
                if (response.success) {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    // Ensure canvas dimensions match the selection rectangle, scaled by dpr and HD scale
                    canvas.width = Math.round(rect.width * dpr * hdScale);
                    canvas.height = Math.round(rect.height * dpr * hdScale);
                  // console.log("Canvas Width:", canvas.width);
                  // console.log("Canvas Height:", canvas.height);
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
                        const dataUrl = canvas.toDataURL("image/png");
                      // console.log("Captured Image Data URL:", dataUrl);
                        chrome.runtime.sendMessage({ cmd: "imgSrc", imgSrc: dataUrl });
                    };
                    img.onerror = () => {
                     // console.error("Failed to load the screenshot image.");
                    };
                } else {
                   // console.error("Screenshot capture failed:", response.error);
                }
            }
        );
    
    });
        cancelButton.addEventListener("click", (e) => {
            e.stopPropagation();
            document.body.removeChild(overlay);
        });
    function hideoverlay() {
        setTimeout(() => {
            const overlayttt = document.getElementById("scrshtAreaOverlay");
            const hiddenButton = document.getElementById("hiddenbtnscrsht");
          // if (overlayttt && hiddenButton && window.getComputedStyle(hiddenButton).display === "flex") {
            if (window.getComputedStyle(hiddenButton).display === "flex") {
    
                overlayttt.style.backgroundColor = "transparent";
    overlayttt.style.border = "none";
    overlayttt.style.outline = "none";
            }
        }, 100);
    }
    function uploadImage(dataUrl, rect) {
        let progressContainer = document.getElementById("progressContainer");
        let progressBar = document.getElementById("progressBar");
        let progressNumber = document.getElementById("progressNumber");
        // Dynamically create progress elements if not found
        if (!progressContainer) {
            progressContainer = document.createElement("div");
            progressContainer.id = "progressContainer";
            progressContainer.style.cssText = `
                position: fixed;
                width: 100%;
                height: 20px;
                background-color: #f0f0f0;
                border-radius: 5px;
                margin-top: 10px;
                overflow: hidden;
                display: none;
            `;
            progressBar = document.createElement("div");
            progressBar.id = "progressBar";
            progressBar.style.cssText = `
                width: 0%;
                height: 100%;
                background-color: #4caf50;
                transition: width 0.3s ease;
            `;
            progressNumber = document.createElement("span");
            progressNumber.id = "progressNumber";
            progressNumber.style.cssText = `
                position: fixed;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                font-size: 12px;
                font-weight: bold;
                color: #000;
            `;
            progressContainer.appendChild(progressBar);
            progressContainer.appendChild(progressNumber);
            document.body.appendChild(progressContainer);
        }
        // Ensure the progress bar and number are visible
        progressContainer.style.display = "block";
        progressNumber.style.visibility = "visible";
        // Resize the image and convert to Blob
        resizeImage(dataUrl, 1.0, (resizedDataUrl) => { // Changed scale to 1.0 to avoid unnecessary resizing
            const blob = dataURLToBlob(resizedDataUrl);
            const formData = new FormData();
            formData.append("image", blob, "scrsht_screenshot.png");
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://scrsht.com/touch/chrome_extn/screenshot/upload_s.php", true);
            xhr.upload.onprogress = function (event) {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    progressBar.style.width = percentComplete + "%";
                    progressNumber.textContent = `${percentComplete.toFixed(1)}%`;
                    progressNumber.style.color = percentComplete > 50 ? "#333" : "#fff";
                }
            };
    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                const url = new DOMParser()
                    .parseFromString(xhr.responseText, "text/html")
                    .querySelector("share").innerHTML;
                console.log(url); // Verify the URL is correct
                // Open the URL in a new tab
                window.open(url, "_blank");
            } catch (err) {
                console.error("Error parsing server response:", err);
            }
        } else {
            console.error("Upload failed:", xhr.statusText);
        }
        setTimeout(() => {
            progressContainer.style.display = "none";
            progressBar.style.width = "0%";
            progressNumber.textContent = "0.0%";
            progressNumber.style.visibility = "hidden";
        }, 1000);
    };
            xhr.onerror = function () {
                console.error("Upload Error");
                progressContainer.style.display = "none";
                progressBar.style.width = "0%";
                progressNumber.textContent = "0.0%";
                progressNumber.style.visibility = "hidden";
            };
            xhr.send(formData);
        });
    }
    function dataURLToBlob(dataURL) {
        const [header, base64Data] = dataURL.split(',');
        const binaryData = atob(base64Data);
        const buffer = new ArrayBuffer(binaryData.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < binaryData.length; i++) {
            view[i] = binaryData.charCodeAt(i);
        }
        const mimeType = header.split(':')[1].split(';')[0];
        return new Blob([buffer], { type: mimeType });
    }
    function resizeImage(dataUrl, scale, callback) {
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
            // Create a canvas to resize the image
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            // Set canvas dimensions based on the scale
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            // Draw the resized image on the canvas
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            // Convert the canvas to a data URL (removed quality param for PNG as it's lossless)
            const resizedDataUrl = canvas.toDataURL("image/png");
            callback(resizedDataUrl);
        };
        img.onerror = (error) => {
            console.error("Error resizing image:", error);
        };
    }
    document.getElementById("select_upll").addEventListener("click", () => {
    hideoverlay();
        const rect = selectionBox.getBoundingClientRect(); // Assuming selectionBox exists
        document.body.removeChild(overlay); // Remove the overlay if it exists
        const dpr = window.devicePixelRatio || 1; // Add this
        const hdScale = 2; // For super HD, upscale by 2x
        chrome.runtime.sendMessage(
            { action: "captureScreenshot", rect: rect },
            (response) => {
                if (response.success) {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    // Ensure canvas dimensions match the selection rectangle, scaled by dpr and HD scale
                    canvas.width = Math.round(rect.width * dpr * hdScale);
                    canvas.height = Math.round(rect.height * dpr * hdScale);
                    const img = new Image();
                    img.src = response.dataUrl;
                    img.onload = () => {
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
                        const dataUrl = canvas.toDataURL("image/png");
                        uploadImage(dataUrl, rect); // Upload the captured image
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
    const upllButtonyyy = document.getElementById("select_upll");
    // Default button click (download PNG)
    upllButtonyyy.addEventListener("click", () => {
    
       var buttonIdyytytrr = upllButtonyyy.id;
         sendButtonClickData(buttonIdyytytrr);
     
     });
    function sendButtonClickData(buttonId) {
      // console.log(`Sending data for button: ${buttonId}`); // Check if this is logged
    // alert(`Sending data for button: ${buttonId}`); // Check if this is logged
        fetch('https://scrsht.com/track-button-click.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                buttonId: buttonId,
             timestamp: new Date().toISOString(),
            }),
        })
        .then((response) => {
           // console.log('Network response:', response); // Log the raw response
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
          // console.log('Button click tracked successfully:', data); // Log success
        })
        .catch((error) => {
          // console.error('Error sending button click data:', error); // Log error
        });
    }
    // youtube button starts here
    // Wait for the YouTube player to load
    // Function to add the "Save Screenshot" button to the YouTube player
    // youtube ends here
        const select_saveyy = document.getElementById("select_save");
      select_saveyy.addEventListener("click", function () {
       var buttonIdyytyt = select_saveyy.id;
         sendButtonClickData(buttonIdyytyt);
        });
       const select_copyyy = document.getElementById("select_copy");
      select_copyyy.addEventListener("click", function () {
       var buttonIdyytyt = select_copyyy.id;
         sendButtonClickData(buttonIdyytyt);
        });
       const select_edityy = document.getElementById("select_edit");
      select_edityy.addEventListener("click", function () {
       var buttonIdyytyt = select_edityy.id;
         sendButtonClickData(buttonIdyytyt);
        });
       const select_cancelyyy = document.getElementById("select_cancel");
      select_cancelyyy.addEventListener("click", function () {
       var buttonIdyytyt = select_cancelyyy.id;
         sendButtonClickData(buttonIdyytyt);
        });
    function triggerSelectEditClick() {
            const overlaytttyr = document.getElementById("scrshtAreaOverlay");
                overlaytttyr.style.backgroundColor = "transparent";
            const overlaytttyrtytt = document.getElementById("scrshtAreaselectionBox");
                overlaytttyrtytt.style.backgroundColor = "transparent";
        setTimeout(() => {
            const selectEditButton = document.getElementById("select_edit");
            if (selectEditButton) {
                selectEditButton.click(); // Trigger the click
            } else {
               console.error("Element with id 'select_edit' not found!");
            }
        }, 150); // Delay of 100 milliseconds
    }
        function positionButtons() {
            const buttonContainerWidth = buttonContainer.offsetWidth;
            // Calculate the center position
            const left = (window.innerWidth - buttonContainerWidth) / 2;
            const top = 10; // 10px from the top
            // Position the button container at the calculated position
            buttonContainer.style.top = `${top}px`;
            buttonContainer.style.left = `${left}px`;
        }
    })();