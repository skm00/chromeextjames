 
  
 


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
            // imageEditorContainer = document.querySelector(".tui-image-editor");
			            imageEditorContainer = document.querySelector(".clipper");

            imageEditorContainer.addEventListener("click", addAnnotationMarker);

            editorMenuItems = Array.from(document.querySelectorAll(".el-button")).slice(4, 11);
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
        editorMenuItems = Array.from(document.querySelectorAll(".el-button")).slice(4, 11);
        editorMenuItems.forEach(item => {
            if (Array.from(item.classList).includes("is-active")) {
                document.querySelectorAll(".el-button")[11].click();
                setTimeout(() => {
                    document.querySelector(".crop .el-button").click();
                }, 100);

                setTimeout(() => {
                    editorMenuItems = Array.from(document.querySelectorAll(".el-button")).slice(4, 11);
                    editorMenuItems.forEach(item => {
                        item.addEventListener("click", () => { if (isAnnotationMode) { annotateBtn.click(); } });
                    });
                }, 500);
                return;
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




   



    const uploadBtnyyy = document.getElementById('uploadBtn'); // Main upload button

    if (uploadBtnyyy) {


    uploadBtnyyy.addEventListener("click", function () {

        var buttonIdyytyt = uploadBtnyyy.id;
        sendButtonClickData(buttonIdyytyt);


    });
	}



    const uploadOptionsyy = document.getElementById('uploadOptions'); // Dropdown menu
    const uploadToSecondary = document.getElementById('uploadToSecondary'); // Secondary upload option

    // Show/Hide the dropdown menu on hover
	
	    if (uploadBtnyyy) {

	
    uploadBtnyyy.addEventListener('mouseover', () => {
        uploadOptionsyy.style.display = 'block'; // Show dropdown
    });
		}

    // uploadContainer.addEventListener('mouseleave', () => {
        // hideTimeout = setTimeout(() => {
            // uploadOptionsyy.style.display = 'none';

        // }, 2000);
    // });
 

    // Handle secondary upload action
	
		    if (uploadToSecondary) {

    uploadToSecondary.addEventListener('click', () => {
    //    alert('Uploading to secondary server...');
        uploadOptionsyy.style.display = 'none'; // Hide the dropdown after selection
        // Add your secondary upload logic here
    });

			}

  




});

  
  
  
  
  
  
document.addEventListener("DOMContentLoaded", function() {
  // Get elements
  const hideBtnggg = document.getElementById("hidepanel");
  const panelggg = document.getElementById("annotationDashboard");
  const annotateBtnggg = document.getElementById("annotateBtn");

  // Initialize state
  let isCollapsedggg = false;
  let originalHeightggg = panelggg.offsetHeight + "px";
  
  // Add smooth transition
  panelggg.style.transition = "height 0.3s ease";

  // Toggle function
  function togglePanel() {
    if (isCollapsedggg) {
      // Expand panel
      panelggg.style.height = originalHeightggg;
      panelggg.style.overflow = "visible";
      hideBtnggg.textContent = "Hide annotation panel";
      hideBtnggg.title = "Hide annotation bar";
    } else {
      // Collapse panel
      originalHeightggg = panelggg.offsetHeight + "px";
      panelggg.style.height = "30px";
      panelggg.style.overflow = "hidden";
      hideBtnggg.textContent = "Show annotation panel";
      hideBtnggg.title = "Show annotation bar";
    }
    isCollapsedggg = !isCollapsedggg;
  }

  // Manual toggle handler
  hideBtnggg.addEventListener("click", togglePanel);

  // Annotate button handler
  if (annotateBtnggg) {
    annotateBtnggg.addEventListener("click", function() {
      if (isCollapsedggg) {
        togglePanel();
      }
      // Add annotation logic here
    });
  }

  // Auto-hide after 3 seconds (only on initial load)
  setTimeout(function() {
    if (!isCollapsedggg) {  // Only collapse if currently expanded
      togglePanel();
      
      // Optional: Flash button to show it's clickable
      hideBtnggg.style.backgroundColor = "#f0f0f0";
      setTimeout(() => {
        hideBtnggg.style.backgroundColor = "";
      }, 1000);
    }
  }, 3000); // 3000ms = 3 seconds
  
  
    const paymentDetails = localStorage.getItem('paymentDetails');

            if (paymentDetails) {
                // Paid customer: Show "Thanks" message
                paymentStatusDiv.className = 'thanks';
                paymentStatusDiv.textContent = 'Thanks for your payment!';
            } 
  
  
  
  
  
});



 function sendButtonClickData(buttonId) {
   fetch("https://scrsht.com/track-button-click.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      buttonId: buttonId,
      timestamp: new Date().toISOString(),
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Button click tracked successfully:", data);
  //    alert("Button click tracked successfully:", data);
	  
    })
    .catch((error) => {
      console.error("Error sending button click data:", error);
	   //     alert("Error sending button click data:", error);

    });
}


 
	
	document.addEventListener("DOMContentLoaded", () => {
     const urlyyyy = new URL(window.location.href);
    
     const buttonIdtyr = urlyyyy.searchParams.get("buttonId") || "visiblenewyy";  
    
   //  console.log("Extracted buttonId:", buttonId);
    
     sendButtonClickData(buttonIdtyr);
});