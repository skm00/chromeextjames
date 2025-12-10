if (!window.inject_xxx_777) {
    window.inject_xxx_777 = true; // Prevent re-injection

  //  console.log("Enabling right-click functionality...");

    // Intercept contextmenu events at the window level
    window.addEventListener(
        "contextmenu",
        function (event) {
            event.stopPropagation(); // Prevent blocking by parent elements
          //  console.log("Window contextmenu allowed.");
        },
        true // Use capture phase
    );

    // Intercept contextmenu events at the document level
    document.addEventListener(
        "contextmenu",
        function (event) {
            event.stopPropagation(); // Prevent blocking within the document
           // console.log("Document contextmenu allowed.");
        },
        true // Use capture phase
    );

    // Remove inline `oncontextmenu` handlers from all elements
    document.querySelectorAll("*").forEach((element) => {
        element.oncontextmenu = null; // Clears any inline blocking
    });

    //console.log("Right-click has been successfully enabled.");
}
