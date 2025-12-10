
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
    //  alert("Button click tracked successfully:", data);
	  
    })
    .catch((error) => {
      console.error("Error sending button click data:", error);
	//        alert("Error sending button click data:", error);

    });
}


document.addEventListener("DOMContentLoaded", () => {
    var buttonId = 'pdfcontroller';
    sendButtonClickData(buttonId);
});
	
