
var user;
var pass;
var api

$(async () =>
{
    user = sessionStorage.getItem('user');
    pass = sessionStorage.getItem('pass');

    api = new Api(user, pass);

    $("#delete-account-button").click(() =>
    {
        if (confirm("Are you sure"))
        {
            api.delete_user();
            location.href="login";
        }
    });
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


console.log("test");

function saveUserChange(){
    var username = document.getElementById('usernameEdit').value;
    var password = document.getElementById('passwordEdit').value;
    if(pass == password){
        let api = new Api(user,pass);
        api.update_user(username, password);
        console.log("updated");
        location.href = "/login";
    }
}
function changeUserPass(){
    var oldPass = document.getElementById('currpassword').value;
    var newPass = document.getElementById('newpassword').value;
    console.log("test");
    if(oldPass == pass){
        if(validpassword(newPass)){
        console.log("here");
        let api = new Api(user,pass);
        api.update_user(user, newPass);
        console.log("updated");
        location.href = "/login";
        } else {
            console.log("didnt meet reqs");
        }
    }
}
function deleteAccount(){
    let api = new Api(user,pass);
    api.delete_user();
    location.href = "/login";
}
