"use strict";

let LOGIN	= 0;
let CREATE	= 1;
let EDIT	= 2;
let e = -1;

$(async () =>
{
	$("#lists-button").hide()
	$("#logout-button").hide()
	$("#profile-button").hide()
	
	$("#create-button").click(() =>	{ handle_input(CREATE) });
	$("#login-button").click(() =>	{ handle_input(LOGIN) });
	$("#delete-button").click(() =>	{ handle_input(EDIT)});
});

function validpassword(password)
{
	if (password.length < 6) return false;
	let specials = "`~!@#$%^&*()-_=+[{]}\\|'\":;?/>.<,";
	
	for (let i = 0; i < password.length; i++)
	{
		for (let j = 0; j < specials.length; j++)
		{
			if (password[i] == specials[j])
			{
				return true;
			}
		}
	}
	return false
}

async function handle_input(type)
{
	e = -1;
	var username = $("#username-input").val();
	var password = $("#password-input").val();
	$("#login-response").empty()

	if (!username)
	{
		$("#username-input").addClass(".has-error");
		$("#login-response").text("Username must not be empty");
		return;
	}

	let api = new Api(username, password);
	let res;

	switch (type)
	{
	case LOGIN:
		res = await api.login();
		break;
	case CREATE:
		if (!validpassword(password))
		{
			$("#login-response").text("enforcing a simple password rules (minimum length >=6 characters, alphanumeric with at least one special character)");
			return;
		}
		res = await api.add_user();
		break;
	case EDIT:
		res = await api.login();
		e = 5;
		break;
	}

	if (res.err)
	{
		console.log(res.err);
		$("#login-response").text(res.err);
	}
	else if(e == 5){
		sessionStorage.setItem("user", username);
		sessionStorage.setItem("pass", password);
		location.href = "/profile";
	}
	else
	{
		sessionStorage.setItem("user", username);
		sessionStorage.setItem("pass", password);
		location.href = "/";
	}
}