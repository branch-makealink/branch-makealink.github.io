console.log('This would be the main JS file.');
$(document).ready(function(){  
	var selection = document.querySelector('input[name="quicklinkradios"]:checked').value;
	console.log(selection);	
	document.getElementsByClassName("key-value-form-container")[0].style.display = 'none';
});

function quickLinkTypeSelection() {
  var selection = document.querySelector('input[name="quicklinkradios"]:checked').value;
  console.log(selection);	
}

function quickLinkNext() {
  var selection = document.querySelector('input[name="quicklinkradios"]:checked').value;
  console.log(selection);
  if (selection == "App") {
  	window.location = "quick-links-2.html";
  }

  if (selection == "Mobile Web") {
  	window.location = "quick-links-3.html";
  }
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