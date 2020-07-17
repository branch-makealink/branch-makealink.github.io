console.log('This would be the main JS file.');
$(document).ready(function(){  
	var selection = document.querySelector('input[name="quicklinkradios"]:checked').value;
	console.log(selection);	
	document.getElementsByClassName("key-value-form-container")[0].style.display = 'none';
});

function quickLinkTypeSelection() {
  var selection = document.querySelector('input[name="initRadios"]:checked').value;
  console.log(selection);

  if (selection == "App") {
  	document.querySelector('#initPageButton').innerHTML = "Build Deep Link";
  }	else {
  	document.querySelector('#initPageButton').innerHTML = "Build Web Only Link";
  }
};


// saving this in case we plan to send user ahead a few pages 
function quickLinkNext() {
  var selection = document.querySelector('input[name="quicklinkradios"]:checked').value;
  console.log(selection);

  page = parseInt(document.location.href.slice(-6,-5),10);

  if (selection == "App" || selection == "Mobile Web") {
  	page += 1;
  	window.location = "quick-links-"+ page +".html";
  }

}

function next() {
	page = parseInt(document.location.href.slice(-6,-5),10);
	page += 1;

	window.location = "quick-links-" + page + ".html";
}

function hideForm(){
  document.getElementsByClassName("key-value-form-container")[0].style.display = 'none';
}

function showForm(){
    document.getElementsByClassName("key-value-form-container")[0].style.display = 'block';
}

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});
