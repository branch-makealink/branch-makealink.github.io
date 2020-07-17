// Console Message
console.log('Can\'t find what you\'re looking for? Check out https://wizard.docs.branch.io or reach out to support@branch.io!');

// Send user to selecting mobile web URLs if web-only
function quickLinkNext() {
  var selection = document.querySelector('input[name="initRadios"]:checked').value;

  page = parseInt(document.location.href.slice(-6,-5),10);

  if (selection == "App") {
  	page += 1;
  	window.location = "quick-links-"+ page +".html";
  } else {
  	window.location = "quick-links-4.html";
  }
};

// Bootstrap Tooltips
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

// Next Page
function next() {
	page = parseInt(document.location.href.slice(-6,-5),10);

	if (isNaN(page)) { 
		page = 0;
	} else if (page == 0) {
		page = 10;
	}
	page += 1;

	window.location = "quick-links-" + page + ".html";
}

// Next Page
function back() {
	window.history.back();
}

// Home Page
function homepage() {
	window.location = "index.html";
}

// ------------- QUICK LINKS PAGE 1 -------------
// Set web_only flag on link if checked
function quickLinkTypeSelection() {
  var selection = document.querySelector('input[name="initRadios"]:checked').value;

  if (selection == "App") {
  	document.querySelector('#next').innerHTML = "Build Deep Link";
  }	else {
  	document.querySelector('#next').innerHTML = "Build Web Only Link";
  	localStorage.setItem("$web_only",true);
  }
};

// ------------- QUICK LINKS PAGE 2 -------------
// Show specific page collapse
$(document).ready(function(){  
	var selection = document.querySelector('input[name="quicklinkRadios"]:checked').value;

	document.getElementsByClassName("key-value-form-container")[0].style.display = 'none';
});

function hideForm(){
  document.getElementsByClassName("key-value-form-container")[0].style.display = 'none';
}

function showForm(){
    document.getElementsByClassName("key-value-form-container")[0].style.display = 'block';
}

// record user's link data
function recordLinkData() {
	var keyData = document.querySelectorAll('input[name="key"]');
	var keyLength = keyData.length;
	var keyInput;

	var valueData = document.querySelectorAll('input[name="value"]');
	var valueLength = valueData.length;
	var valueInput;

	var keyArray = [];
	var valueArray = [];

	for (var i = 0; i < keyLength; i++) {
		keyInput = keyData[i];
		if (keyInput.value) {
			keyArray.push(keyInput.value);
		}
	};

	for (var i = 0; i < valueLength; i++) {
		valueInput = valueData[i];
		if (valueInput.value) {
			valueArray.push(valueInput.value)
		}
	};

	// store as JSON
	var deepLinkData = Object.create(null); keyArray.forEach((e, i) => deepLinkData[e] = valueArray[i]);
	console.log(deepLinkData);

	// convert to string for localStorage
	localStorage.setItem('deepLinkData', JSON.stringify(deepLinkData));
}

// ------------- QUICK LINKS PAGE 3 -------------
// Either option leads to next page


// ------------- QUICK LINKS PAGE 4 -------------
// Record redirects 
function recordRedirects() {
	var ios = document.getElementById("ios_url").value;
	var android = document.getElementById("android_url").value;
	var desktop = document.getElementById("desktop_url").value;

	var URLs = [ios, android, desktop]
	const keys = ["$ios_url", "$android_url", "$desktop_url"]

	// map key to URL
	const redirects = Object.create(null); keys.forEach((e, i) => redirects[e] = URLs[i]);

	// convert to string for localStorage
	localStorage.setItem('redirects', JSON.stringify(redirects));

	// retrieve as JSON later on
	// var retrieveRedirects = localStorage.getItem('redirects');
	// var redirectsJSON = JSON.parse(retrieveRedirects);
}

// ------------- QUICK LINKS PAGE 5 -------------
// record deepview keys, change button text
function addDeepviews() {
  var selection = document.querySelector('input[name="deepviewRadios"]:checked').value;

  if (selection == "Yes") {
  	document.querySelector('#next').innerHTML = "Add Deepviews";

  	const passiveDeepviews = {"$ios_deepview":"branch_default","$android_deepview":"branch_default", "$desktop_deepview":"branch_default"}

  	localStorage.setItem('passiveDeepviews', JSON.stringify(passiveDeepviews));

  	// retrieve as JSON later on
	// var retrieveDeepviews = localStorage.getItem('passiveDeepviews');
	// var deepviewJSON = JSON.parse(retrieveDeepviews);

  }	else {
  	document.querySelector('#next').innerHTML = "Don't use Deepviews";
  }
};


function createLink() {
	branch.init(key)
	var retrieveRedirects = localStorage.getItem('redirects');
	var redirectsJSON = JSON.parse(retrieveRedirects);

	var retrieveDeepLinkData = localStorage.getItem('deepLinkData');
	var deepLinkJSON = JSON.parse(retrieveDeepLinkData);
}














