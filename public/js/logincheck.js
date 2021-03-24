"use strict";

$(async () => 
{
	let logged_in = await is_logged_in();
	if (!logged_in) location.href = "login";
	
	$('#LogOutButton').click(function() {
		sessionStorage.clear();
		reDirectLogin();
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
