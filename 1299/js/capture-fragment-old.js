document.body.style.cursor = 'crosshair';

document.addEventListener('mouseover', highlightElement);
document.addEventListener('click', captureFragment);

document.addEventListener("click", e => {
    let parent = document.querySelector("#scrsht-fragment-utility");
    if  (!parent || e.target.parentElement === parent) {
        return;
    }

    parent.remove();
});

function copyImage(imageData) {
    // Decode base64 string into a Blob
    const byteString = atob(imageData.split(',')[1]);
    const mimeString = imageData.split(',')[0].match(/:(.*?);/)[1];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: mimeString });

    // Copy image to clipboard using Clipboard API
    navigator.clipboard.write([
        new ClipboardItem({
            [mimeString]: blob
        })
    ]).then(() => {
        document.querySelector("#scrsht-fragment-utility").children[0].innerHTML = "Copied";
        setTimeout(() => {
            document.querySelector("#scrsht-fragment-utility").children[0].innerHTML = "Copy";
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy image to clipboard:', err);
    });
}

function addFragmentUtilities(pageX, pageY, imageData) {
    const parentWidth = 200; // Slightly wider for better aesthetics
    const parentHeight = 60;

    const parentElement = document.createElement("div");
    parentElement.id = "scrsht-fragment-utility";
    parentElement.style.position = "fixed"; // Change to fixed position
    parentElement.style.width = `${parentWidth}px`;
    parentElement.style.height = `${parentHeight}px`;
    parentElement.style.top = pageY < window.innerHeight - parentHeight ? `${pageY}px` : `${window.innerHeight - parentHeight}px`;
    parentElement.style.left = pageX < window.innerWidth - parentWidth ? `${pageX}px` : `${window.innerWidth - parentWidth}px`;

    parentElement.style.display = "flex";
    parentElement.style.justifyContent = "space-between";
    parentElement.style.alignItems = "center";
    parentElement.style.padding = "0 10px"; // Add padding for inner spacing
    parentElement.style.backgroundColor = "#ffffff";
    parentElement.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
    parentElement.style.borderRadius = "12px";
    parentElement.style.zIndex = "999999";

    const buttonStyles = `
        border: none;
        border-radius: 8px;
        background-color: #007bff;
        color: white;
        font-size: 14px;
        padding: 10px 15px;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const buttonHoverStyles = `
        background-color: #0056b3;
        transform: scale(1.05);
    `;

    const buttons = [
        { label: "Copy", action: () => copyImage(imageData) },
        { label: "Edit", action: () => {
            chrome.runtime.sendMessage({ cmd: "imgSrc", imgSrc: imageData });
            removeFragmentUtilities();
        }},
        { label: "Cancel", action: () => parentElement.remove() },
    ];

    buttons.forEach((button, index) => {
        const utilityButton = document.createElement("button");
        utilityButton.innerHTML = button.label;
        utilityButton.style.cssText = buttonStyles;

        // Add hover effect
        utilityButton.addEventListener("mouseenter", () => {
            utilityButton.style.backgroundColor = "#0056b3";
            utilityButton.style.transform = "scale(1.05)";
        });
        utilityButton.addEventListener("mouseleave", () => {
            utilityButton.style.backgroundColor = "#007bff";
            utilityButton.style.transform = "scale(1)";
        });

        // Add action to the button
        utilityButton.addEventListener("click", button.action);

        parentElement.appendChild(utilityButton);
    });

    document.body.appendChild(parentElement);
}


function removeFragmentUtilities() {
    let parent = document.querySelector("#scrsht-fragment-utility");
    if (parent) {
        parent.remove();
    }
}

function highlightElement(e) {
    e.target.style.outline = '2px dashed red';
    e.target.addEventListener('mouseleave', () => {
        e.target.style.outline = '';
    });
}

 

function captureFragment(e) {
    e.preventDefault();
    e.stopPropagation();

    removeFragmentUtilities();
    const element = e.target;

    // Get computed styles
    const computedStyle = window.getComputedStyle(element);
    const backgroundColor = computedStyle.backgroundColor;
    const backgroundImage = computedStyle.backgroundImage;

    // Log background image if detected
    if (backgroundImage && backgroundImage !== 'none') {
        console.log('Background image detected:', backgroundImage);
    }

    // Add CORS headers for cross-origin images and capture the element
    html2canvas(element, {
        useCORS: true, // Enables cross-origin resource sharing
        allowTaint: false, // Prevents tainted canvas errors
        backgroundColor: backgroundColor || '#fff', // Use computed background color or default to white
        proxy: 'https://your-cors-proxy.com', // Optional: Add a CORS proxy if needed
    }).then((canvas) => {
        const imageData = canvas.toDataURL('image/png');
        addFragmentUtilities(e.pageX, e.pageY, imageData);
    }).catch((error) => {
        console.error("Error capturing fragment:", error);
    });

    cleanup();
}




function cleanup() {
    document.body.style.cursor = '';
    document.removeEventListener('mouseover', highlightElement);
    document.removeEventListener('click', captureFragment);
}

function downloadImage(dataUrl, filename) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
