"use strict";

$(async () => 
{
	let str = "PASSWORD";
	console.log( str.match(/[A-Z]/) )
	console.log(parseInt('c'))
	if (!str.match(/[a-z]/) )
	{
		console.log("valid")
	}
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
	//return true
	return (password.length > 5 && password.match(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g));
}