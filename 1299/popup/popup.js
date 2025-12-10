chrome.tabs.query({ status: "complete" }, (tabs) => {
  tabs.forEach((tab) => {
    // Check if the script is already injected
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: () => window.hasContentScriptInjected,
      },
      ([result]) => {
        if (!result || !result.result) {
          // If not injected, inject it
          chrome.scripting
            .executeScript({
              target: { tabId: tab.id },
              files: ["js/content_scripts.js"],
            })
            .catch((error) => {
              console.error(
                `Failed to inject script into tab ${tab.id}:`,
                error
              );
            });
          // Set a flag in the tab to avoid duplicate injection
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
              window.hasContentScriptInjected = true;
            },
          });
        }
      }
    );
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const allPageButton = document.getElementById("allPage");
  const selectArea = document.getElementById("selectArea");
    const selectAreahd = document.getElementById("selectAreahd");
 // const selectAreagif = document.getElementById("selectAreagif");

  const progressBarContainer = document.getElementById("progressBarContainer");
  const progressBar = document.getElementById("progressBar");
  const screenrecorder = document.getElementById("screenrecorder");
  const allShowyrr = document.getElementById("allShow");
  const capturesaveyy = document.getElementById("capturesave");
  const capturecopyyy = document.getElementById("capturecopy");
  const selectoyyy = document.getElementById("selecto");
  const selectscroll = document.getElementById("selectscroll");
  const pdfcontroller = document.getElementById("pdfcontroller");
  const openDashboard = document.getElementById("openDashboard");
  const openToDo = document.getElementById("openToDo");
  const scrshtHistory = document.getElementById("scrshtHistory");
  const visiblenewyy = document.getElementById("visiblenewyy");
  const selectnewyy = document.getElementById("selectnewyy");
  const fullpagenewyy = document.getElementById("fullpagenewyy");
  const enablerightclickyy = document.getElementById("enablerightclick");
  const capturefragment = document.getElementById("capturefragment");
  const captureBodyBtn = document.getElementById("captureBody");
  const paymentIndicator = document.getElementById("payment-indicator");
  const toBeHidden = document.getElementById("to-be-hidden");
  const paymentLink = document.getElementById("payment-link");
  const subBtn = document.getElementById("subs-btn");

  const serverURL = "https://paypal-server-beta.vercel.app/api";

  // UserId retrieval/generation
  chrome.storage.sync.get(["userId"]).then((result) => {
    if (Object.keys(result).length != 0) {
      // Check if the user had paid or not
      const userId = result["userId"];
      paymentLink.href += `?userId=${userId}`;
      subBtn.href += `?userId=${userId}`;
      chrome.storage.sync.get(["paid"]).then((paidResult) => {
        if (Object.keys(paidResult).length == 0) {
          fetch(`${serverURL}/payment-status?userId=${userId}`)
            .then((response) => response.text())
            .then((text) => {
              const hasPaid = text === "true";
              chrome.storage.sync.set({ paid: hasPaid });
            })
            .catch((error) => {
              console.error("Error fetching payment status:", error);
              chrome.storage.sync.set({ paid: false });
            });
        } else {
          const hasPaid = paidResult["paid"];
          if (!hasPaid) {
            console.log("user_id:", userId);
            fetch(`${serverURL}/payment-status?userId=${userId}`)
              .then((response) => response.text())
              .then((text) => {
                const hasPaid = text === "true";
                chrome.storage.sync.set({ paid: hasPaid });
              })
              .catch((error) => {
                console.error("Error fetching payment status:", error);
                chrome.storage.sync.set({ paid: false });
              });
            paymentIndicator.style.color = "red";
            chrome.storage.sync.get(["show-count"]).then((countResult) => {
              if (Object.keys(countResult).length != 0) {
                let count = countResult["show-count"];
                if (10 - count > 0)
                  paymentIndicator.textContent = `${10 - count} free uses left 19$ lifetime`;
                else
                  paymentIndicator.textContent = `No free uses left (19$ lifetime)`;
                count += 1;
                if (count > 10) {
                  toBeHidden.style.display = "none";
                }
                chrome.storage.sync
                  .set({ "show-count": count })
                  .then(() => console.log("Count updated"));
              } else {
                paymentIndicator.textContent = `10 free uses left`;
                chrome.storage.sync
                  .set({ "show-count": 0 })
                  .then(() => console.log("Count initiated"));
              }
            });
          } else {
            paymentIndicator.textContent = "Paid User";
            paymentLink.href = "";
            subBtn.style.display = "none";
          }
        }
      });
    } else {
      // create an UUID userId and store it in the sync storage
      const userId = Math.random().toString(16).slice(2);
      console.log("The userId generated is", userId);
      paymentLink.href += `?userId=${userId}`;
      subBtn.href += `?userId=${userId}`;
      chrome.storage.sync
        .set({ userId: userId })
        .then(() => console.log("The userId is stored in the storage now."));
    }
  });

  // Button listeners
  allPageButton.addEventListener("click", function () {
    var buttonIdyytyt = allPageButton.id;
    sendButtonClickData(buttonIdyytyt);
    setMode(buttonIdyytyt);
    // Hide the button and show the progress bar
    allPageButton.style.display = "none";
    progressBarContainer.style.display = "block";
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.5; // Increase progress (100 / 20s = 0.5% per 100ms)
      progressBar.style.width = `${progress}%`;
      if (progress >= 100) {
        clearInterval(interval);
        // Restore the button and hide the progress bar
        allPageButton.style.display = "block";
        progressBarContainer.style.display = "none";
      }
    }, 100); // Update every 100ms
  });

  allShowyrr.addEventListener("click", function () {
    var buttonIdyytyt = allShowyrr.id;
    setMode(buttonIdyytyt);
    sendButtonClickData(buttonIdyytyt);
  });

  capturesaveyy.addEventListener("click", function () {
    var buttonIdyytyt = capturesaveyy.id;
    setMode(buttonIdyytyt);
    sendButtonClickData(buttonIdyytyt);
  });

  capturecopyyy.addEventListener("click", function () {
    var buttonIdyytyt = capturecopyyy.id;
    setMode(buttonIdyytyt);
    sendButtonClickData(buttonIdyytyt);
  });

  if (visiblenewyy) {
    visiblenewyy.addEventListener("click", function () {
      localStorage.setItem("pageclicker", "visiblenewyy");
    });
  }

  selectoyyy.addEventListener("click", function () {
    var buttonIdyytyt = selectoyyy.id;
    setMode(buttonIdyytyt);
    sendButtonClickData(buttonIdyytyt);
  });

  selectArea.addEventListener("click", () => {
    var buttonId = selectArea.id; // Use selectArea to get the ID
    setMode(buttonId);
    sendButtonClickData(buttonId);
    selectArea.innerHTML = "Drag & Select Area";
    // Change the style
    selectArea.style.color = "black";
    selectArea.style.backgroundColor = "#ffc107";
    const timestamp = new Date().toISOString(); // Get the current timestamp in ISO format
    chrome.storage.local.get({ buttonClickHistory: [] }, (result) => {
      const clickHistory = result.buttonClickHistory;
      clickHistory.push({ buttonId, timestamp }); // Add the new timestamp
      chrome.storage.local.set({ buttonClickHistory: clickHistory }, () => {
        console.log("Timestamp saved to chrome.storage.local");
      });
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["./js/capture-area.js"],
      });
    });
  });


  selectAreagif.addEventListener("click", () => {
    var buttonId = selectAreagif.id; // Use selectAreagif to get the ID
    setMode(buttonId);
    sendButtonClickData(buttonId);
    selectAreagif.innerHTML = "Drag & Select Area";
    // Change the style
    selectAreagif.style.color = "black";
    selectAreagif.style.backgroundColor = "#ffc107";
    const timestamp = new Date().toISOString(); // Get the current timestamp in ISO format
    chrome.storage.local.get({ buttonClickHistory: [] }, (result) => {
      const clickHistory = result.buttonClickHistory;
      clickHistory.push({ buttonId, timestamp }); // Add the new timestamp
      chrome.storage.local.set({ buttonClickHistory: clickHistory }, () => {
        console.log("Timestamp saved to chrome.storage.local");
      });
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["./js/capture-areagif.js"],
      });
    });
  });




  selectAreahd.addEventListener("click", () => {
    var buttonIdhdd = selectAreahd.id; 
    setMode(buttonIdhdd);
    sendButtonClickData(buttonIdhdd);
    selectAreahd.innerHTML = "Drag & Select Area";
    // Change the style
    selectAreahd.style.color = "black";
    selectAreahd.style.backgroundColor = "#ffc107";
    const timestamp = new Date().toISOString(); 
    chrome.storage.local.get({ buttonClickHistory: [] }, (result) => {
      const clickHistory = result.buttonClickHistory;
      clickHistory.push({ buttonIdhdd, timestamp });
      chrome.storage.local.set({ buttonClickHistory: clickHistory }, () => {
        console.log("Timestamp saved to chrome.storage.local");
      });
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["./js/capture-area-hd.js"],
      });
    });
  });


// === GIF BUTTON (selectAreagif) ===
selectAreagif.addEventListener("click", async () => {
  const buttonId = selectAreagif.id;
  setMode(buttonId);
  sendButtonClickData(buttonId);
  const tabs = await chrome.tabs.query({});
  const hasYouTubeTab = tabs.some(tab => {
    if (!tab.url) return false;
    try {
      const url = new URL(tab.url);
      return url.hostname === "www.youtube.com" ||
             url.hostname === "youtube.com" ||
             url.hostname === "youtu.be";
    } catch {
      return false;
    }
  });
  if (hasYouTubeTab) {
    showWarning("GIF recording is blocked while YouTube is open. Please close all YouTube tabs.");
    return;
  }
  selectAreagif.textContent = "Starting GIF Recorder...";
  selectAreagif.style.backgroundColor = "#4CAF50";
  selectAreagif.style.color = "white";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["./js/capture-areagif.js"]
  });
  console.log("Injected capture-areagif.js into tab:", tab.id);  // Debug log
});



  selectscroll.addEventListener("click", () => {
    var buttonId = selectscroll.id;
    setMode(buttonId);
    sendButtonClickData(buttonId);
    selectscroll.innerHTML = "Scroll, Select Big Area";
    // Change the style
    selectscroll.style.color = "black";
    selectscroll.style.backgroundColor = "#ffc107";
    const timestamp = new Date().toISOString(); // Get the current timestamp in ISO format
    chrome.storage.local.get({ buttonClickHistory: [] }, (result) => {
      const clickHistory = result.buttonClickHistory;
      clickHistory.push({ buttonId, timestamp }); // Add the new timestamp
      chrome.storage.local.set({ buttonClickHistory: clickHistory }, () => {
        console.log("Timestamp saved to chrome.storage.local");
      });
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["./js/capture-scrollarea.js"],
      });
    });
  });

  pdfcontroller.addEventListener("click", function () {
    var buttonId = pdfcontroller.id;
    setMode(buttonId);
    window.open(chrome.runtime.getURL("/popup/pdf-controller.html"), "_blank");
  });

// === VIDEO RECORDER BUTTON (screenrecorder) ===
screenrecorder.addEventListener("click", async function () {
  const buttonId = screenrecorder.id;
  setMode(buttonId);
  sendButtonClickData(buttonId);

  const tabs = await chrome.tabs.query({});
  const hasYouTubeTab = tabs.some(tab => {
    if (!tab.url) return false;
    try {
      const url = new URL(tab.url);
      return url.hostname === "www.youtube.com" || 
             url.hostname === "youtube.com" || 
             url.hostname === "youtu.be";
    } catch {
      return false;
    }
  });

  if (hasYouTubeTab) {
    showWarning("Video recording is not allowed while YouTube is open (copyright policy). Please close all YouTube tabs.");
    return;
  }

  chrome.tabs.create({ url: "/recording/pages/popup/popup14.html" });
});



// === Reusable clean warning toast ===
function showWarning(message) {
  // Remove old warning if exists
  const old = document.getElementById("youtubeWarningToast");
  if (old) old.remove();

  const toast = document.createElement("div");
  toast.id = "youtubeWarningToast";
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
    background: #d32f2f; color: white; padding: 16px 32px; border-radius: 12px;
    font-family: system-ui; font-size: 16px; font-weight: bold; z-index: 9999999;
    box-shadow: 0 8px 30px rgba(0,0,0,0.4); text-align: center; max-width: 90%;
  `;

  document.body.appendChild(toast);

  // Auto remove after 7 seconds
  setTimeout(() => {
    toast.style.transition = "opacity 0.5s";
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 500);
  }, 7000);
}


 // Add a click event listener to enable right-click functionality
  enablerightclickyy.addEventListener("click", function () {
    chrome.action.onClicked.addListener(function (tab) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["./js/enableRightClick.js"],
      });
    });
  });

  capturefragment.addEventListener("click", () => {
    var buttonIdyytyt = capturefragment.id;
    setMode(buttonIdyytyt);
    sendButtonClickData(buttonIdyytyt);
    capturefragment.innerHTML = "May take 10 seconds";
    // Change the style
    capturefragment.style.color = "black";
    capturefragment.style.backgroundColor = "#ffc107";
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["./js/capture-fragment.js"],
      });
    });
  });

  captureBodyBtn.addEventListener("click", () => {
    var buttonIdyytyt = captureBodyBtn.id;
    setMode(buttonIdyytyt);
    sendButtonClickData(buttonIdyytyt);
    // Set initial text and style
    let countdown = 90; // Starting value of the countdown
    captureBodyBtn.innerHTML = `May take ${countdown} s`; // Display countdown
    captureBodyBtn.style.color = "black";
    captureBodyBtn.style.backgroundColor = "#ffc107";
    // Start the countdown timer
    const interval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        captureBodyBtn.innerHTML = `May take ${countdown} s`;
      } else {
        clearInterval(interval);
        captureBodyBtn.innerHTML = "Please wait,or reload page"; // Show wait message
        captureBodyBtn.style.color = "white"; // Update text color
        captureBodyBtn.style.backgroundColor = "#dc3545"; // Update background to red
      }
    }, 1000); // Update every second
    // Trigger the capture-body.js script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["./js/capture-body.js"],
      });
	  
	  
    });
  });

  openDashboard.addEventListener("click", () => {
    var buttonId = openDashboard.id;
    sendButtonClickData(buttonId);
    chrome.runtime.sendMessage({ cmd: "open_dashboard" });
  });

  scrshtHistory.addEventListener("click", () => {
    var buttonId = scrshtHistory.id;
    sendButtonClickData(buttonId);
    chrome.runtime.sendMessage({ cmd: "scrsht_history" });
  });

  openToDo.addEventListener("click", () => {
    var buttonId = openToDo.id;
    sendButtonClickData(buttonId);
    chrome.runtime.sendMessage({ cmd: "open_todo_dashboard" });
  });
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
    })
    .catch((error) => {
      console.error("Error sending button click data:", error);
    });
}

function setMode(mode) {
  chrome.storage.local.set({ mode: mode }, function () {
    // console.log('Mode set to:', mode);
  });
}

function getMode(callback) {
  chrome.storage.local.get(["mode"], function (result) {
    callback(result.mode || "selectArea");
  });
}

function downloadImage(dataUrl, filename) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}