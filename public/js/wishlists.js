"use strict";

let username2 = sessionStorage.getItem("user");
let password2 = sessionStorage.getItem("pass");
var api = new Api(username2, password2);
let userid2 = 0;
let userId;

$.get("/api/user", {username: username2}, (data) => {
	userid2 = data.user.id;
});

$.get("/api/list", { username: username2 }, (data) => {
  console.log(data);
  for (let i = 0; i < data.lists.length; i++) {

    $("#wishlists").append(`
			<div class="col-sm-3 m-2" id="list-${i}">
				<div class="container">
					<div class="row">
						<h1 class="col text-center">
							${data.lists[i].label}
						</h1>
					</div>
					<div class="row pt-2 pl-5 pr-5">
						<a href="/wishlistdetails?listid=${data.lists[i].id}" role="button" class="btn btn-secondary mb-1">View List</a>
						<button id="editwishlist" data-toggle="modal" data-target="#edit-list-modal" class="btn btn-secondary" onclick="get_id(${data.lists[i].id})"">Edit Wishlist</button>
						<button id="wish-list-${i}" class="btn btn-danger mt-1">Delete</button>
					</div>
				</div>
			</div>

		`)

		$(`#wish-list-${i}`).click(async function() {
			console.log(data.lists[i].userid);
			let res = await api.get_users(username2)
			console.log(res);
			res = await api.delete_list(data.lists[i].id);
			if (res.err) console.error(res.err);
			$(`#list-${i}`).remove()
		});
	}

})

$('#create').on('click', function(e) {
	var label = document.getElementById('label').value;
	var data = {"username": username2, "password":password2, "label": label};
	if (confirm(`You want to create ${label}?`)){
			var api = new Api(data.username, data.password);
			api.add_list(label);
			window.location.href = "/wishlists";
	}
	});
$('#editwishlist').on('click',function(e){
	modal.style.display = "block";
});

$('#saveChange').on('click',function(e){
	var label = document.getElementById('labelSave').value;
	var data = {"username": username2, "password":password2, "label": label};
	console.log(label);
	if(confirm(`You want to change the wishlist name to ${label}?`)){
		var api = new Api(data.username, data.password);
		api.update_list(userId,label);
		window.location.href = "/wishlists";
	}
})

function delete_list(id, label) {
  console.log(label);
  let deleteData = { "username": username2, "password": password2, listid: id };
  if (confirm(`You want to delete ${label}?`)) {
	var api = new Api(deleteData.username, deleteData.password);
    api.delete_list(id);
    window.location.href = "/wishlists";
  }
}

function get_id(id){ userId = id; }
