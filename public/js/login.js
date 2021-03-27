"use strict";

const LOGIN = 0;
const CREATE = 1;

// page has loaded
$(async () =>
{
	// hiding all of the ui elements the use can't use
	$("#lists-button").hide()
	$("#logout-button").hide()
	$("#profile-button").hide()

	// handlers for given input
	$("#create-button").click(() => { handle_input(CREATE) });
	$("#login-button").click(() => { handle_input(LOGIN) });
});

/**
 * Handles input on login page
 * 
 * @param	type	type of user action (login or account creation)
 */
async function handle_input(type)
{
	var username = $("#username-input").val();
	var password = $("#password-input").val();

	// notify user if there is missing credentials
	if (!username)
	{
		alert("Username must not be empty!");
		return;
	}

	if (!password)
	{
		alert("Password must not be empty!");
		return;
	}

	// make connection to api
	let api = new Api(username, password);
	let res;

	switch (type)
	{
	case LOGIN:
		// attempt to authenticate the user
		res = await api.login();
		break;

	case CREATE:
		// check if password meets criteria, if not exit
		if (!validpassword(password))
		{
			alert("Password must be at least 6 characters long and contain 1 special character");
			break;
		}
		// attempt to create user
		res = await api.add_user();
		break;
	}

	// notify user of any errors and exit if there is one
	if (res.err)
	{
		alert(res.err);
		return;
	}

	// store credentials and redirect to home pagee
	sessionStorage.setItem("user", username);
	sessionStorage.setItem("pass", password);
	location.href = "/";
}