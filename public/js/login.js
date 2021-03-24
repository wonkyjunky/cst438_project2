async function logIn()
{
	var username = $("#username-input").val();
	var password = $("#password-input").val();

	if (!username)
	{
		$("#LoginResponse").text("Username must not be empty");
		return;
	}

	if (!password)
	{
		$("#LoginResponse").text("Password must not be empty");
		return;
	}

	let api = new Api(username, password);
	let res = await api.login();

	if(res.err)
	{
		$("#LoginResponse").text(response.err);
	} else {

		sessionStorage.setItem("user", username);
		sessionStorage.setItem("pass", password);
		location.href = "/";
	}
}
