"use strict";

$(async () => {
  if (checkLoginValidation() == true) {
    if (document.getElementById("UserId1") != null) {
      var user = (document.getElementById("UserId1").innerHTML =
        "Welcome " + sessionStorage.getItem("user") + "!");
    }
    console.log(sessionStorage.getItem("user"));
    var login = document.getElementById("LoginButton");
    var logout = document.getElementById("LogOutButton");
    login.hidden = true;
    logout.hidden = false;
  } else {
    var user = (document.getElementById("UserId1").innerHTML = "");
  }
  var count = 0;

	console.log("logged in")
	
	  $('#LogOutButton').on('click',function(){
		sessionStorage.clear();
		reDirectLogin();
	});
	
});

async function is_logged_in() {
  let username = sessionStorage.getItem("username");
  let password = sessionStorage.getItem("password");

  if (!username || !password) return false;

  return true;
}

async function getAll() {
  let DB = new Api("", "");
  let resp = await DB.get_users();
  return resp;
}

async function logInCheck() {
  var user = document.getElementById("username-input").value;
  var pass = document.getElementById("password-input").value;

  let DB = new Api(user, pass);

  let resp = await DB.login();
  console.log(resp);
  return resp;
}

async function logIn() {
  var user = document.getElementById("username-input").value;
  var pass = document.getElementById("password-input").value;
  let response = await logInCheck();
  console.log(response);
  var data = { username: user, password: pass };
  if (
    response.err == "Incorrect password" ||
    response.err == "User does not exist"
  ) {
    var responsed = document.getElementById("LoginResponse");
    responsed.innerHTML = response.err;
  } else {
    sessionStorage.setItem("user", user);
    sessionStorage.setItem("pass", pass);
    reDirectHome();
  }
}

function checkLoginValidation() {
  console.log(window.location.href);
  if (
    sessionStorage.getItem("user") == undefined &&
    window.location.href != "http://127.0.0.1:5000/login"
  ) {
    setTimeout(function () {
      reDirectLogin();
    }, -1);
    return false;
  }
  return true;
}
function reDirectHome() {
  location.href = "/";
}
function reDirectLogin() {
  location.href = "login";
}
