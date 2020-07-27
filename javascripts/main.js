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
		// "$ios_url": localStorage.getItem("$ios_url"),
		// "$android_url": localStorage.getItem("$android_url"),
		// "$desktop_url": localStorage.getItem("$desktop_url"),
	}
};

function createData() {
  for (var i = 0; i < localStorage.length; i++) {
    finalJSON.data[localStorage.key(i)] = localStorage.getItem(localStorage.key(i));
  }
}

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

// Go back
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
	  localStorage.removeItem('webonly');

  } else if (selection == "Mobile Web") {
	  button.innerHTML = "Build Web Only Link";
	  button.style.right = "-870px";
	  localStorage.webonly = true;
	  
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
var formDisplay = document.getElementsByClassName("key-value-form-container")[0];

$(document).ready(function(){ 

  if (formDisplay !== undefined) {
    formDisplay.style.display = 'none';
  } else {
    console.log("Current link data below:")
  }
});

function hideForm() {
  formDisplay.style.display =
    "none";
}

function showForm() {
  formDisplay.style.display =
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
    var valueInput = valueData[i];

    if (keyInput.value && valueInput.value) {
      localStorage.setItem(keyInput.value, valueInput.value)
    }

    // maybe better to store into json, then parse and drop brackets to insert into final JSON
  };
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
      if ((redirects[i].value.includes(".com")) || 
        (redirects[i].value.includes(".net")) || 
        (redirects[i].value.includes(".io"))) {

        localStorage.setItem([redirects[i].id], redirects[i].value)

      }
		}
	}
  console.log(localStorage);
};

// store link data in data json
// store rest as strings
// concat strings with parsed data json 
// store all into JSON
// extract from localStorage and use as deeplinkData

// ------------- QUICK LINKS PAGE 5 -------------
// record deepview keys, change button text
function addDeepviews() {
  var selection = document.querySelector('input[name="radios"]:checked').value;

  if (selection == "Yes") {
    localStorage.setItem('ios_dv', "branch_default");
    localStorage.setItem('android_dv', "branch_default");
    localStorage.setItem('desktop_dv', "branch_default");
  } else {
     localStorage.removeItem("ios_dv");
     localStorage.removeItem("android_dv");
     localStorage.removeItem("desktop_dv");
  } 
};

// ------------- QUICK LINKS PAGE 6 -------------
function attribute() {
  var check = document.querySelector('input[name="attribution"]:checked').value;
  
  localStorage.setItem("no_attribution", check)
  console.log("no attribution: " + check)
}

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
  var campaign = document.getElementById("campaign");
	var channel = document.getElementById("channel");
	var feature = document.getElementById("feature");

	var utmTags = new Array(campaign, channel, feature);

	for (var i = 0; i < utmTags.length; i++) {
		if (utmTags[i].value !== "") {
			localStorage.setItem(utmTags[i].id, utmTags[i].value)
		}
	}

  var analyticsTags = new Array;
  var tags = document.getElementsByClassName("tags")

  for (var t = 0; t < 6; t++) {
    if (tags[t].value !== "" || tags[t].value !== undefined) {
      analyticsTags[t] = tags[t].value;
    }
  }

  // remove empty tags
  analyticsTags = analyticsTags.filter(entry => entry.trim() != '');

  localStorage.setItem("tags", JSON.stringify(analyticsTags));
};

// ------------- QUICK LINKS PAGE 10 -------------
// call Branch
function createLink() {
  // for testing only - replace with user input key
//   var testKey = "key_live_omPdKap615NW52zlTUvXEklayEiTWfyW";
//   branch.init(testKey);

  // var key = document.querySelector("#branch_key");
  // branch.init(key);

  // pull tags
  var tagsArray = JSON.parse(localStorage.getItem("tags"));
  finalJSON.tags = tagsArray;

  // pull UTM tags
  if (localStorage.getItem('campaign') !== undefined) { finalJSON.campaign = localStorage.getItem('campaign')}
  if (localStorage.getItem('channel') !== undefined) { finalJSON.channel = localStorage.getItem('channel')}
  if (localStorage.getItem('feature') !== undefined) { finalJSON.feature = localStorage.getItem('feature')}

  // Nested data object
  // add redirects
  if (localStorage.getItem('ios') !== undefined) { finalJSON["$ios_url"] = localStorage.getItem('ios')}
  if (localStorage.getItem('android') !== undefined) { finalJSON["$android_url"] = localStorage.getItem('android')}
  if (localStorage.getItem('desktop') !== undefined) { finalJSON["$desktop_url"] = localStorage.getItem('desktop')}

  // add deepviews
  if (localStorage.getItem('ios_dv') !== undefined) { finalJSON["$ios_deepview"] = localStorage.getItem('ios_dv')}
  if (localStorage.getItem('android_dv') !== undefined) { finalJSON["$android_deepview"] = localStorage.getItem('android_dv')}
  if (localStorage.getItem('desktop_dv') !== undefined) { finalJSON["$desktop_deepview"] = localStorage.getItem('desktop_dv')}

  console.log(localStorage)
  console.log(finalJSON)
};

