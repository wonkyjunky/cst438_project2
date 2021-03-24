$(async () => {
	var user = document.getElementById('UserId1').innerHTML = "Welcome " + sessionStorage.getItem('user') + "!";
	console.log(sessionStorage.getItem('user'));
	var login = document.getElementById('LoginButton');
	var logout = document.getElementById('LogOutButton');
	login.hidden = true;
	logout.hidden = false;
});