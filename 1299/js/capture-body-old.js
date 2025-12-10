// Capture Fragment
//document.body.style.cursor = 'crosshair';
//document.addEventListener('mouseover', highlightElement);
//document.addEventListener('click', captureBody);


     captureBody();


document.addEventListener("click", e => {
    let parent = document.querySelector("#scrsht-utility");
    if (!parent || e.target.parentElement === parent) {
        return;
    }
    parent.remove();
});

function addUtilities(pageX, pageY, imageData) {
    const parentWidth = 200;
    const parentHeight = 60;

    const parentElement = document.createElement("div");
    parentElement.id = "scrsht-utility";
    parentElement.style.position = "fixed";
    parentElement.style.width = `${parentWidth}px`;
    parentElement.style.height = `${parentHeight}px`;
    parentElement.style.top = `${pageY}px`;
    parentElement.style.left = `${pageX}px`;
    parentElement.style.display = "flex";
    parentElement.style.justifyContent = "space-between";
    parentElement.style.alignItems = "center";
    parentElement.style.padding = "0 10px";
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

const buttons = [
    { 
        label: "Edit", 
        action: () => {
            chrome.runtime.sendMessage({ cmd: "imgSrc", imgSrc: imageData });
            removeUtilities();
        } 
    },
    { 
        label: "Save", 
        action: () => downloadImage(imageData, "full-body.png") 
    },
    { 
        label: "Cancel", 
        action: () => parentElement.remove() 
    },
];

buttons.forEach((button, index) => {
    const utilityButton = document.createElement("button");
    utilityButton.innerHTML = button.label;
    utilityButton.style.cssText = buttonStyles;

    utilityButton.addEventListener("click", button.action);

    parentElement.appendChild(utilityButton);

    // Auto-click the "Edit" button when it is added
    if (button.label === "Edit") {
        setTimeout(() => utilityButton.click(), 100); // Delay to ensure it's appended to the DOM
    }
});

document.body.appendChild(parentElement);

	
	
	
}

function highlightElement(e) {
    e.target.style.outline = '2px dashed red';
    e.target.addEventListener('mouseleave', () => {
        e.target.style.outline = '';
    });
}





function captureBody() {
    // Define popular IDs to check for targeting specific library root elements
    const popularIds = ["__next", "react-root", "app", "vue-root", "root", "main"];
    let targetElement = null;

    // Check for the first existing ID in the DOM from the list of popular IDs
    for (const id of popularIds) {
        targetElement = document.getElementById(id);
        if (targetElement) break;
    }

    // Fallback to capturing the entire body if no popular ID is found
    if (!targetElement) {
        targetElement = document.body;
    }

    html2canvas(targetElement, {
        useCORS: true, // Enables cross-origin resource sharing
        allowTaint: false, // Prevents tainted canvas errors
        backgroundColor: '#fff', // Default background color
        windowWidth: targetElement.scrollWidth, // Full width of the target element
        windowHeight: targetElement.scrollHeight, // Full height of the target element
    }).then((canvas) => {
        const imageData = canvas.toDataURL('image/png');

        // Show options at the top-center of the viewport
        addUtilities(window.innerWidth / 2 - 100, 20, imageData);
    }).catch((error) => {
        console.error("Error capturing element:", error);
    });

    cleanup();
}



function removeUtilities() {
    let parent = document.querySelector("#scrsht-utility");
    if (parent) {
        parent.remove();
    }
}

function cleanup() {
    document.body.style.cursor = '';
    document.removeEventListener('mouseover', highlightElement);
    document.removeEventListener('click', captureBody);
}

function downloadImage(dataUrl, filename) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
 