"use strict";

$(async () => 
{
	let logged_in = await is_logged_in();
	if (!logged_in) location.href = "login";

	$("#welcome-banner").text("Welcome " + sessionStorage.getItem("user") + "!");

	$("#lists-button").click(function() { location.href="wishlists" });

	$('#logout-button').click(function() {
		sessionStorage.clear();
		location.href = "login";
	});
	$('#profile-button').click(function() {
		location.href = "profile";
	});
});

async function is_logged_in()
{
	let username = sessionStorage.getItem("user");
	let password = sessionStorage.getItem("pass");

	console.log("username:", username);
	console.log("password:", password);

	if (!username || !password) return false;
	let api = new Api(username, password);

	let res = await api.login();
	if (res.err) return false;

	return true;
}
function validpassword(password){

	if (password.length < 6) return false;

	let nums = 0;
	for (c in password)
	{
		
	}

	var letterNumber = /[0-9]/;
	var letterNumber2 = /[a-z]/;
	var letterNumber3 = /[A-Z]/;
	var letterNumber4 = /[!@#$%^&*()]/;
	return !(password.length<5 || password.match(letterNumber)|| password.match(letterNumber2)||password.match(letterNumber3)||password.match(letterNumber4));
}