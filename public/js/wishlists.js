"use strict";

// get credentials from session storage
var username2 = sessionStorage.getItem("user");
var password2 = sessionStorage.getItem("pass");
// create api function
var api = new Api(username2, password2);

var userId;

// updating lists
$.get("/api/list", { username: username2 }, (data) =>
{
	console.log(data);
	for (let i = 0; i < data.lists.length; i++)
	{

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

		$(`#wish-list-${i}`).click(async function ()
		{
			// confirm the user wants to delete the list
			if (!confirm("Are you sure?")) return;
			
			// get user from db
			let res = await api.get_users(username2);

			// alert user of any errors
			if (res.err)
			{
				alert(res.err);
				return;
			}

			// attempt to delete list
			res = await api.delete_list(data.lists[i].id);

			// alert user of any errors
			if (res.err)
			{
				alert(res.err);
				return;
			}

			// delete the div
			$(`#list-${i}`).remove()
		});
	}

})

// click listener for new wishlist
$('#create').on('click', async () =>
{
	// get label
	let label = $("#label").val()

	// attempt to add list to db
	let res = await api.add_list(label);

	// notify user of any errors
	if (res.err)
	{
		alert(res.err);
		return;
	}

	// reload page
	window.location.href = "/wishlists";
});

// click listener for edit wish list
$('#editwishlist').on('click', async () =>
{
	modal.style.display = "block";
});

// click listener for modal save edit
$('#saveChange').on('click', async () =>
{
	// get label
	let label = $("#labelSave").val();

	// attempt to update list
	let res = api.update_list(userId, label);

	// notify user of any errors
	if (res.err)
	{
		alert(res.err);
		return;
	}

	// reload page
	window.location.href = "/wishlists";
})

function get_id(id)
{
	userId = id;
}
