
var user;
var pass;
var api

$(async () => 
{
	// get credentials from session storage
	user = sessionStorage.getItem('user');
	pass = sessionStorage.getItem('pass');

	// create api object
	api = new Api(user, pass);

	// listener for delete button to delete user account
	$("#delete-account-button").click(async () =>
	{
		if (confirm("Are you sure")) {
			// attempt to delete user
			let res = await api.delete_user();
			// notify user of any errors
			if (res.err)
			{
				alert(res.err);
				return;
			}
			// redirect to login page
			location.href = "login";
		}
	});
});

/**
 * Checks if a password meets criteria
 * 
 * @param	password	the password to examine
 * 
 * @return	bool value, true if password is valid
 */
 function validpassword(password)
 {
	 if (password.length < 6) return false;
	 // special characters that are allowed in passwords
	 let specials = "`~!@#$%^&*()-_=+[{]}\\|'\":;?/>.<,";
 
	 for (let i = 0; i < password.length; i++) {
		 for (let j = 0; j < specials.length; j++) {
			 // check every password character for special as at least one is required
			 if (password[i] == specials[j]) {
				 return true;
			 }
		 }
	 }
	 // no specials found, invalid password
	 return false;
 }

 /**
  * Updates user with new username
  */
async function saveUserChange()
{
	let username = $("#usernameEdit").val();
	let password = $("#passwordEdit").val();

	// if password matches current
	if (pass == password)
	{
		let res = await api.update_user(username, password);
		if (res.err)
		{
			alert(res.err);
			return;
		}
		location.href = "/login";
	}
}

/**
 * Updates user with new password
 */
async function changeUserPass()
{
	let oldPass = $("#currpassword").val();
	let newPass = $("#newpassword").val()

	// if correct password was put in
	if (oldPass == pass)
	{
		// check if new 
		if (!validpassword(newPass))
		{
			alert("Password must be at least 6 characters and contain 1 special character");
			return;
		}

		// attempt to update user
		let res = await api.update_user(user, newPass);

		// notify user of any errors
		if (res.err)
		{
			alert(res.err);
			return;
		}

		// redirect to login page
		location.href = "/login";
	}
}

async function deleteAccount()
{
	// attempt to delete user
	let res = await api.delete_user();

	// notify user of any errors
	if (res.err)
	{
		alert(res.err);
		return;
	}

	// redirect to login page
	location.href = "/login";
}
