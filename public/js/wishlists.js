"use strict";

let username2 = sessionStorage.getItem("user");
let password2 = sessionStorage.getItem("pass");
let userid2 = 0;

$.get("/api/user", {username: username2}, (data) => {
	userid2 = data.user.id;
});

$.get("/api/list", { username: username2 }, (data) => {
  console.log(data);
  for (let i = 0; i < data.lists.length; i++) {
    $("#wishlists").append(`     
			<div class="col-sm-3 m-2" id="list-${i}>
				<div class="container">
					<div class="row">
						<h1 class="col text-center">
							${data.lists[i].label}
						</h1>
					</div>
					<div class="row pt-2 pl-5 pr-5">
						<a href="/wishlistdetails?listid=${data.lists[i].id}" role="button" class="btn btn-secondary mb-1">View List</a>
						<button id="${data.lists[i].label}" class="btn btn-danger mt-1" onclick="delete_list(${data.lists[i].id}, this.id)">Delete</button>
					</div>
				</div>
			</div>

		`)
	}
})

$('#create').on('click', function(e) {
	var label = document.getElementById('label').value;
	var data = {"username": username2, "password":password2, "label": label};
	if (confirm(`You want to create ${label}?`)){
			api.add_list(label);
			window.location.href = "/wishlists";
	}
	});
$('#editwishlist').on('click',function(e){
	modal.style.display = "block";
});

function delete_list(id, label) {
  console.log(label);
  let deleteData = { username: username2, password: password2, listid: id };
  //   $.post_json("/api/deletelist", deleteData, (res) => {
  //     console.log(res);
  //     window.location.href = "/wishlists";
  //   });
  if (confirm(`You want to delete ${label}?`)) {
    api.delete_list(id);
    window.location.href = "/wishlists";
  }
}
