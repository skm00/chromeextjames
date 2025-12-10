let imageEditor;

function downloadImage(format = "png") {
    const a = document.createElement("a");
    const Zuyy11 = new Date().toLocaleTimeString().replaceAll(":", "_").replaceAll(" ", "_");
    const finalFilename = `scrsht.com_${Zuyy11}.${format}`;
    let mimeType;

    // Set MIME type based on the format
    switch (format) {
        case "jpeg":
            mimeType = "image/jpeg";
            break;
        case "webp":
            mimeType = "image/webp";
            break;
        default:
            mimeType = "image/png"; // Default to PNG
    }

    // Generate the image data URL in the specified format
    const imageDataUrl = imageEditor.toDataURL(mimeType);
    if (!imageDataUrl) {
        console.error("Failed to generate image data URL.");
        return;
    }

    a.href = imageDataUrl;
    a.download = finalFilename;

    // Trigger the download
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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

function copyImage() {
    const clipboardItem = new ClipboardItem({ 'image/png': dataURLToBlob(imageEditor.toDataURL()) });
    navigator.clipboard.write([clipboardItem]).then(() => {
        document.querySelector("#copyBtn").innerHTML = "Copied";
        setTimeout(() => {
            document.querySelector("#copyBtn").innerHTML = "<i class=\"fas fa-copy\"></i>";
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy image: ', err);
    });
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;

    // Create a new Image element to load the Base64 image
    const image = new Image();
    image.onload = () => {
        // Retrieve the actual dimensions of the image
        const imageWidth = image.naturalWidth;
        const imageHeight = image.naturalHeight;

        //   console.log("Image dimensions:", { width: imageWidth, height: imageHeight });

        // Convert dimensions to points (1 pt = 0.75 pixels at 96 DPI)
        const pdfWidth = imageWidth * 0.75;
        const pdfHeight = imageHeight * 0.75;

        console.log("PDF dimensions (points):", { width: pdfWidth, height: pdfHeight });

        // Initialize the PDF with custom dimensions
        const pdf = new jsPDF({
            orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
            unit: "pt",
            format: [pdfWidth, pdfHeight],
        });

        // Add the image to the PDF
        pdf.addImage(imageEditor.toDataURL(), "PNG", 0, 0, pdfWidth, pdfHeight);
        var Zuyy11 = new Date().toLocaleTimeString().replaceAll(":", "_").replaceAll(" ", "_");
        var finalfilenammeyy = "scrsht.com_" + Zuyy11 + ".pdf";
        // Save the generated PDF
        pdf.save(finalfilenammeyy);
    };

    image.onerror = (err) => {
        console.error("Error loading image for PDF generation.", err);
    };

    // Assign the Base64 image source
    image.src = imageEditor.toDataURL();
}


function sendButtonClickData(buttonId) {
    //  console.log(`Sending data for button: ${buttonId}`); // Check if this is logged
    //    alert(`Sending data for button: ${buttonId}`); // Check if this is logged

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
            console.log('Network response:', response); // Log the raw response
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log('Button click tracked successfully:', data); // Log success
        })
        .catch((error) => {
            console.error('Error sending button click data:', error); // Log error
        });
}




function downloadPDF_withlinks() {
    // Create an Image from the canvas
    const image = new Image();
    image.src = imageEditor.toDataURL("image/jpeg", 0.8); // Compressed JPEG

    image.onload = () => {
        // Wrap the image in a temporary container for html2pdf compatibility
        const container = document.createElement("div");
        container.style.display = "inline-block"; // Ensure proper layout
        container.style.width = `${image.width}px`;
        container.style.height = `${image.height}px`;

        // Append the image to the container
        container.appendChild(image);

        // Add clickable links (if needed) into the container
        const links = document.querySelectorAll("a");
        links.forEach((link) => {
            const rect = link.getBoundingClientRect();

            // Create a transparent anchor element to overlay on the PDF
            const overlayLink = document.createElement("a");
            overlayLink.href = link.href;
            overlayLink.style.position = "absolute";
            overlayLink.style.left = `${rect.left}px`;
            overlayLink.style.top = `${rect.top}px`;
            overlayLink.style.width = `${rect.width}px`;
            overlayLink.style.height = `${rect.height}px`;
            overlayLink.style.opacity = "0"; // Make it invisible
            overlayLink.style.pointerEvents = "none"; // Ensure it doesn’t interfere with the canvas
            container.appendChild(overlayLink);
        });

        // Configure html2pdf options
        const options = {
            margin: 10, // Margins in mm
            filename: `scrsht_${new Date().toISOString().replace(/:/g, "_")}.pdf`, // Unique filename
            image: { type: "jpeg", quality: 0.8 }, // Use JPEG for smaller file size
            html2canvas: { scale: 2, useCORS: true }, // High scale for better quality
            // jsPDF: { unit: "mm", format: "a3", orientation: "portrait" }, // PDF settings
            jsPDF: { unit: "mm", format: "a3", orientation: "landscape" }, // PDF settings

        };

        // Generate the PDF
        html2pdf().set(options).from(container).save();

        // Cleanup: Remove the temporary container after the PDF is generated
        container.remove();
    };

    image.onerror = (err) => {
        console.error("Error loading image for PDF generation.", err);
    };
}







const annotations = [];
function uploadImage() {
    const progressContainer = document.getElementById("progressContainer");
    const progressBar = document.getElementById("progressBar");
    const progressNumber = document.getElementById("progressNumber");

    // Ensure the progress bar and number are visible
    progressContainer.style.display = "block";
    progressNumber.style.visibility = "visible";

    // Get the image as a data URL and resize it
    const dataUrl = imageEditor.toDataURL(); // adjust quality below
    resizeImage(dataUrl, 0.99, (resizedDataUrl) => {
        // Convert the resized image to Blob
        let blob = dataURLToBlob(resizedDataUrl);
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
                const url = new DOMParser()
                    .parseFromString(xhr.responseText, "text/html")
                    .querySelector("share").innerHTML;
                const scrshtId = url.split("/")[url.split("/").length - 1];

                fetch(`https://scrsht.com/api/updateScreenshot/?${scrshtId}`, {
                    method: "POST",
                    body: JSON.stringify({ "markers": annotations }),
                }).then(() => {
                    chrome.tabs.create({ url: url });
                });
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

// Function to resize the image
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

        // Convert the canvas to a data URL
        const resizedDataUrl = canvas.toDataURL("image/png", 0.6); // Adjust quality if needed
        callback(resizedDataUrl);
    };

    img.onerror = (error) => {
        console.error("Error resizing image:", error);
    };
}



function getImageDimensions(imageData) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            resolve({
                width: img.naturalWidth,
                height: img.naturalHeight
            });
        };

        img.onerror = (err) => {
            reject('Failed to load image: ' + err);
        };

        img.src = imageData;
    });
}

window.onload = function () {
    //向background发消息获取参数
    chrome.runtime.sendMessage({ cmd: "getParams" }, function (response) {
        let base64Data = response.params.imgSrc;

        let id = (new URLSearchParams(location.search)).get("edit");

        let db;
        const dbRequest = indexedDB.open("Screenshots", 3);

        dbRequest.onupgradeneeded = (e) => {
            db = e.target.result;
            if (!db.objectStoreNames.contains("screenshots")) {
                db.createObjectStore("screenshots", { keyPath: "id" });
            }
        }

        dbRequest.onsuccess = (e) => {
            db = e.target.result;

            if (!id) {
                const transaction = db.transaction("screenshots", "readwrite");
                const store = transaction.objectStore("screenshots");
                id = (new Date()).getTime();
                store.put({ id: id, data: base64Data });
                loadImageEditor();
            } else {
                const transaction = db.transaction("screenshots", "readonly");
                const store = transaction.objectStore("screenshots");
                const getRequest = store.get(parseInt(id));
                
                getRequest.onsuccess = () => {
                    if (getRequest.result) {
                        base64Data = getRequest.result.data;
                        annotations.push(...(getRequest.result.annotations || []));
                        loadImageEditor();
                    }
                }
            }
        }

        const container = document.getElementById('tui-image-editor-container');
        //  const container = document.getElementById('content');

        function loadImageEditor() {
            getImageDimensions(base64Data)
                .then(dimensions => {


                    // console.log('Last used color:', lastUsedColor);
                    imageEditor = new tui.ImageEditor(container, {
                        includeUI: {
                            loadImage: {
                                path: base64Data,
                                name: 'Screenshot'
                            },
                            theme: {
                                'common.bi': '', // Remove default logo
                                'common.backgroundColor': '#fff', // Change background color
                                'common.border': '1px solid #ddd',
                                'controlPoint.backgroundColor': '#FF0000', // 🔴 Change control point color (Red)
                                'controlPoint.borderColor': '#000000' // ⚫ Border color of control points (Black)
                            },

                            //   menu: ['crop', 'draw', 'shape', 'icon', 'text', 'mask', 'filter'], // disable if u want all 
                            initMenu: 'draw',

                            uiSize: {
                                width: "80%",
                                height: `${window.innerHeight * 0.9 + 30}px`
                            },
                            menuBarPosition: 'bottom'
                        },
                        cssMaxWidth: parseInt(window.innerWidth * 0.75),
                        cssMaxHeight: parseInt(dimensions.height + window.innerHeight * 2),
                    });

                    setTimeout(() => {
                        //addDrawLineMenu(); 
                    }, 5000);


                    window.addEventListener('resize', () => {
                        imageEditor.ui.resizeEditor();
                    });



                    setTimeout(() => {
                        const editorWrap = document.querySelector(".tui-image-editor-wrap");
                        if (editorWrap) {
                            editorWrap.style.height = "calc(100vh - 145px)";
                            editorWrap.style.overflowY = "scroll"; // Ensure scrolling is enabled
                        }
                    }, 300); // Waits for 3 seconds
                });

            setInterval(() => {
                const imgData = imageEditor.toDataURL();
                const transaction = db.transaction("screenshots", "readwrite");
                const store = transaction.objectStore("screenshots");
                store.put({ id: id, data: imgData, annotations: annotations });
            }, 1000);

            setTimeout(restoreAnnotations, 1000);
        }




        document.getElementById("uploadBtn2").addEventListener("click", uploadImage);


        document.getElementById("uploadBtn").addEventListener("click", uploadImage);
        const saveBtn = document.getElementById("saveBtn");
        const downloadJpeg = document.getElementById("downloadJpeg");
        const downloadWebp = document.getElementById("downloadWebp");

        // Default button click (download PNG)
        saveBtn.addEventListener("click", () => {

            var buttonIdyytyt = saveBtn.id;
            sendButtonClickData(buttonIdyytyt);

            downloadImage("png");
        });

        downloadJpeg.addEventListener("click", () => {


            var buttonIdyytyt = downloadJpeg.id;
            sendButtonClickData(buttonIdyytyt);



            downloadImage("jpeg");
        });


        downloadWebp.addEventListener("click", () => {


            var buttonIdyytyt = downloadWebp.id;
            sendButtonClickData(buttonIdyytyt);

            downloadImage("webp");
        });

        //document.getElementById("saveBtn").addEventListener("click", downloadImage);
        document.getElementById("pdfBtn").addEventListener("click", downloadPDF);



        const pdfBtnyyy = document.getElementById("pdfBtn");

        pdfBtnyyy.addEventListener("click", function () {

            var buttonIdyytyt = pdfBtnyyy.id;
            sendButtonClickData(buttonIdyytyt);


        });



        document.getElementById("pdflinksBtn").addEventListener("click", downloadPDF_withlinks);



        const pdflinksBtnyy = document.getElementById("pdflinksBtn");

        pdflinksBtnyy.addEventListener("click", function () {

            var buttonIdyytyt = pdflinksBtnyy.id;
            sendButtonClickData(buttonIdyytyt);


        });






        document.getElementById("copyBtn").addEventListener("click", copyImage);


        const copyBtnyyy = document.getElementById("copyBtn");

        copyBtnyyy.addEventListener("click", function () {

            var buttonIdyytyt = copyBtnyyy.id;
            sendButtonClickData(buttonIdyytyt);


        });






    });

    const annotateBtn = document.getElementById("annotateBtn");
    const annotationDashboard = document.getElementById("annotationDashboard")
    let imageEditorContainer;
    let isAnnotationMode = false;
    let annotationCount = 0;
    let isMarkerEventListenerAdded = false;
    let editorMenuItems;

    const markerStyles = {
        position: "absolute",
        width: "24px",
        height: "24px",
        lineHeight: "24px",
        textAlign: "center",
        fontSize: "14px",
        borderRadius: "50%",
        background: "red",
        color: "white",
        fontWeight: "bold",
        cursor: "grab",
    };

    const inputStyles = {
        width: "97%",
        padding: "8px 5px",
        marginTop: "5px",
        fontSize: "medium",
        border: "1px solid #ccc",
        borderRadius: "13px",
        fontSize: "14px",
    };

    annotateBtn.addEventListener("click", (e) => {
        if (!isAnnotationMode) {
            deactivateEditorMenu();
        }
        isAnnotationMode = !isAnnotationMode;

        annotateBtn.style.background = isAnnotationMode ? "#007bff" : "#f0f0f0";

        if (!isMarkerEventListenerAdded) {
            isMarkerEventListenerAdded = true;
            imageEditorContainer = document.querySelector(".tui-image-editor");
            imageEditorContainer.addEventListener("click", addAnnotationMarker);

            editorMenuItems = document.querySelectorAll(".tui-image-editor-menu li");
            editorMenuItems.forEach(item => {
                item.addEventListener("click", () => { if (isAnnotationMode) { annotateBtn.click(); } });
            });
        }
    });

    // Function to generate a random 12-character ID
    function generateRandomId(length) {
        return (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).substring(0, length);
    }

    function deactivateEditorMenu() {
        editorMenuItems = document.querySelectorAll(".tui-image-editor-menu li");
        editorMenuItems.forEach(item => {
            if (Array.from(item.classList).includes("active")) {
                item.click();
            }
        });
    }

    let draggedMarker = null;
    let offsetX = 0, offsetY = 0;

    // Function to start dragging
    function startDrag(event) {
        draggedMarker = event.target;
        offsetX = event.clientX - draggedMarker.offsetLeft;
        offsetY = event.clientY - draggedMarker.offsetTop;

        // Set cursor to grabbing
        draggedMarker.style.cursor = "grabbing";

        // Listen for mouse movement and release
        document.addEventListener("mousemove", dragMarker);
        document.addEventListener("mouseup", stopDrag);
    }

    // Function to drag the marker
    function dragMarker(event) {
        if (!draggedMarker) return;

        // Get bounding box of the image editor
        const rect = imageEditorContainer.getBoundingClientRect();

        // Calculate new position within bounds
        let newX = event.clientX - offsetX;
        let newY = event.clientY - offsetY;

        // Restrict marker within editor boundaries
        newX = Math.max(0, Math.min(rect.width - draggedMarker.offsetWidth, newX));
        newY = Math.max(0, Math.min(rect.height - draggedMarker.offsetHeight, newY));

        // Update marker position
        draggedMarker.style.left = `${newX}px`;
        draggedMarker.style.top = `${newY}px`;
    }

    // Function to stop dragging
    function stopDrag() {
        if (draggedMarker) {
            draggedMarker.style.cursor = "grab";

            // Extract the marker ID from the class like "marker-abc123def456"
            const markerClass = Array.from(draggedMarker.classList).find(c => c.startsWith("marker-"));
            const markerId = markerClass.split("marker-")[1];

            // Find the annotation in the array
            const annotation = annotations.find(a => a.id === markerId);

            if (annotation) {
                // Get the updated bounding box of the canvas
                const markerRect = draggedMarker.getBoundingClientRect();
                const imageRect = imageEditorContainer.getBoundingClientRect();

                // Calculate marker position relative to the image
                const markerX = markerRect.left - imageRect.left;
                const markerY = markerRect.top - imageRect.top;

                // Calculate accurate xPercentage and yPercentage
                const xPercentage = markerX / imageRect.width;
                const yPercentage = markerY / imageRect.height;

                annotation.xPercentage = xPercentage;
                annotation.yPercentage = yPercentage;
            }

            setTimeout(() => {
                // Reset drag state
                draggedMarker = null;
            }, 100);
        }

        // Remove event listeners
        document.removeEventListener("mousemove", dragMarker);
        document.removeEventListener("mouseup", stopDrag);
    }

    function addAnnotationMarker(event) {
        if (!isAnnotationMode || draggedMarker) return; // Only add markers in annotation mode

        // Get bounding box of the image editor
        const rect = imageEditorContainer.getBoundingClientRect();

        // Calculate relative position within the editor
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Generate a random ID
        const markerId = generateRandomId(12);
        annotationCount++;

        // Create the marker
        const marker = document.createElement("div");
        marker.innerText = annotationCount;
        marker.classList.add("annotation-marker", `marker-${markerId}`);

        // Apply styles from the markerStyles object
        Object.assign(marker.style, markerStyles, {
            left: `${x - 12}px`, // Centering marker
            top: `${y - 12}px`,
        });

        // Attach drag event
        marker.addEventListener("mousedown", startDrag);

        // Append marker to image editor container
        imageEditorContainer.appendChild(marker);

        // Add annotation data
        annotations.push({
            id: markerId,
            msg: "",
            xPercentage: x / rect.width,
            yPercentage: y / rect.height,
        });

        // Update dashboard
        updateAnnotationDashboard();
    }

    // Function to update the dashboard
    function updateAnnotationDashboard() {
        const annotation = annotations[annotations.length - 1];
        const annotationItem = document.createElement("div");
        annotationItem.style.marginBottom = "10px";

        // Label
        const label = document.createElement("label");
        label.innerText = `#${annotations.length}: `;
        label.style.fontWeight = "bold";

        // Input field
        const input = document.createElement("input");
        Object.assign(input.style, inputStyles);

        // Update annotation message on input change
        input.addEventListener("input", () => {
            annotation.msg = input.value;
        });

        annotationItem.appendChild(label);
        annotationItem.appendChild(input);
        annotationDashboard.appendChild(annotationItem);
    }

    function restoreAnnotations() {
        annotations.forEach(annotation => {
            const marker = document.createElement("div");
            marker.innerText = annotations.indexOf(annotation) + 1;
            marker.classList.add("annotation-marker", `marker-${annotation.id}`);

            // Apply styles and position
            imageEditorContainer = document.querySelector(".tui-image-editor");
            Object.assign(marker.style, markerStyles, {
                left: `${annotation.xPercentage * imageEditorContainer.clientWidth - 12}px`,
                top: `${annotation.yPercentage * imageEditorContainer.clientHeight - 12}px`,
            });

            // Reattach drag event
            marker.addEventListener("mousedown", startDrag);

            // Append marker to editor
            imageEditorContainer.appendChild(marker);
        });

        // Rebuild the annotation dashboard
        annotationCount = annotations.length;
        rebuildAnnotationDashboard();
    }

    // Function to rebuild the annotation dashboard
    function rebuildAnnotationDashboard() {
       // annotationDashboard.innerHTML = ""; // Clear existing dashboard

        annotations.forEach((annotation, index) => {
            const annotationItem = document.createElement("div");
            annotationItem.style.marginBottom = "10px";

            // Label
            const label = document.createElement("label");
            label.innerText = `#${index + 1}: `;
            label.style.fontWeight = "bold";

            // Input field
            const input = document.createElement("input");
            Object.assign(input.style, inputStyles);
            input.value = annotation.msg; // Restore message

            // Update annotation message on input change
            input.addEventListener("input", () => {
                annotation.msg = input.value;
            });

            annotationItem.appendChild(label);
            annotationItem.appendChild(input);
            annotationDashboard.appendChild(annotationItem);
        });
    }
}












document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOM fully loaded and parsed');

    // Function to initialize the color picker
    const initializeColorPicker = () => {
        const colorPickerButtons = document.querySelectorAll('.tui-colorpicker-palette-button');
        const colorHexInput = document.querySelector('.tui-colorpicker-palette-hex');
        const colorPreview = document.querySelector('.tui-colorpicker-palette-preview');
        const colorPickerValue = document.querySelector('.color-picker-value');

        if (
            colorPickerButtons.length === 0 ||
            !colorHexInput ||
            !colorPreview ||
            !colorPickerValue
        ) {
            console.log('Color picker elements not found yet...');
            return;
        }

        //   console.log('Color picker buttons found:', colorPickerButtons.length);

        // Retrieve the last used color from localStorage
        const lastUsedColor = localStorage.getItem('lastUsedColor') || '#000000';
        //   console.log('Last used color:', lastUsedColor);

        // Highlight the last used color and update UI elements
        setTimeout(() => {
            colorPickerButtons.forEach((button) => {
                if (button.value === lastUsedColor) {
                    button.classList.add('tui-colorpicker-selected');
                } else {
                    button.classList.remove('tui-colorpicker-selected');
                }
            });

            // Update the input field, preview box, and color-picker-value
            colorHexInput.value = lastUsedColor;
            colorPreview.style.backgroundColor = lastUsedColor;
            colorPreview.style.color = lastUsedColor;
            colorPickerValue.style.backgroundColor = lastUsedColor;

            // Apply the last used color
            applyColor(lastUsedColor);
        }, 1000); // Delay of 1 second

        // Add event listeners to the buttons
        colorPickerButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const selectedColor = button.getAttribute('value');
                console.log('Selected color:', selectedColor);

                if (selectedColor) {
                    // Save the selected color to localStorage
                    localStorage.setItem('lastUsedColor', selectedColor);
                    console.log('Saved color to localStorage:', selectedColor);

                    // Apply the selected color
                    applyColor(selectedColor);

                    // Update UI: Highlight the selected button and update other elements
                    colorPickerButtons.forEach((btn) =>
                        btn.classList.remove('tui-colorpicker-selected')
                    );
                    button.classList.add('tui-colorpicker-selected');

                    // Update the input field, preview box, and color-picker-value
                    colorHexInput.value = selectedColor;
                    colorPreview.style.backgroundColor = selectedColor;
                    colorPreview.style.color = selectedColor;
                    colorPickerValue.style.backgroundColor = selectedColor;
                }
            });
        });

        // Stop checking since buttons are initialized
        clearInterval(intervalId);
    };

    // Function to apply color to the image editor
    const applyColor = (color) => {
        setTimeout(() => {
            if (window.imageEditor) {
                console.log('Applying color to imageEditor:', color);
                window.imageEditor.setBrush({
                    color: color,
                });
            } else {
                //      console.warn('imageEditor is not defined yet.');
            }
        }, 1000); // Delay to ensure editor is ready
    };

    // Use setInterval to check for the presence of color picker elements
    const intervalId = setInterval(() => {
        //  console.log('Checking for color picker elements...');
        initializeColorPicker();
    }, 500); // Check every 500ms



    const adjustHeight = () => {
        const container = document.getElementById('tui-image-editor-container');

        if (container) {
            // Get the inner height of the element
            const containerHeight = container.offsetHeight;
            //  console.log(`Container height before adjustment: ${containerHeight}px`);

            // Set the new height
            const newHeight = containerHeight - 16;
            container.style.height = `${newHeight}px`;
            //  console.log(`Updated height: ${newHeight}px`);
        } else {
            //   console.error('Element with ID "tui-image-editor-container" not found.');
        }
    };

    // Delay the adjustment by 2 seconds
    setTimeout(() => {
        // console.log('Adjusting height after 2 seconds...');
        adjustHeight();
    }, 2000);






    const emailgmailyyy = document.getElementById("emailgmail");

    emailgmailyyy.addEventListener("click", function () {

        var buttonIdyytyt = emailgmailyyy.id;
        sendButtonClickData(buttonIdyytyt);


    });


    const whatsappButtonyy = document.getElementById("whatsappButton");

    whatsappButtonyy.addEventListener("click", function () {

        var buttonIdyytyt = whatsappButtonyy.id;
        sendButtonClickData(buttonIdyytyt);


    });


    const chatgptButtonrrr = document.getElementById("chatgptButton");

    chatgptButtonrrr.addEventListener("click", function () {

        var buttonIdyytyt = chatgptButtonrrr.id;
        sendButtonClickData(buttonIdyytyt);

    });





    document.getElementById("emailgmail")?.addEventListener("click", () => {
        const dataUrl = imageEditor.toDataURL(); // Get the image data

        // Copy the image to clipboard
        fetch(dataUrl)
            .then(res => res.blob())
            .then(blob => {
                const clipboardItem = new ClipboardItem({ "image/png": blob });
                navigator.clipboard.write([clipboardItem]).then(() => {
                    // Show alert
                    const alertDiv = document.createElement("div");
                    alertDiv.textContent = "Image copied to clipboard. Paste it into Gmail by pressing Ctrl+V or Cmd+V.";
                    alertDiv.style.position = "fixed";
                    alertDiv.style.top = "20px";
                    alertDiv.style.left = "50%";
                    alertDiv.style.transform = "translateX(-50%)";
                    alertDiv.style.backgroundColor = "#4CAF50";
                    alertDiv.style.color = "white";
                    alertDiv.style.padding = "10px 20px";
                    alertDiv.style.borderRadius = "5px";
                    alertDiv.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                    alertDiv.style.zIndex = "1000";

                    document.body.appendChild(alertDiv);

                    // Remove alert after 2 seconds
                    setTimeout(() => {
                        alertDiv.remove();

                        // Open Gmail compose window
                        const subject = encodeURIComponent("Screenshot Attached");
                        const body = encodeURIComponent("Please paste the copied image here by pressing Ctrl+V or Cmd+V.");
                        window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`, "_blank");
                    }, 3000);
                }).catch(err => {
                    console.error("Failed to copy image to clipboard:", err);
                });
            })
            .catch(error => console.error("Error processing the image:", error));
    });





    document.getElementById('whatsappButton')?.addEventListener('click', () => {
        const dataUrl = imageEditor.toDataURL(); // Get the image data

        // Convert dataUrl to Blob
        fetch(dataUrl)
            .then(res => res.blob())
            .then(blob => {
                const clipboardItem = new ClipboardItem({ 'image/png': blob });

                navigator.clipboard.write([clipboardItem]).then(() => {
                    // Show the alert for 2 seconds
                    const alertDiv = document.createElement('div');
                    alertDiv.textContent = "Image copied to clipboard. Open WhatsApp Web and paste it using Ctrl+V or Cmd+V.";
                    alertDiv.style.position = "fixed";
                    alertDiv.style.top = "10px";
                    alertDiv.style.left = "50%";
                    alertDiv.style.transform = "translateX(-50%)";
                    alertDiv.style.backgroundColor = "#333";
                    alertDiv.style.color = "#fff";
                    alertDiv.style.padding = "10px 20px";
                    alertDiv.style.borderRadius = "5px";
                    alertDiv.style.zIndex = "1000";
                    document.body.appendChild(alertDiv);

                    // Hide the alert after 2 seconds
                    setTimeout(() => {
                        alertDiv.remove();
                        chrome.tabs.create({ url: "https://web.whatsapp.com/" });
                    }, 3000);
                }).catch(err => {
                    console.error("Clipboard error:", err);
                    alert("Failed to copy the image to clipboard.");
                });
            })
            .catch(err => console.error("Failed to convert dataUrl to Blob:", err));
    });


    const chatgptButton = document.getElementById("chatgptButton");

    if (chatgptButton) {
        const chatgptOptions = chatgptButton.querySelector("ul");

        chatgptButton.addEventListener("click", () => {
            if (chatgptOptions) {
                chatgptOptions.classList.toggle("blockElem");
            }

            if (chatgptButton.getAttribute("title") == "Ask to ChatGPT") {
                chatgptButton.removeAttribute("title");
            } else {
                chatgptButton.setAttribute("title", "Ask to ChatGPT");
            }
        });

        document.body.addEventListener("click", e => {
            if (e.target == chatgptButton || chatgptButton.contains(e.target)) {
                return;
            }

            if (chatgptOptions) {
                chatgptOptions.classList.remove("blockElem");
            }
            chatgptButton.setAttribute("title", "Ask to ChatGPT");
        });
    }

    const gptScrnshot = document.getElementById("gptScrnshot");
    const gptSummarize = document.getElementById("gptSummarize");
    const gptExplain = document.getElementById("gptExplain");
    const gptAnswer = document.getElementById("gptAnswer");
    const gptTranslate = document.getElementById("gptTranslate");
    const gptTrascribe = document.getElementById("gptTrascribe");
    const gptRecreate = document.getElementById("gptRecreate");
    const gptTransform = document.getElementById("gptTransform");
    const gptLatex = document.getElementById("gptLatex");
    const gptExpert = document.getElementById("gptExpert");

    const askToChatGPT = (query, url) => {
        chrome.windows.create({
            url: url,
            type: "popup",
        }, newWindow => {
            const tabId = newWindow.tabs[0].id;

            chrome.tabs.onUpdated.addListener(function listener(updatedTabId, changeInfo) {
                if (updatedTabId === tabId && changeInfo.status === "complete") {
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        func: (query, dataURL) => {
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

                            const createImageClipboardEvent = blob => {
                                const clipboardEvent = new ClipboardEvent("paste", {
                                    clipboardData: new DataTransfer(),
                                });

                                const file = new File([blob], "image.png", { type: blob.type });
                                clipboardEvent.clipboardData.items.add(file);

                                return clipboardEvent;
                            }

                            waitForElement("#prompt-textarea").then(promptMsg => {
                                promptMsg.dispatchEvent(createImageClipboardEvent(dataURLToBlob(dataURL)));
                                waitForElement("button[aria-haspopup=dialog]").then(() => {
                                    promptMsg.innerHTML = query;
                                    waitForElement("button[data-testid=send-button]").then(sendBtn => {
                                        sendBtn.click();
                                    });
                                });
                            });
                        },
                        args: [query, imageEditor.toDataURL()],
                    });

                    chrome.tabs.onUpdated.removeListener(listener);
                }
            });
        });
    }

    gptScrnshot?.addEventListener("click", () => {
        let context = prompt("What's the context?");

        if (context) {
            askToChatGPT(context, "https://chatgpt.com")
        }
    });

    gptSummarize?.addEventListener("click", () => { askToChatGPT("Summarize this image", "https://chatgpt.com") })
    gptExplain?.addEventListener("click", () => { askToChatGPT("Explain this image", "https://chatgpt.com") })
    gptAnswer?.addEventListener("click", () => { askToChatGPT("Answer this image", "https://chatgpt.com") })

    gptTranslate?.addEventListener("click", () => {
        let language = prompt("Translate to which language?", "English");

        if (language) {
            askToChatGPT(`Translate to ${language}`, "https://chatgpt.com")
        }
    })

    gptTrascribe?.addEventListener("click", () => { askToChatGPT("Transcribe this image", "https://chatgpt.com") })
    gptRecreate?.addEventListener("click", () => { askToChatGPT("Recreate this image", "https://chatgpt.com") })
    gptTransform?.addEventListener("click", () => { askToChatGPT("Transform this image", "https://chatgpt.com") })
    gptLatex?.addEventListener("click", () => { askToChatGPT("Convert this equation to LaTex", "https://chatgpt.com") })
    gptExpert?.addEventListener("click", () => { askToChatGPT("Explain this image", "https://www.chatgpt.com/g/g-6AIsip2Fo-learn-anything") })

    const saveContainer = document.getElementById("saveContainer");
    const saveOptions = document.getElementById("saveOptions");
    let hideTimeout;

    saveContainer.addEventListener("mouseenter", () => {
        console.log("Mouse entered saveContainer");
        clearTimeout(hideTimeout); // Cancel any scheduled hiding
        saveOptions.style.display = "block"; // Show the dropdown
    });

    // Hide the dropdown with a delay when the mouse leaves the container
    saveContainer.addEventListener("mouseleave", () => {
        console.log("Mouse left saveContainer");
        hideTimeout = setTimeout(() => {
            saveOptions.style.display = "none"; // Hide the dropdown
        }, 2000); // 2-second delay
    });


    const chatgptButtonyy = document.getElementById("chatgptButton");
    const gptOptionsyy = document.getElementById("gptOptions");

    // Show dropdown on hover
    chatgptButtonyy.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout); // Clear any existing timer
        gptOptionsyy.style.display = "block";
    });

    // Hide dropdown after 2 seconds when mouse leaves
    chatgptButtonyy.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(() => {
            gptOptionsyy.style.display = "none";
        }, 2000);
    });

    // Keep dropdown open if mouse enters the options
    gptOptionsyy.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout); // Prevent hiding
    });

    // Hide dropdown after 2 seconds if mouse leaves the options
    gptOptionsyy.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(() => {
            gptOptionsyy.style.display = "none";
        }, 2000);
    });



    const uploadBtnyyy = document.getElementById('uploadBtn'); // Main upload button

    uploadBtnyyy.addEventListener("click", function () {

        var buttonIdyytyt = uploadBtnyyy.id;
        sendButtonClickData(buttonIdyytyt);


    });




    const uploadOptionsyy = document.getElementById('uploadOptions'); // Dropdown menu
    const uploadToSecondary = document.getElementById('uploadToSecondary'); // Secondary upload option

    // Show/Hide the dropdown menu on hover
    uploadBtnyyy.addEventListener('mouseover', () => {
        uploadOptionsyy.style.display = 'block'; // Show dropdown
    });

    uploadContainer.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
            uploadOptionsyy.style.display = 'none';

        }, 2000);
    });

    // Handle default upload action
    //  uploadBtnyyy.addEventListener('click', () => {
    //  alert('Uploading to default server...');
    // Add your default upload logic here
    // });

    // Handle secondary upload action
	
	        if (uploadToSecondary) {

    uploadToSecondary.addEventListener('click', () => {
        alert('Uploading to secondary server...');
        uploadOptionsyy.style.display = 'none'; // Hide the dropdown after selection
        // Add your secondary upload logic here
    });
			}






});


	document.addEventListener("DOMContentLoaded", () => {
     const urlyyyy = new URL(window.location.href);
    
     const buttonIdtyr = urlyyyy.searchParams.get("mode") || "visiblenewyy";  
    
 //  console.log("Extracted buttonId:", buttonIdtyr);
    if(buttonIdtyr =='capturesave')
	{
    
	      setTimeout(() => {
	       downloadImage("png");

        }, 2000);
		
			      setTimeout(() => {

	window.close();
	 }, 4000);
	
	}
	
    if(buttonIdtyr =='capturecopy')
	{
    
	      setTimeout(() => {
	       copyImage();
alert('IMAGE COPIED IN CLIPBOARD');
        }, 2000);
		
			      setTimeout(() => {

	window.close();
	 }, 4000);
	
	}	
	
	
	    const paymentDetails = localStorage.getItem('paymentDetails');

            if (paymentDetails) {
                // Paid customer: Show "Thanks" message
                paymentStatusDiv.className = 'thanks';
                paymentStatusDiv.textContent = 'Thanks for your payment!';
            }

});




