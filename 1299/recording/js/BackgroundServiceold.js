import { WelcomePage } from "./common/welcome.js";

new class {
  constructor() {
    new WelcomePage();
    chrome.action.onClicked.addListener(() => {
      chrome.tabs.create({ url: "/pages/popup/popup14.html" });
    });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message:', request);
  if (request.type === "createNotification") {
    chrome.notifications.create(request.id, request.options, () => {
      if (chrome.runtime.lastError) {
        console.error("Notification creation error:", chrome.runtime.lastError);
      } else {
        console.log('Notification created with ID:', request.id);
      }
    });
  } else if (request.type === "updateNotification") {
    console.log('Updating notification with ID:', request.id, 'and options:', request.options);
    chrome.notifications.update(request.id, request.options, (wasUpdated) => {
      if (chrome.runtime.lastError) {
        console.error("Notification update error:", chrome.runtime.lastError);
      } else if (!wasUpdated) {
        console.error("Notification update failed for ID:", request.id);
      } else {
        console.log(`Notification updated: ${request.options.progress}% for ID: ${request.id}`);
      }
    });
  } else if (request.type === "clearNotification") {
    chrome.notifications.clear(request.id, (wasCleared) => {
      if (chrome.runtime.lastError) {
        console.error("Notification clear error:", chrome.runtime.lastError);
      } else if (!wasCleared) {
        console.error("Notification clear failed for ID:", request.id);
      } else {
        console.log('Notification cleared with ID:', request.id);
      }
    });
  }
  sendResponse();
  return true; // Keeps the message channel open until sendResponse is called
});

  }
};
