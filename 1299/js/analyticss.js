
function sendButtonClickData(buttonId) {
  //  console.log(`Sending data for button: ${buttonId}`); // Check if this is logged
	//    alert(`Sending data for button: ${buttonId}`); // Check if this is logged

    fetch('https://scrsht.com/track-button-click.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            buttonId: buttonId,
         timestamp: new Date().toISOString(),
        }),
    })
    .then((response) => {
      console.log('Network response:', response); // Log the raw response
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
       //console.log('Button click tracked successfully:', data); // Log success
    })
    .catch((error) => {
     // console.error('Error sending button click data:', error); // Log error
    });
}

setTimeout(function () {


 // trigger count starts here
 
 // document.addEventListener("DOMContentLoaded", () => {

 
     const upload_olddd = document.getElementById("upload");
	 
	// if (upload_olddd) {


  upload_olddd.addEventListener("click", function () {
	  	 	//    alert('upload button clicked');  

	  
		   var buttonIdyytyt = upload_olddd.id; 
     sendButtonClickData(buttonIdyytyt);
    });
 
 
      const save_olddd = document.getElementById("save");
  save_olddd.addEventListener("click", function () {
		   var buttonIdyytyt1 = save_olddd.id; 
     sendButtonClickData(buttonIdyytyt1);
    });

      const pdf_olddd = document.getElementById("pdf");
  pdf_olddd.addEventListener("click", function () {
		   var buttonIdyytyt2 = pdf_olddd.id; 
     sendButtonClickData(buttonIdyytyt2);
    });

       const copy_olddd = document.getElementById("copy");
  copy_olddd.addEventListener("click", function () {
		   var buttonIdyytyt3 = copy_olddd.id; 
     sendButtonClickData(buttonIdyytyt3);
    });
 
 
        const share_olddd = document.getElementById("share");
  share_olddd.addEventListener("click", function () {
		   var buttonIdyytyt4 = share_olddd.id; 
     sendButtonClickData(buttonIdyytyt4);
    });
 
 
 
         const print_olddd = document.getElementById("print");
  print_olddd.addEventListener("click", function () {
		   var buttonIdyytyt5 = print_olddd.id; 
     sendButtonClickData(buttonIdyytyt5);
    });
	
	         const close_olddd = document.getElementById("close");
  close_olddd.addEventListener("click", function () {
		   var buttonIdyytyt6 = close_olddd.id; 
     sendButtonClickData(buttonIdyytyt6);
    });
	

	         const settings_gear_olddd = document.getElementById("settings_gear");
  settings_gear_olddd.addEventListener("click", function () {
		   var buttonIdyytyt7 = settings_gear_olddd.id; 
     sendButtonClickData(buttonIdyytyt7);
    });
	

	         const arrow_olddd = document.getElementById("arrow");
  arrow_olddd.addEventListener("click", function () {
		   var buttonIdyytyt8 = arrow_olddd.id; 
     sendButtonClickData(buttonIdyytyt8);
    });
	
         const pencil_olddd = document.getElementById("pencil");
  pencil_olddd.addEventListener("click", function () {
		   var buttonIdyytyt9 = pencil_olddd.id; 
     sendButtonClickData(buttonIdyytyt9);
    });

         const marker_olddd = document.getElementById("marker");
  marker_olddd.addEventListener("click", function () {
		   var buttonIdyy1 = marker_olddd.id; 
     sendButtonClickData(buttonIdyy1);
    });

         const blur_olddd = document.getElementById("blur");
  blur_olddd.addEventListener("click", function () {
		   var buttonIdyy11 = blur_olddd.id; 
     sendButtonClickData(buttonIdyy11);
    });

         const circle_olddd = document.getElementById("circle");
  circle_olddd.addEventListener("click", function () {
		   var buttonIdyy12 = circle_olddd.id; 
     sendButtonClickData(buttonIdyy12);
    });	
	

         const rectangle_olddd = document.getElementById("rectangle");
  rectangle_olddd.addEventListener("click", function () {
		   var buttonIdyy13 = rectangle_olddd.id; 
     sendButtonClickData(buttonIdyy13);
    });	
        const text_olddd = document.getElementById("text");
  text_olddd.addEventListener("click", function () {
		   var buttonIdyy14 = text_olddd.id; 
     sendButtonClickData(buttonIdyy14);
    });	

        const line_olddd = document.getElementById("line");
  line_olddd.addEventListener("click", function () {
		   var buttonIdyy15 = line_olddd.id; 
     sendButtonClickData(buttonIdyy15);
    });	

        const color_olddd = document.getElementById("color");
  color_olddd.addEventListener("click", function () {
		   var buttonIdyy16 = color_olddd.id; 
     sendButtonClickData(buttonIdyy16);
    });	

        const undo_olddd = document.getElementById("undo");
  undo_olddd.addEventListener("click", function () {
		   var buttonIdyy17 = undo_olddd.id; 
     sendButtonClickData(buttonIdyy17);
    });	
 
         const advanced_settinggg_olddd = document.getElementById("advanced_settinggg");
  advanced_settinggg_olddd.addEventListener("click", function () {
		   var buttonIdyy18 = advanced_settinggg_olddd.id; 
     sendButtonClickData(buttonIdyy18);
    });	
 
          const advanced_feature_arrow4_olddd = document.getElementById("advanced_feature_arrow4");
  advanced_feature_arrow4_olddd.addEventListener("click", function () {
		   var buttonIdyy19 = advanced_feature_arrow4_olddd.id; 
     sendButtonClickData(buttonIdyy19);
    });	
 
          const advanced_feature_arrow5_olddd = document.getElementById("advanced_feature_arrow5");
  advanced_feature_arrow5_olddd.addEventListener("click", function () {
		   var buttonIdyy21 = advanced_feature_arrow5_olddd.id; 
     sendButtonClickData(buttonIdyy21);
    });	
	
       const advanced_feature_arrow6_olddd = document.getElementById("advanced_feature_arrow6");
  advanced_feature_arrow6_olddd.addEventListener("click", function () {
		   var buttonIdyy22 = advanced_feature_arrow6_olddd.id; 
     sendButtonClickData(buttonIdyy22);
    });		
	
       const advanced_feature_arrow_olddd = document.getElementById("advanced_feature_arrow");
  advanced_feature_arrow_olddd.addEventListener("click", function () {
		   var buttonIdyy23 = advanced_feature_arrow_olddd.id; 
     sendButtonClickData(buttonIdyy23);
    });		
	
       const advanced_feature_arrow2_olddd = document.getElementById("advanced_feature_arrow2");
  advanced_feature_arrow2_olddd.addEventListener("click", function () {
		   var buttonIdyy24 = advanced_feature_arrow2_olddd.id; 
     sendButtonClickData(buttonIdyy24);
    });		
	
       const advanced_feature_arrow3_olddd = document.getElementById("advanced_feature_arrow3");
  advanced_feature_arrow3_olddd.addEventListener("click", function () {
		   var buttonIdyy25 = advanced_feature_arrow3_olddd.id; 
     sendButtonClickData(buttonIdyy25);
    });			
	
       const arrow_rect_olddd = document.getElementById("arrow_rect");
  arrow_rect_olddd.addEventListener("click", function () {
		   var buttonIdyy26 = arrow_rect_olddd.id; 
     sendButtonClickData(buttonIdyy26);
    });	
 
        const arrow_circle_olddd = document.getElementById("arrow_circle");
  arrow_circle_olddd.addEventListener("click", function () {
		   var buttonIdyy27 = arrow_circle_olddd.id; 
     sendButtonClickData(buttonIdyy27);
    });	
 
         const arrow_line_olddd = document.getElementById("arrow_line");
  arrow_line_olddd.addEventListener("click", function () {
		   var buttonIdyy28 = arrow_line_olddd.id; 
     sendButtonClickData(buttonIdyy28);
    });	
 
          const curly_braces_olddd = document.getElementById("curly_braces");
  curly_braces_olddd.addEventListener("click", function () {
		   var buttonIdyy29 = curly_braces_olddd.id; 
     sendButtonClickData(buttonIdyy29);
    });	
 
         const brackets_olddd = document.getElementById("brackets");
  brackets_olddd.addEventListener("click", function () {
		   var buttonIdyy211 = brackets_olddd.id; 
     sendButtonClickData(buttonIdyy211);
    });	
 
	// }
	 
	
	 
  // });	
 
 // trigger count ends here 
 
 }, 1000);
