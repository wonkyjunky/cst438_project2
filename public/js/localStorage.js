/*
        user id = username 
        
        ----note temp -- 
        store password too

    */
"use strict";

$(document).ready( async function(){

    if(sessionStorage.getItem('user') != null){
        var user = document.getElementById('UserId1').innerHTML = "Welcome " + sessionStorage.getItem('user') + "!";
        var login = document.getElementById('LoginButton');
        var logout = document.getElementById('LogOutButton');
        login.hidden = true;
        logout.hidden = false;
      } else {
        var user = document.getElementById('UserId1').innerHTML = "";
        
      }
    
      $('#LogOutButton').on('click',function(){
        sessionStorage.clear();
        console.log("here");
        reDirectLogin();
        console.log("here");
      })
    });
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

async function logIn(){
    var user = document.getElementById('username2').value;
    var pass = document.getElementById('password2').value;
    let response = await logInCheck();
    console.log(response);
    var data = {"username": user, "password":pass} 
    if(response.err == "Incorrect password" || response.err == "User does not exist"){
        var responsed = document.getElementById('LoginResponse');
        responsed.innerHTML = response.err;
        } else {
            sessionStorage.setItem('user', user);
            sessionStorage.setItem('pass',pass);
            reDirectHome();
        }
    }


function reDirectHome(){
    location.href = "/";
}

function reDirectLogin(){
    location.href ="login";
}
