 


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




document.addEventListener("DOMContentLoaded", function () {
   
  const selectAreagif = document.getElementById("selectAreagif");
   const selectAreagifold = document.getElementById("selectAreagifold");
   const selectAreagifrainbow = document.getElementById("selectAreagifrainbow");
   const selectAreagifdot = document.getElementById("selectAreagifdot");
   const selectAreagifwave = document.getElementById("selectAreagifwave");
   const selectAreagiffire = document.getElementById("selectAreagiffire");
   const selectAreagifstar = document.getElementById("selectAreagifstar");
   const selectAreagifglow = document.getElementById("selectAreagifglow");
   const selectAreagifpulse = document.getElementById("selectAreagifpulse");

    const selectAreagifcustom = document.getElementById("selectAreagifcustom");
    const closeBtn = document.getElementById("closeBtn");



  const progressBarContainer = document.getElementById("progressBarContainer");
  const progressBar = document.getElementById("progressBar");
          const subBtn = document.getElementById("subs-btn");

 
  
closeBtn.addEventListener("click", () => {
  window.close();
});
 

 

// === GIF BUTTON (selectAreagif) ===
selectAreagif.addEventListener("click", async () => {

  const buttonId = selectAreagif.id;
  setMode(buttonId);
  sendButtonClickData(buttonId);
  const tabs = await chrome.tabs.query({});
  
  
 
 
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


selectAreagifold.addEventListener("click", async () => {

  const buttonId = selectAreagifold.id;
  setMode(buttonId);
  sendButtonClickData(buttonId);
  const tabs = await chrome.tabs.query({});
  
 
  selectAreagifold.textContent = "Starting GIF Recorder...";
  selectAreagifold.style.backgroundColor = "#4CAF50";
  selectAreagifold.style.color = "white";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["./js/capture-areagifold.js"]
  });
  console.log("Injected capture-areagif.js into tab:", tab.id);  // Debug log
});



selectAreagifrainbow.addEventListener("click", async () => {

  const buttonId = selectAreagifrainbow.id;
  setMode(buttonId);
  sendButtonClickData(buttonId);
  const tabs = await chrome.tabs.query({});
  
  
 
 
  selectAreagifrainbow.textContent = "Starting GIF Recorder...";
  selectAreagifrainbow.style.backgroundColor = "#4CAF50";
  selectAreagifrainbow.style.color = "white";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["./js/capture-selectreagifrainbow.js"]
  });
  console.log("Injected capture-areagif.js into tab:", tab.id);  // Debug log
});



selectAreagifdot.addEventListener("click", async () => {

  const buttonId = selectAreagifdot.id;
  setMode(buttonId);
  sendButtonClickData(buttonId);
  const tabs = await chrome.tabs.query({});
  
  
 
 
  selectAreagifdot.textContent = "Starting GIF Recorder...";
  selectAreagifdot.style.backgroundColor = "#4CAF50";
  selectAreagifdot.style.color = "white";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["./js/capture-selectareagifdot.js"]
  });
  console.log("Injected capture-areagif.js into tab:", tab.id);  // Debug log
});

 
 
 selectAreagifwave.addEventListener("click", async () => {

  const buttonId = selectAreagifwave.id;
  setMode(buttonId);
  sendButtonClickData(buttonId);
  const tabs = await chrome.tabs.query({});
  
  
 
 
  selectAreagifwave.textContent = "Starting GIF Recorder...";
  selectAreagifwave.style.backgroundColor = "#4CAF50";
  selectAreagifwave.style.color = "white";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["./js/capture-selectareagifwave.js"]
  });
  console.log("Injected capture-areagif.js into tab:", tab.id);  // Debug log
});
 
 
 
  selectAreagiffire.addEventListener("click", async () => {

  const buttonId = selectAreagiffire.id;
  setMode(buttonId);
  sendButtonClickData(buttonId);
  const tabs = await chrome.tabs.query({});
  
  
 
 
  selectAreagiffire.textContent = "Starting GIF Recorder...";
  selectAreagiffire.style.backgroundColor = "#4CAF50";
  selectAreagiffire.style.color = "white";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["./js/capture-selectareagiffire.js"]
  });
  console.log("Injected capture-areagif.js into tab:", tab.id);  // Debug log
});
 
 
 
   selectAreagifstar.addEventListener("click", async () => {

  const buttonId = selectAreagifstar.id;
  setMode(buttonId);
  sendButtonClickData(buttonId);
  const tabs = await chrome.tabs.query({});
  
  
 
 
  selectAreagifstar.textContent = "Starting GIF Recorder...";
  selectAreagifstar.style.backgroundColor = "#4CAF50";
  selectAreagifstar.style.color = "white";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["./js/capture-selectareagifstar.js"]
  });
  console.log("Injected capture-areagif.js into tab:", tab.id);  // Debug log
});
 
 
    selectAreagifglow.addEventListener("click", async () => {

  const buttonId = selectAreagifglow.id;
  setMode(buttonId);
  sendButtonClickData(buttonId);
  const tabs = await chrome.tabs.query({});
  
  
 
 
  selectAreagifglow.textContent = "Starting GIF Recorder...";
  selectAreagifglow.style.backgroundColor = "#4CAF50";
  selectAreagifglow.style.color = "white";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["./js/capture-selectareagifglow.js"]
  });
  console.log("Injected capture-areagif.js into tab:", tab.id);  // Debug log
});
 
 
 
 
     selectAreagifpulse.addEventListener("click", async () => {

  const buttonId = selectAreagifpulse.id;
  setMode(buttonId);
  sendButtonClickData(buttonId);
  const tabs = await chrome.tabs.query({});
  
  
 
 
  selectAreagifpulse.textContent = "Starting GIF Recorder...";
  selectAreagifpulse.style.backgroundColor = "#4CAF50";
  selectAreagifpulse.style.color = "white";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["./js/capture-selectareagifpulse.js"]
  });
  console.log("Injected capture-areagif.js into tab:", tab.id);  // Debug log
});
 
 
 
 
      selectAreagifcustom.addEventListener("click", async () => {

  const buttonId = selectAreagifcustom.id;
  setMode(buttonId);
  sendButtonClickData(buttonId);
  const tabs = await chrome.tabs.query({});
  
  
 
 
  selectAreagifcustom.textContent = "Starting GIF Recorder...";
  selectAreagifcustom.style.backgroundColor = "#4CAF50";
  selectAreagifcustom.style.color = "white";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["./js/capture-selectareagifcustom.js"]
  });
  console.log("Injected capture-areagif.js into tab:", tab.id);  // Debug log
});
 
 
 

  
});



function downloadImage(dataUrl, filename) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


