$('.submitAccount').on('click', function(e) {
    console.log("Debug");
})

async function Con(){
    var user = document.getElementById('user').value;
    var pass = document.getElementById('pass').value;
    Db = new Api(user,pass);

    let resp = await Db.add_user();
    if(resp != undefined){
        console.log(resp);
        if(resp.msg != "successfully created user"){
            let response = document.getElementById('response');
            response.innerHTML += resp.err;
         } else {
            alert("Account created...Redirecting");
            setTimeout('',3000);
            reDirect();
         }
    } 
}

function reDirect(){
    location.href = "/login";
}
