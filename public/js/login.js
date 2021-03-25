"use strict";

let LOGIN	= 0;
let CREATE	= 1;
let DELETE	= 2;

$(async () =>
{
	$("#logout-button").hide()
	$("#create-button").click(() =>	{ handle_input(CREATE) });
	$("#login-button").click(() =>	{ handle_input(LOGIN) });
	$("#delete-button").click(() =>	{ handle_input(DELETE)});
});

async function handle_input(type)
{
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
	console.log("line 30");
	if (password.length<5 && password.match(letterNumber)&& password.match(letterNumber2)&&password.match(letterNumber3))
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
		if (password.length <5 || !password.match(letterNumber) || !password.match(letterNumber2)||!password.match(letterNumber3))
		{
			$("#login-response").text("enforcing a simple password rules (minimum length >=6 characters, alphanumeric with at least one special character)");
			return;
		}
		res = await api.add_user();
		break;
	case DELETE:
		res = await api.delete_user();
		break;
	}

	if (res.err)
	{
		console.log(res.err);
		$("#login-response").text(res.err);
	}
	else
	{
		sessionStorage.setItem("user", username);
		sessionStorage.setItem("pass", password);
		location.href = "/";
	}
}