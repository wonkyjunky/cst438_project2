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

	if (!password)
	{
		$("#login-response").text("Password must not be empty");
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