// overlay.js
(function() {
    if (document.getElementById('scrsht-recording-overlay')) return;


if (!document.getElementById('scrsht-fa-link')) {
    const link = document.createElement('link');
    link.id = 'scrsht-fa-link';
    link.rel = 'stylesheet';
    // Using the same path as your manifest or a CDN link
    link.href = chrome.runtime.getURL('./recording/libs/fontawesome/css/all.min.css');
    document.head.appendChild(link);
}

    const overlay = document.createElement('div');
    overlay.id = 'scrsht-recording-overlay';
    // overlay.innerHTML = `
        // <div id="scrsht-timer-bar">
            // <span id="scrsht-dot"></span>
            // <span id="scrsht-timer">00:00</span>
            // <button id="scrsht-pause-btn">Pause</button>
            // <button id="scrsht-stop-btn">Stop</button>
        // </div>
        // <style>
            // #scrsht-recording-overlay {
                // position: fixed; bottom: 0px; left: 50%; transform: translateX(-50%);
                // z-index: 999999; background: white; padding: 10px 20px;
                // border-radius: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                // font-family: Arial, sans-serif; display: flex; align-items: center;
            // }
            // #scrsht-timer-bar { display: flex; align-items: center; gap: 15px; }
            // #scrsht-dot { width: 10px; height: 10px; background: red; border-radius: 50%; animation: blink 1s infinite; }
            // #scrsht-timer { font-weight: bold; font-size: 16px; color: #333; }
            // #scrsht-pause-btn, #scrsht-stop-btn { 
                // border: none; padding: 0px 15px; border-radius: 15px; cursor: pointer; font-weight: bold; 
            // }
            // #scrsht-pause-btn { background: #eee; }
            // #scrsht-stop-btn { background: #ff4444; color: white; }
            // @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
        // </style>
    // `;
	
	overlay.innerHTML = `
    <div id="scrsht-timer-bar">
        <span id="scrsht-dot"></span>
        <span id="scrsht-timer">00:00</span>
        <button id="scrsht-pause-btn" title="Pause">
            <i class="fa-solid fa-pause"></i>
        </button>
        <button id="scrsht-stop-btn" title="Stop">
            <i class="fa-solid fa-square"></i>
        </button>
    </div>
    <style>
        #scrsht-recording-overlay {
            position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
            z-index: 2147483647; background: #ffffff; padding: 4px 24px;
            border-radius: 50px; box-shadow: 0 8px 30px rgba(0,0,0,0.15);
            font-family: 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center;
            border: 1px solid #eee;
        }
        #scrsht-timer-bar { display: flex; align-items: center; gap: 15px; }
        #scrsht-dot { width: 10px; height: 10px; background: #ff4444; border-radius: 50%; animation: scrsht-blink 1s infinite; }
        #scrsht-timer { font-weight: 600; font-size: 16px; color: #222; min-width: 45px; }
        
        #scrsht-pause-btn, #scrsht-stop-btn { 
            border: none; width: 36px; height: 36px; border-radius: 50%; 
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; transition: all 0.2s ease; font-size: 14px;
        }
        
        #scrsht-pause-btn { background: #f0f0f0; color: #444; }
        #scrsht-pause-btn:hover { background: #e0e0e0; }
        
        #scrsht-stop-btn { background: #ff4444; color: white; }
        #scrsht-stop-btn:hover { background: #cc0000; box-shadow: 0 0 10px rgba(255,68,68,0.4); }

        @keyframes scrsht-blink { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
    </style>
`;
	
	
    document.body.appendChild(overlay);

let seconds = 0;
let isPaused = false;
const timerEl = document.getElementById('scrsht-timer');
const pauseBtn = document.getElementById('scrsht-pause-btn');
const pauseIcon = pauseBtn.querySelector('i'); // Get the <i> element


// The timer logic
const timerInterval = setInterval(() => {
    if (!isPaused) {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        timerEl.textContent = `${mins}:${secs}`;
    }
}, 1000);

pauseBtn.onclick = () => {
    if (!isPaused) {
        // ACTION: Switching from Recording to PAUSED
        chrome.runtime.sendMessage({ action: "TOGGLE_PAUSE" });
        
        // 1. Change the icon to 'Play' (to signify "click to resume")
        pauseIcon.className = "fa-solid fa-play"; 
        
        // 2. Optional: Change button color to show it's paused
        pauseBtn.style.background = "#6c5ce7"; 
        pauseBtn.style.color = "white";
        
        isPaused = true;
    } else {
        // ACTION: Switching from Paused to RECORDING
        chrome.runtime.sendMessage({ action: "TOGGLE_RESUME" });
        
        // 1. Change the icon back to 'Pause'
        pauseIcon.className = "fa-solid fa-pause";
        
        // 2. Reset colors
        pauseBtn.style.background = "#f0f0f0";
        pauseBtn.style.color = "#444";
        
        isPaused = false;
    }
};

document.getElementById('scrsht-stop-btn').onclick = () => {
    chrome.runtime.sendMessage({ action: "STOP_RECORDING" });
    // Remove the overlay immediately
    const overlay = document.getElementById('scrsht-recording-overlay');
    if (overlay) overlay.remove();
};

    function cleanup() {
        clearInterval(timerInterval);
        overlay.remove();
    }

    // Listen for cleanup signal if recording stops from popup
    chrome.runtime.onMessage.addListener((msg) => {
        if (msg.action === "CLEANUP_OVERLAY") cleanup();
    });
})();