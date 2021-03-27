"use strict";

// page has loaded
$(async () => 
{
	// if the user is not logged in, redirect them to login page
	let logged_in = await is_logged_in();
	if (!logged_in) location.href = "login";

	// adds welcome text to top of page
	$("#welcome-banner").text("Welcome " + sessionStorage.getItem("user") + "!");

	// redirects user to wishlists page
	$("#lists-button").click(function() { location.href="wishlists" });

	// logs out user and clears credentials
	$('#logout-button').click(function() {
		sessionStorage.clear();
		location.href = "login";
	});

	// redirects user to their profile page
	$('#profile-button').click(function() {
		location.href = "profile";
	});
});

/**
 * Checks if the current user is logged in and valid
 */
async function is_logged_in()
{
	// get credentials from session storage
	let username = sessionStorage.getItem("user");
	let password = sessionStorage.getItem("pass");
	if (!username || !password) return false;

	// create api object
	let api = new Api(username, password);

	// attempt to authenticate user
	let res = await api.login();
	
	// if there was an error
	if (res.err) return false;

	// user is logged in
	return true;
}
