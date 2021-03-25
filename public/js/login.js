"use strict";

let LOGIN	= 0;
let CREATE	= 1;
let EDIT	= 2;
let e = -1;

$(async () =>
{
	$("#logout-button").hide()
	$("#create-button").click(() =>	{ handle_input(CREATE) });
	$("#login-button").click(() =>	{ handle_input(LOGIN) });
	$("#delete-button").click(() =>	{ handle_input(EDIT)});
});

async function handle_input(type)
{
	e = -1;
	var username = $("#username-input").val();
	var password = $("#password-input").val();

	if (!username)
	{
		$("#username-input").addClass(".has-error");
		$("#login-response").text("Username must not be empty");
		return;
	}
	var letterNumber = /[0-9]/;
	var letterNumber2 = /[a-z]/;
	var letterNumber3 = /[A-Z]/;
	var letterNumber4 = /[!@#$%^&*()]/;
	console.log("line 30");
	if (password.length<5 || password.match(letterNumber)|| password.match(letterNumber2)||password.match(letterNumber3)||password.match(letterNumber4))
	{
		$("#login-response").text("Password must meet minnimum requirments");
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
		if (password.length<5 || password.match(letterNumber)|| password.match(letterNumber2)||password.match(letterNumber3)||password.match(letterNumber4))
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
	if(e == 5){
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