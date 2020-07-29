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
  // "tags": [tags],
  // campaign: campaign,
  // channel: channel,
  // feature: feature
	data : {
		// "$ios_url": localStorage.getItem("$ios_url"),
		// "$android_url": localStorage.getItem("$android_url"),
    // "$desktop_url": localStorage.getItem("$desktop_url"),
    // $web_only: true,
    // $alias: alias,
    // $marketing_title: linkTitle,
	}
};

function storeLinkData(json) {
  return localStorage.setItem("final", JSON.stringify(json));
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

    var rewrite = JSON.parse(localStorage.getItem("final"))
    if (rewrite.data['$web_only'] !== null) {
      delete rewrite.data['$web_only']
      storeLinkData(rewrite);
    }

  } else if (selection == "Mobile Web") {
	  button.innerHTML = "Build Web Only Link";
	  button.style.right = "-870px";
	  finalJSON.data["$web_only"] = true;
    storeLinkData(finalJSON);
	  
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
  // store keys
  for (var i = 0; i < 3; i++) {
    var keyInput = document.querySelectorAll('input[name="key"]')[i].value;
    var valueInput = document.querySelectorAll('input[name="value"]')[i].value;

    if (keyInput !== "" && valueInput !== "") {
      finalJSON.data[keyInput] = valueInput;
      storeLinkData(finalJSON)
    }
  }
};

// make finalJSON writable
var rewrite = JSON.parse(localStorage.getItem("final"))

// ------------- QUICK LINKS PAGE 3 -------------
// Either option leads to next page
$(function() {
	console.log(localStorage);
});

function skip() {
  var noRedirects = document.querySelector('input[name="radios"]:checked');

  if (noRedirects == null) {
    alert("Please select an option - this determines where a user will go if they don't have the app installed.")
    location.reload();

  } else if (noRedirects.value == 'Mobile Web') {
    next();

  } else {
    window.location.href = "https://branch-makealink.github.io/quick-links-5.html"
}};

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
        
        rewrite.data[redirects[i].id] = redirects[i].value;
        storeLinkData(rewrite);       
      }
		}
	}
};

// ------------- QUICK LINKS PAGE 5 -------------
// record deepview keys, change button text
function addDeepviews() {
  var selection = document.querySelector('input[name="radios"]:checked').value;

  if (selection == "Yes") {

    rewrite.data["$ios_deepview"] = "branch_default";
    rewrite.data["$android_deepview"] = "branch_default";
    rewrite.data["$desktop_deepview"] = "branch_default";
    storeLinkData(rewrite);
  } else {
    delete rewrite.data["$ios_deepview"]
    delete rewrite.data["$android_deepview"]
    delete rewrite.data["$desktop_deepview"]
    storeLinkData(rewrite);
  } 
};

// ------------- QUICK LINKS PAGE 6 -------------
function attribute() {
  var check = document.querySelector('input[name="attribution"]:checked').value;

  if (check == "true") {
    rewrite.data["$deeplink_no_attribution"] = true;
    storeLinkData(rewrite);
  } else {
    delete rewrite.data["$deeplink_no_attribution"];
    storeLinkData(rewrite);
  }
};

// ------------- QUICK LINKS PAGE 7 ------------- 
function setTitle() {
	if (document.location.href.includes("7")) {
		var linkTitle = document.getElementById("$marketing_title").value;
  		if (linkTitle !== "") {
        rewrite.data["$marketing_title"] = linkTitle;
        storeLinkData(rewrite);
  		}
	 }
};

// ------------- QUICK LINKS PAGE 8 -------------
function setAlias() {
	if (document.location.href.includes("8")) {
		var alias = document.getElementById("$alias").value;
		if (alias !== "") {
      rewrite["alias"] = alias;
      storeLinkData(rewrite);
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
      rewrite[utmTags[i].id] = utmTags[i].value;
			storeLinkData(rewrite);
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

  rewrite["tags"] = analyticsTags;
  storeLinkData(rewrite);
};

// ------------- QUICK LINKS PAGE 10 -------------
// store key
function holdBranchKey() {
  if (document.getElementById("branch_key").value && document.getElementById("branch_key").value.includes("key_")) { 
    localStorage.setItem("branchkey", document.getElementById("branch_key").value)

  } else {
    alert("Please enter your Branch key to make the link!")
    location.reload();
  }
}

// ------------- QUICK LINKS PAGE 11 -------------
// call Branch
function createLink() {
  var branchKey = localStorage.getItem("branchkey");
  branch.init(branchKey);

  branch.link(rewrite, function(err, link) {
    if (err == null) {
      document.getElementById("branchLink").value = link;
      
      var viewLinkData = document.getElementById('viewLinkData');
      viewLinkData.href = link + "?debug=1";
      console.log(viewLinkData.href)
    } else {
      console.log(err, link)
      document.getElementById("branchLink").value = err;
    }
  })

  localStorage.clear();
};

