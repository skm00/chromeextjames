let db;
const request = indexedDB.open("Screenshots", 3);

request.onsuccess = event => {
    db = event.target.result;
    loadScreenshots();
};

function loadScreenshots() {
    const grid = document.getElementById("screenshotGrid");
    const message = document.getElementById("noScreenshotsMessage");
    grid.innerHTML = "";
    
    const transaction = db.transaction("screenshots", "readonly");
    const store = transaction.objectStore("screenshots");
    const request = store.getAll();

    request.onsuccess = () => {
        const screenshots = request.result.reverse();

        if (screenshots.length === 0) {
            message.classList.remove("hidden");
        } else {
            message.classList.add("hidden");
        }

        screenshots.forEach(screenshot => {
            const card = document.createElement("div");
            card.className = "screenshot-card";

            const timestamp = document.createElement("div");
            timestamp.className = "timestamp";
            timestamp.textContent = new Date(screenshot.id).toLocaleString();

            const img = document.createElement("img");
            img.src = screenshot.data;
            img.alt = "Screenshot";

            const btnContainer = document.createElement("div");
            btnContainer.className = "btn-container";

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", () => editScreenshot(screenshot.id));

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => deleteScreenshot(screenshot.id));

            btnContainer.appendChild(editBtn);
            btnContainer.appendChild(deleteBtn);

            card.appendChild(timestamp);
            card.appendChild(img);
            card.appendChild(btnContainer);
            grid.appendChild(card);
        });
    };
}

function deleteScreenshot(id) {
    if (confirm("Are you sure you want to delete this screenshot?")) {
        const transaction = db.transaction("screenshots", "readwrite");
        const store = transaction.objectStore("screenshots");
        store.delete(id);
        transaction.oncomplete = () => loadScreenshots();
    }
}

function editScreenshot(id) {
    window.location.href = `screenshot.html?edit=${id}`;
}


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
    var buttonId = 'scrshtHistory';
    sendButtonClickData(buttonId);
});
	
