(function () {
    if (document.getElementById("scrshtAreaOverlay")) return;
    // -- STEP 1: Full-document overlay ------------------------------------------
    const docWidth = Math.max(
        document.documentElement.scrollWidth,
        document.body.scrollWidth
    );
    const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
    );
    const overlay = document.createElement("div");
    overlay.id = "scrshtAreaOverlay";
    overlay.style.position = "absolute"; // <-- absolute to allow scrolling under it
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = docWidth + "px";
    overlay.style.height = docHeight + "px";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    overlay.style.zIndex = 999999;
    overlay.style.cursor = "crosshair";
    document.body.appendChild(overlay);
    let startX, startY, endX, endY;
    let isDragging = false;
    let isResizing = false;
    let resizeDirection = null;
    let hasSelection = false;
    // The selection box
    const selectionBox = document.createElement("div");
    selectionBox.style.position = "absolute";
    selectionBox.style.border = "2px dashed #e6ede8";
    selectionBox.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    selectionBox.id = "scrshtAreaselectionBox";
    overlay.appendChild(selectionBox);
    // A container for the action buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.id = "hiddenbtnscrsht";
    buttonContainer.style.position = "fixed"; // keep buttons pinned to viewport
    buttonContainer.style.zIndex = 9999999;
    buttonContainer.style.display = "none";
    buttonContainer.style.flexDirection = "row";
    buttonContainer.style.alignItems = "center";
    buttonContainer.style.justifyContent = "center";
    buttonContainer.style.gap = "10px";
    document.body.appendChild(buttonContainer);
    // Some basic button styling
    const buttonStyles = `
        background-color: #fff;
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
    // -- Create your buttons (Save / Copy / Edit / Upload / Cancel) -------------
    const uploadBtn = createButton("Upload", "select_upll", "toolbar_res/hor_upload.png");
    const saveBtn = createButton("Save", "select_save", "toolbar_res/hor_save.png");
    const copyBtn = createButton("Copy", "select_copy", "toolbar_res/hor_copy.png");
    const editBtn = createButton("Edit", "select_edit", "toolbar_res/draw_pencil.png");
    const cancelBtn = createButton("Close", "select_cancel", "toolbar_res/hor_close.png");
    buttonContainer.appendChild(uploadBtn);
    buttonContainer.appendChild(saveBtn);
    buttonContainer.appendChild(copyBtn);
    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(cancelBtn);
    // The progress container for uploads, etc.
    const progressContainer = document.createElement("div");
    progressContainer.id = "progressContainer";
    progressContainer.style.cssText = `
        position: fixed;
        width: 300px;
        height: 20px;
        background-color: #f0f0f0;
        border-radius: 5px;
        margin-top: 10px;
        overflow: hidden;
        display: none;
    `;
    const progressBar = document.createElement("div");
    progressBar.id = "progressBar";
    progressBar.style.cssText = `
        width: 0%;
        height: 100%;
        background-color: #4caf50;
        transition: width 0.3s ease;
    `;
    const progressNumber = document.createElement("span");
    progressNumber.id = "progressNumber";
    progressNumber.style.cssText = `
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        font-weight: bold;
        color: #000;
    `;
    progressContainer.appendChild(progressBar);
    progressContainer.appendChild(progressNumber);
    buttonContainer.appendChild(progressContainer);
    // -- MOUSE EVENTS: Create / Resize / Move selection box ---------------------
    let rect0;
    overlay.addEventListener("mousedown", (e) => {
        if (!hasSelection && e.target === overlay) {
            // Start drawing a new selection
            startX = e.pageX; // use pageX/pageY for document-based coords
            startY = e.pageY;
            selectionBox.style.left = `${startX}px`;
            selectionBox.style.top = `${startY}px`;
            selectionBox.style.width = `0px`;
            selectionBox.style.height = `0px`;
            buttonContainer.style.display = "none";
        }
        else if (hasSelection) {
            // If the mouse is on the edges/corners, we might be resizing
            if (overlay.style.cursor.match(/resize/)) {
                isResizing = true;
            } else if (overlay.style.cursor === "move") {
                isDragging = true;
            }
            startX = e.pageX;
            startY = e.pageY;
            rect0 = selectionBox.getBoundingClientRect();
        }
    });
    overlay.addEventListener("mousemove", (e) => {
        if (!hasSelection) {
            // If we are drawing a brand new selection
            endX = e.pageX;
            endY = e.pageY;
            selectionBox.style.left = `${Math.min(startX, endX)}px`;
            selectionBox.style.top = `${Math.min(startY, endY)}px`;
            selectionBox.style.width = `${Math.abs(startX - endX)}px`;
            selectionBox.style.height = `${Math.abs(startY - endY)}px`;
            return;
        }
        // If we have a selection, handle dragging or resizing
        const rect = selectionBox.getBoundingClientRect();
        if (isDragging) {
            overlay.style.cursor = "move";
            const deltaX = e.pageX - startX;
            const deltaY = e.pageY - startY;
            selectionBox.style.left = `${selectionBox.offsetLeft + deltaX}px`;
            selectionBox.style.top = `${selectionBox.offsetTop + deltaY}px`;
            startX = e.pageX;
            startY = e.pageY;
        }
        else if (isResizing) {
            const deltaX = e.pageX - startX;
            const deltaY = e.pageY - startY;
            switch (resizeDirection) {
                case "bottom-right":
                    selectionBox.style.width = `${rect0.width + deltaX}px`;
                    selectionBox.style.height = `${rect0.height + deltaY}px`;
                    break;
                case "bottom-left":
                    selectionBox.style.width = `${rect0.width - deltaX}px`;
                    selectionBox.style.left = `${rect0.left + deltaX}px`;
                    selectionBox.style.height = `${rect0.height + deltaY}px`;
                    break;
                case "top-right":
                    selectionBox.style.width = `${rect0.width + deltaX}px`;
                    selectionBox.style.height = `${rect0.height - deltaY}px`;
                    selectionBox.style.top = `${rect0.top + deltaY}px`;
                    break;
                case "top-left":
                    selectionBox.style.width = `${rect0.width - deltaX}px`;
                    selectionBox.style.height = `${rect0.height - deltaY}px`;
                    selectionBox.style.top = `${rect0.top + deltaY}px`;
                    selectionBox.style.left = `${rect0.left + deltaX}px`;
                    break;
                case "right":
                    selectionBox.style.width = `${rect0.width + deltaX}px`;
                    break;
                case "left":
                    selectionBox.style.width = `${rect0.width - deltaX}px`;
                    selectionBox.style.left = `${rect0.left + deltaX}px`;
                    break;
                case "bottom":
                    selectionBox.style.height = `${rect0.height + deltaY}px`;
                    break;
                case "top":
                    selectionBox.style.height = `${rect0.height - deltaY}px`;
                    selectionBox.style.top = `${rect0.top + deltaY}px`;
                    break;
            }
        }
        else {
            // Change cursor if near edges
            const cornerSize = 10;
            const x1 = rect.left, x2 = rect.right;
            const y1 = rect.top, y2 = rect.bottom;
            const mx = e.clientX, my = e.clientY;
            // Check corners first
            if (near(mx, x2) && near(my, y2)) {
                overlay.style.cursor = "nwse-resize";
                resizeDirection = "bottom-right";
            } else if (near(mx, x1) && near(my, y2)) {
                overlay.style.cursor = "nesw-resize";
                resizeDirection = "bottom-left";
            } else if (near(mx, x2) && near(my, y1)) {
                overlay.style.cursor = "nesw-resize";
                resizeDirection = "top-right";
            } else if (near(mx, x1) && near(my, y1)) {
                overlay.style.cursor = "nwse-resize";
                resizeDirection = "top-left";
            }
            // Edges
            else if (near(mx, x2)) {
                overlay.style.cursor = "ew-resize";
                resizeDirection = "right";
            } else if (near(mx, x1)) {
                overlay.style.cursor = "ew-resize";
                resizeDirection = "left";
            } else if (near(my, y2)) {
                overlay.style.cursor = "ns-resize";
                resizeDirection = "bottom";
            } else if (near(my, y1)) {
                overlay.style.cursor = "ns-resize";
                resizeDirection = "top";
            }
            // Inside => move
            else if (
                mx > x1 && mx < x2 &&
                my > y1 && my < y2
            ) {
                overlay.style.cursor = "move";
            }
            else {
                overlay.style.cursor = "default";
                resizeDirection = null;
            }
        }
    });
    overlay.addEventListener("mouseup", () => {
        isDragging = false;
        isResizing = false;
        if (!hasSelection) {
            hasSelection = true;
            buttonContainer.style.display = "flex";
            positionButtons(); // Make sure buttons appear in a nice spot
        }
    });
    // Helper: check if the mouse is within 'cornerSize' px
    function near(a, b, cornerSize = 10) {
        return Math.abs(a - b) < cornerSize;
    }
    // Cancel / remove overlay
    cancelBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        removeOverlay();
    });
  
    // Save Button: multi-pass capture, then automatically download
    saveBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        hideoverlay();
        doMultiPassCapture("save");
    });
    // Copy Button: multi-pass capture, then copy image to clipboard
    copyBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        hideoverlay();
        doMultiPassCapture("copy");
    });
    // Edit Button: multi-pass capture, then send to your editor
    editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        hideoverlay();
        doMultiPassCapture("edit");
    });
    // Upload Button: multi-pass capture, then upload
    uploadBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        hideoverlay();
        doMultiPassCapture("upload");
    });
    function hideFixedElements() {
        document.querySelectorAll("*").forEach(el => {
            const style = window.getComputedStyle(el);
            if (style.position === "fixed" || style.position === "sticky") {
                el.setAttribute("data-original-visibility", el.style.visibility);
                el.style.visibility = "hidden";
            }
        });
    }
  
    function restoreFixedElements() {
        document.querySelectorAll("*").forEach(el => {
            if (el.hasAttribute("data-original-visibility")) {
                el.style.visibility = el.getAttribute("data-original-visibility");
                el.removeAttribute("data-original-visibility");
            }
        });
    }
  
    // -- The "multi-pass" capture approach -------------------------------------
    function doMultiPassCapture(actionType) {
        hideFixedElements(); // Hide fixed elements before capture
        // Hide UI so it doesn't appear in capture
        overlay.style.backgroundColor = "transparent";
        selectionBox.style.backgroundColor = "transparent";
        selectionBox.style.border = "none";
        buttonContainer.style.display = "none";
        const rect = selectionBox.getBoundingClientRect();
        // Convert viewport-based rect to document-based coordinates
        const absoluteLeft = window.scrollX + rect.left;
        const absoluteTop = window.scrollY + rect.top;
        const width = rect.width;
        const height = rect.height;
        // Remove the overlay to avoid it showing up in screenshots.
        removeOverlay(/*keep DOM = false*/);
        // Ensure UI changes are applied before capturing
        requestAnimationFrame(() => {
            // This does the heavy lifting of:
            // 1) Scrolling the page in increments
            // 2) Capturing each portion
            // 3) Storing them in a large offscreen canvas
            // 4) Returning final dataURL
            multiPassCapture(absoluteLeft, absoluteTop, width, height, function (dataUrl) {
                restoreFixedElements();
                // dataUrl is the complete stitched image
                // your usual logic:
                if (actionType === "save") {
                    downloadDataUrl(dataUrl, "screenshot.png");
                } else if (actionType === "copy") {
                    copyDataUrlToClipboard(dataUrl);
                } else if (actionType === "edit") {
                    // e.g., send to background or open new tab
                    chrome.runtime.sendMessage({ cmd: "imgSrc", imgSrc: dataUrl });
                } else if (actionType === "upload") {
                    uploadImage(dataUrl, { left: absoluteLeft, top: absoluteTop, width, height });
                }
            });
        });
    }
    /**
     * The core function that scrolls the page in small “tiles” to capture the entire
     * chosen rectangle. It stitches them into a single final image via an offscreen canvas.
     *
     * @param {Number} selLeft The selection's left in document coords
     * @param {Number} selTop The selection's top in document coords
     * @param {Number} selWidth The selection width
     * @param {Number} selHeight The selection height
     * @param {Function} cb Callback with final dataURL
     */
    function multiPassCapture(selLeft, selTop, selWidth, selHeight, cb) {
        const dpr = window.devicePixelRatio || 1;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const finalCanvas = document.createElement("canvas");
        finalCanvas.width = selWidth * dpr;
        finalCanvas.height = selHeight * dpr;
        const finalCtx = finalCanvas.getContext("2d");
        const overlap = 10; // Minimal overlap to ensure no gaps
        const scrollStepX = viewportWidth - overlap;
        const scrollStepY = viewportHeight - overlap;
        const tiles = [];
        // Calculate tiles with precise boundaries
        for (let y = 0; y < selHeight; y += scrollStepY) {
            for (let x = 0; x < selWidth; x += scrollStepX) {
                const tileWidth = Math.min(scrollStepX, selWidth - x);
                const tileHeight = Math.min(scrollStepY, selHeight - y);
                tiles.push({
                    scrollX: selLeft + x,
                    scrollY: selTop + y,
                    width: tileWidth,
                    height: tileHeight,
                    finalX: x * dpr,
                    finalY: y * dpr,
                    captureWidth: tileWidth * dpr,
                    captureHeight: tileHeight * dpr
                });
            }
        }
        let index = 0;
        function processNext() {
            if (index >= tiles.length) {
                return cb(finalCanvas.toDataURL("image/png"));
            }
            const tile = tiles[index];
            // Stabilize initial scroll position
            if (index === 0) {
                window.scrollTo(selLeft, selTop); // Ensure starting at the exact position
                setTimeout(() => {
                    captureTile(tile);
                }, 2000); // Longer delay for first tile to ensure page loads
            } else {
                window.scrollTo(tile.scrollX, tile.scrollY);
                setTimeout(() => {
                    captureTile(tile);
                }, 1500); // Increased delay for subsequent tiles
            }
            function captureTile(tile) {
                const currentScrollX = window.scrollX;
                const currentScrollY = window.scrollY;
                const adjustedOffsetX = (tile.scrollX - currentScrollX) * dpr;
                const adjustedOffsetY = (tile.scrollY - currentScrollY) * dpr;
                chrome.runtime.sendMessage(
                    { action: "captureScreenshot" },
                    (response) => {
                        if (response && response.success && response.dataUrl) {
                            const tempImg = new Image();
                            tempImg.onload = () => {
                                finalCtx.drawImage(
                                    tempImg,
                                    adjustedOffsetX,
                                    adjustedOffsetY,
                                    tile.captureWidth,
                                    tile.captureHeight,
                                    tile.finalX,
                                    tile.finalY,
                                    tile.captureWidth,
                                    tile.captureHeight
                                );
                                index++;
                                processNext();
                            };
                            tempImg.src = response.dataUrl;
                        } else {
                            console.error("Capture failed:", response?.error);
                            index++;
                            processNext();
                        }
                    }
                );
            }
        }
        processNext();
    }
    // -- Example helpers: Download, Copy, Upload, etc. --------------------------
    function downloadDataUrl(dataUrl, filename) {
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = filename;
        a.click();
    }
    function copyDataUrlToClipboard(dataUrl) {
        // Convert dataUrl to Blob
        const blob = dataURLToBlob(dataUrl);
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]).then(() => {
            console.log("Copied to clipboard");
        });
    }
    function uploadImage(dataUrl, rect) {
        // Show progress bar
        progressContainer.style.display = "block";
        progressNumber.style.visibility = "visible";
        // Example: resize the image or just upload directly
        // This is just an example of how you might do an XHR or fetch to upload
        const blob = dataURLToBlob(dataUrl);
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
                console.log("Upload success:", xhr.responseText);
                // For example, parse server response (if it gives you a shareable URL)
                // ...
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
    }
    // Convert dataURL -> Blob
    function dataURLToBlob(dataUrl) {
        const [header, base64] = dataUrl.split(",");
        const binary = atob(base64);
        const len = binary.length;
        const buffer = new ArrayBuffer(len);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i);
        }
        const mime = header.match(/:(.*?);/)[1];
        return new Blob([view], { type: mime });
    }
    // -- Utility to remove overlay ---------------------------------------------
    function removeOverlay() {
        if (overlay && overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
        }
        if (buttonContainer && buttonContainer.parentNode) {
            buttonContainer.parentNode.removeChild(buttonContainer);
        }
    }
    // -- Utility to create stylized buttons -------------------------------------
    function createButton(labelText, id, iconPath) {
        const btn = document.createElement("button");
        btn.id = id;
        btn.innerHTML = `<img src="${chrome.runtime.getURL(iconPath)}" />`;
        btn.style.cssText = buttonStyles + "background-color: #fff;";
        btn.addEventListener("mouseover", () => {
            btn.style.cssText = buttonStyles + "background-color: #f5f0f0;" + hoverEffects;
        });
        btn.addEventListener("mouseout", () => {
            btn.style.cssText = buttonStyles + "background-color: #f5f0f0;";
        });
        return btn;
    }
    // auto edit clicks starts here hideoverlay
    function checkAndTrigger() {
        const hiddenButton = document.getElementById("hiddenbtnscrsht");
        if (hiddenButton) {
            const isFlex = getComputedStyle(hiddenButton).display === "flex";
            if (isFlex) {
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
                clearInterval(checkInterval);
            }
        }
    }
    const checkInterval = setInterval(checkAndTrigger, 2000);
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
    function hideoverlay() {
        setTimeout(() => {
            const overlayttt = document.getElementById("scrshtAreaOverlay");
            const hiddenButton = document.getElementById("hiddenbtnscrsht");
            if (window.getComputedStyle(hiddenButton).display === "flex") {
                overlayttt.style.backgroundColor = "transparent";
                overlayttt.style.border = "none";
                overlayttt.style.outline = "none";
            }
        }, 100);
    }
    // -- Position the button container, pinned at top-center of viewport --------
    function positionButtons() {
        const bcWidth = buttonContainer.offsetWidth;
        const left = (window.innerWidth - bcWidth) / 2;
        const top = 10;
        buttonContainer.style.top = `${top}px`;
        buttonContainer.style.left = `${left}px`;
    }
})();