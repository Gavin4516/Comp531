var displayName; //store the display name element
var email; // store the email element 
var tel; // store the phone number element
var zip; // store the zip code element
var pass; // store the password element
var passConfirm; //store the password confirmation element

var cur_displayName; //current display name
var cur_email; // current email address
var cur_tel; //current phone number 
var cur_zip; //current zip code
var cur_pass; // current password

var update_displayName; //display name that needs to be updated
var update_email; //email address that needs to be updated
var update_tel; //phone number that needs to be updated
var update_zip; //zip code that needs to be updated
var update_pass; // password that needs to be updated

var correctMsg; //display correct message
var wrongMsg; //display wrong message

var correct_result; //correct output
var wrong_result; // wrong ouput
var updateBtn; //the update button
window.onload = function() {
	displayName = document.getElementById("display-name");
	email = document.getElementById("email-address");
	tel = document.getElementById("phone-number");
	zip = document.getElementById("zip-code");
	pass = document.getElementById("password");
	passConfirm = document.getElementById("password-confirmation");


	update_displayName = "";
	update_email = "";
	update_tel = "";
	update_zip = "";
	update_pass = "";

	cur_displayName = displayName.parentElement.nextElementSibling.innerText;
	cur_email = email.parentElement.nextElementSibling.innerText;
	cur_tel = tel.parentElement.nextElementSibling.innerText;
	cur_zip = zip.parentElement.nextElementSibling.innerText;
	cur_pass = pass.parentElement.nextElementSibling.innerText;

	correct_result = document.getElementById("correct-result");
	wrong_result = document.getElementById("wrong-result");

	updateBtn = document.getElementById("update-btn");
	updateBtn.onclick = function() {
		document.getElementById("correct-result").innerHTML = "";
		document.getElementById("wrong-result").innerHTML = "";
		correctMsg = "";
		wrongMsg = "";
		if (validation()) {
			correct_result.innerHTML = correctMsg;
			updateProfile();
			updateCurValue();
			resetValue();
		} else if (wrongMsg != "") {
			wrong_result.innerHTML = wrongMsg;
		}
	}
}
//validate input values
function validation() {
	if (displayName.value != "") {
		var pattern = /^[A-Za-z][A-Za-z0-9]*$/;
		if (pattern.test(displayName.value)) {
			update_displayName = displayName.value;
			correctMsg += "Display Name has been changed from" + cur_displayName + " to " + displayName.value + "<br>";
		} else {
			wrongMsg += "*Account should not start with a number!"
		}
	}
	if (email.value != "") {
		var pattern = /\S+@\S+\.\S+/;
		if (pattern.test(email.value)) {
			update_email = email.value;
			correctMsg += "Email address has been changed from" + cur_email + " to " + email.value + "<br>";
		} else {
			wrongMsg += "*Email address pattern is incorrect! Please follow pattern a@b.c<br>";
		}
	}
	if (tel.value != "") {
		var pattern = /\d{3}-\d{3}-\d{4}/;
		if (pattern.test(tel.value)) {
			update_tel = tel.value;
			correctMsg += "Phone number has been changed from" + cur_tel + " to " + tel.value + "<br>";
		} else {
			wrongMsg += "*Phone number pattern is incorrect! Please follow pattern 123-456-7890<br>";
		}
	}
	if (zip.value != "") {
		var pattern = /^(([0-9]{5})|([0-9]{5})+\-+([0-9]{4}))$/;
		if (pattern.test(zip.value)) {
			update_zip = zip.value;
			correctMsg += "Zip code has been changed from" + cur_zip + " to " + zip.value + "<br>";
		} else {
			wrongMsg += "*Zip code pattern is incorrect! Please follow pattern 12345 or 12345-1234<br>";
		}
	}
	if (pass.value != "" || passConfirm.value != "") {
		if (pass.value == passConfirm.value) {
			update_pass = pass.value;
			correctMsg += "Password has been changed from" + cur_pass + " to " +pass.value;
		} else {
			wrongMsg += "*Two password inputs do not match!"
		}
	}
	if (wrongMsg == "") {
		return true;
	}
	return false;
}

// update the profile values
function updateProfile() {
	if(update_displayName != ""){
		displayName.parentElement.nextElementSibling.innerText = update_displayName;
		update_displayName = "";
	}
	if(update_email != ""){
		email.parentElement.nextElementSibling.innerText = update_email;
		update_email = "";
	}
	if(update_tel != ""){
		tel.parentElement.nextElementSibling.innerText = update_tel;
		update_tel= "";
	}
	if(update_zip != ""){
		zip.parentElement.nextElementSibling.innerText = update_zip;
		update_zip = "";
	}
	if(update_pass != ""){
		pass.parentElement.nextElementSibling.innerText = update_pass;
		update_pass = "";
	}
}

// update current values
function updateCurValue() {
	cur_displayName = displayName.parentElement.nextElementSibling.innerText;
	cur_email = email.parentElement.nextElementSibling.innerText;
	cur_tel = tel.parentElement.nextElementSibling.innerText;
	cur_zip = zip.parentElement.nextElementSibling.innerText;
	cur_pass = pass.parentElement.nextElementSibling.innerText;
}

// reset all the inputs
function resetValue() {
	displayName.value = "";
	email.value = "";
	tel.value = "";
	zip.value = "";
	pass.value = "";
	passConfirm.value = "";
}
