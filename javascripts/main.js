// Ads Link Creation

// Email Link Creation
function emailLinkCreator() {
	var content = document.getElementById('emailBox');

	console.log(content.style.display)
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
};