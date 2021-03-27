"use strict";

var api;
var rec_div = $("#recommended-items");
var list_div = $("#list-items");
var listid = parseInt(list_div.attr("listid"));
var list_item_labels = {};
var itid;

/**
 * Retrieves items from current list and updates page
 */
async function get_list()
{
	// erases current list so there is no doubling
	list_div.empty();

	// get list info
	let res = await api.get_list(listid);

	// if failed, notify user and exit
	if (res.err)
	{
		alert(res.err);
		return;
	}

	// set the text to the current list's label
	$("#list-label").text(res.list.label);

	// get items for list
	res = await api.get_items(listid);

	// if failed notify user
	if (res.err)
	{
		alert(res.err);
		return;
	}


	list_item_labels = {};

	var l = res.items;
	for (let i = 0; i < l.length; i++)
	{
		// add all items to page
		list_item_labels[l[i].label] = true;
		list_div.append(`
			<div id="list-item-${i}" class="col-sm-3 border rounded m-1 p-2">
				<div class="container">
					<div class="row m-1">
						<img src="${l[i].img}" class="img-thumbnail" height="105" width="150" alt="Item Image">
					</div>
					<div class="row text-center m-4"><h3>${l[i].label}</h1></div>
					<div class="row">
						<div class="col">
							<button id="displayitem" data-toggle="modal" data-target="#display-item-modal" onclick="display(${l[i].id})"class="btn btn-secondary ml-3">Details</button>
						</div>
						<div class="col">
							<button id="edit-item" data-toggle="modal" data-target="#edit-item-modal" onclick="display(${l[i].id})" class="btn btn-secondary ml-3">Edit</button>
						</div>
						<div class="col">
							<button id="item-${i}-rmbtn" type="button" class="btn btn-danger">Remove</button>
						</div>
					</div>
				</div>
			</div>
		`);

		// setting click listener for remove buttons
		$(`#item-${i}-rmbtn`).click(() => {
			api.delete_item(l[i].id);
			$(`#list-item-${i}`).remove();
			get_recommendations();
		});
	}
}

/**
 * Updates the page with a list of randomized recommendations
 */
async function get_recommendations()
{
	rec_div.empty();
	let res = await api.get_items();
	let db_items = res.items;

	console.log(list_item_labels);

	let non_user_items = [];

	// creating dictionary with truth values for if the list contians a key
	for (let i = 0; i < db_items.length; i++)
	{
		if (list_item_labels[db_items[i].label]) continue;
		non_user_items.push(db_items[i]);
	}

	
	// if list is empty, do nothing
	if (non_user_items.length == 0)
	{
		console.log("No recommendations to show");
		return;
	}

	// shuffles the array
	non_user_items.sort(() => Math.random() - 0.5);

	console.log("Non user:", non_user_items);

	// limiting list to size of 5
	while (non_user_items.length > 5) non_user_items.pop();

	for (let i = 0; i < non_user_items.length; i++)
	{
		// create div for each recommendation
		rec_div.append(`
		<div id="recommended-item-${i}" class="col-sm-3 border rounded m-1 p-2">
			<div class="container justify-content-end">
				<div class="row m-1" style="height: 200px;">
					<img src="${non_user_items[i].img}" class="img-thumbnail" alt="Item Image" style="max-height: 200px; object-fit: cover;">
				</div>
				<div class="row text-center"><h3>${non_user_items[i].label}</h1></div>
				<div class="row"><p>${non_user_items[i].descr}</p></div>

				<div class="row text-center border">
				<button id="recommended-${i}-button" type="button" class="btn btn-success">Add Item</button>
					<div class="col">
					</div>
				</div>
			</div>
		</div>
		`);
		
		// add button listener to every "Add this item" button for recommendations
		$(`#recommended-${i}-button`).click(async function () {
			let it = non_user_items[i];
			let res = await api.add_item(
				listid,
				it.label,
				it.descr,
				it.img,
				it.url,
				it.price
			);
			console.log(res);
			await get_list();
			await get_recommendations();
		});
	}
}

// click handler for new item button
$("#create").on("click", async function ()
{
	if (confirm(`You want to add ${$("#label-input").val()}`))
	{
		// send info to api
		let res = await api.add_item(
			listid,
			$("#label-input").val(),
			$("#descr-input").val(),
			$("#img-input").val(),
			$("#url-input").val(),
			$("#price-input").val()
		);
		if (res.err)
		{
			alert(res.err)
		}
		else
		{
			window.location.href = `/wishlistdetails?listid=${listid}`;
		}
	}
});

/**
 * Modifies modals to be item specific
 */
async function display(itemid)
{
	let res = await api.get_item(itemid);
	console.log(res.item.label);
	$("#item-title").text(res.item.label);
	$("#item-description").text(res.item.descr);
	$("#item-img").html(`<img class="img-thumbnail" src="${res.item.img}" alt="item image" width=200>`);
	$("#item-url").html(`<a href="${res.item.url}">Link to item</a>`);
	$("#item-price").text(res.item.price);
	$("#label-edit").attr("placeholder", res.item.label);
	$("#descr-edit").attr("placeholder", res.item.descr);
	$("#img-edit").attr("placeholder", res.item.img);
	$("#url-edit").attr("placeholder", res.item.url);
	$("#price-edit").attr("placeholder", res.item.price);
	itid = itemid;
}

// handler for modal confirm button
$("#EditConfirm").on("click", async function ()
{
	console.log(itid);
	if (confirm("Are you sure?"))
	{
		// update items
		let res = await api.update_item(
			itid,
			$("#label-edit").val(),
			$("#descr-edit").val(),
			$("#img-edit").val(),
			$("#url-edit").val(),
			$("#price-edit").val()
		);
		// if err, notify user
		if (res.err)
		{
			alert(res.err);
		}
		// reload page
		else
		{
			window.location.href = `/wishlistdetails?listid=${listid}`;
		}
	}
});

// When the page has loaded, update the list
$(async () =>
{
	// get credentials
	let username = sessionStorage.getItem("user");
	let password = sessionStorage.getItem("pass");
	// if not valid, don't update
	if (!username || !password) {
		console.error("The user is not logged in!");
		return;
	}
	// print user
	console.log("User:", username, "is logged in");

	// define api
	api = new Api(username, password);

	await get_list();
	await get_recommendations();
});
