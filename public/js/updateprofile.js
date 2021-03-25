let user = sessionStorage.getItem('user');
let pass = sessionStorage.getItem('pass');

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
    api.deleteAccount();
    location.href = "/login";
}