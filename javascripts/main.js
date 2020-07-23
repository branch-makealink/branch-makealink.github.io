// Console Message
console.log(
  "Can't find what you're looking for? Check out https://wizard.docs.branch.io or reach out to support@branch.io!"
);

// Bootstrap Tooltips
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});


// event.data
var data = Object.create(null);

// final metadata 
var finalJSON = {
	// "tags":tags,
	data : {
		"$ios_url": localStorage.getItem("$ios_url"),
		"$android_url": localStorage.getItem("$android_url"),
		"$desktop_url": localStorage.getItem("$desktop_url")
	}
};

// Next Page
function next() {
  // parse URL for page number
  var page = parseInt(document.location.href.slice(-6,-5),10);

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
  localStorage.clear();
  window.location = "index.html";
}

// ------------- QUICK LINKS PAGE 1 -------------
// Set web_only flag on link if checked
function userSelection() {
  var selection = document.querySelector('input[name="radios"]:checked').value;
  var button = document.querySelector(".next");

  if (selection == "App") {
      button.innerHTML = "Build Deep Link";
	  button.style.right = "-900px";
	  localStorage.removeItem(data["'web_only'"]);

  } else if (selection == "Mobile Web") {
	  button.innerHTML = "Build Web Only Link";
	  button.style.right = "-870px";
	  webonly = {"$web_only":true};
	  localStorage.data = ('webonly', JSON.stringify(webonly));
	  
  } else if (selection == "Yes") {
	  button.innerHTML = "Add Deepviews";
	  button.style.right = "-900px";

  } else if (selection == "No") {
	  button.innerHTML = "Don't use Deepviews";
	  button.style.right = "-865px";
  }
};

// ------------- QUICK LINKS PAGE 2 -------------
// Show specific page collapse
$(document).ready(function(){  
	document.getElementsByClassName("key-value-form-container")[0].style.display = 'none';
});

function hideForm() {
  document.getElementsByClassName("key-value-form-container")[0].style.display =
    "none";
}

function showForm() {
  document.getElementsByClassName("key-value-form-container")[0].style.display =
    "block";
}

// record user's link data
function recordLinkData() {
  var keyData = document.querySelectorAll('input[name="key"]');
  var keyLength = keyData.length;

  var valueData = document.querySelectorAll('input[name="value"]');
  var valueLength = valueData.length;

  var keyArray = new Array;
  var valueArray = new Array;
  
  // store keys
  for (var i = 0; i < keyLength; i++) {
    var keyInput = keyData[i];
    if (keyInput.value) {
      keyArray.push(keyInput.value);
    }
  };
 
  // store values 
  for (var i = 0; i < valueLength; i++) {
    var valueInput = valueData[i];
    if (valueInput.value) {
      valueArray.push(valueInput.value);
    }
  };

  // zip 
  var data = Object.create(null);
  keyArray.forEach((e, i) => (data[e] = valueArray[i]));

  // convert to string for localStorage
  localStorage.setItem("data", JSON.stringify(data));
};

// ------------- QUICK LINKS PAGE 3 -------------
// Either option leads to next page
$(function() {
	console.log(localStorage);
});

// ------------- QUICK LINKS PAGE 4 -------------
// Record redirects
function recordRedirects() {
  var ios = document.getElementById("$ios_url");
  var android = document.getElementById("$android_url");
	var desktop = document.getElementById("$desktop_url");
	
	var redirects = [ios, android, desktop]

	for (var i = 0; i < redirects.length; i++) {
		if (redirects[i].value !== undefined || redirects[i].value !== "") {
			localStorage.setItem(redirects[i].id, redirects[i].value)
		}
	}
};

// ------------- QUICK LINKS PAGE 5 -------------
// record deepview keys, change button text
function addDeepviews() {
  var selection = document.querySelector('input[name="radios"]:checked').value;

  if (selection == "Yes") {

    const passiveDeepviews = {
      $ios_deepview: "branch_default",
      $android_deepview: "branch_default",
      $desktop_deepview: "branch_default",
    }

	localStorage.setItem("passiveDeepviews", JSON.stringify(passiveDeepviews));
    // retrieve as JSON later on
    // var retrieveDeepviews = localStorage.getItem('passiveDeepviews');
    // var deepviewJSON = JSON.parse(retrieveDeepviews);
  } else {
	  localStorage.removeItem("passiveDeepviews");
  }
};

// ------------- QUICK LINKS PAGE 7 -------------
function setTitle() {
	if (document.location.href.includes("7")) {
		var linkTitle = document.getElementById("$marketing_title").value;
		if (linkTitle !== "") {
			localStorage.setItem("title", linkTitle)
		}
	 }
};

// ------------- QUICK LINKS PAGE 8 -------------
function setAlias() {
	if (document.location.href.includes("8")) {
		var alias = document.getElementById("$alias").value;
		if (alias !== "") {
			localStorage.setItem("alias", alias)
		}
	 }
};

// ------------- QUICK LINKS PAGE 9 -------------
function setUTMTags() {
	if (document.location.href.includes("9")) {
		var utm_medium = document.getElementById("utm_medium");
		var utm_source = document.getElementById("utm_source");
		var utm_campaign = document.getElementById("utm_campaign");
		var utm_content = document.getElementById("utm_content");

		var utmTags = new Array(utm_campaign, utm_content, utm_medium, utm_source);

		for (var i = 0; i < utmTags.length; i++) {
			if (utmTags[i].value !== "") {
				localStorage.setItem(utmTags[i].id, utmTags[i].value)
			}
		}
	 }
};

// ------------- QUICK LINKS PAGE 10 -------------
// call Branch
function createLink() {
  // for testing only - replace with user input key
//   var testKey = "key_live_omPdKap615NW52zlTUvXEklayEiTWfyW";
//   branch.init(testKey);

  // var key = document.querySelector("#branch_key");
  // branch.init(key);

  var retrieveMetadata = localStorage.getItem("data");
  var metadataJSON = JSON.parse(retrieveMetadata);

  var retrieveRedirects = localStorage.getItem("redirects");
  var res = retrieveRedirects.slice(1,-1)

  var retrieveDeepviews = localStorage.getItem('passiveDeepviews');
  var deepviewJSON = JSON.parse(retrieveDeepviews);

  console.log(metadataJSON)
  console.log(redirectsJSON)
  console.log(deepviewJSON)

  // final JSON is empty - will contain data obj, but should store everything else as JSON
  $.extend(finalJSON, metadataJSON, res, deepviewJSON);

  console.log("Link data: " + finalJSON)
};

// ------------- QUICK LINKS PAGE 6 -------------
function attribute() {
	var check = document.querySelector('input[name="attribution"]:checked').value;
	
	console.log("no attribution: " + check)
}
