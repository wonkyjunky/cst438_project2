"use strict";

$(async () =>
{
	$("#logout-button").hide()
	$("#create-button").click(() => { handle_input(true) });
	$("#login-button").click(() => { handle_input(false) });
});

async function handle_input(create)
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

	if (create)
	{
		res = await api.add_user();
	}
	else
	{
		res = await api.login();
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