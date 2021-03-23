$(document).ready( async function(){
    let loggedIn = false;
    
    if(loggedIn == true){

    }
    
})

async function getAll(){
    let DB = new Api("","");
    let resp = await DB.get_users();
    return resp;
}

async function logInCheck(){
    var user = document.getElementById('username2').value;
    var pass = document.getElementById('password2').value;

    let DB = new Api(user,pass);

    let resp = await DB.login()
    console.log(resp);
    return resp;
}

function logIn(){
    var user = document.getElementById('username2').value;
    let response = logInCheck();
    if(response == true){
        loggedIn == true;
        localStorage.setItem('Logged', user);
    }

}