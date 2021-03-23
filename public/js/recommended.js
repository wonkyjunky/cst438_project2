"use strict";

async function get_recommended_items()
{
	var username = sessionStorage.getItem("user");
	var password = sessionStorage.getItem("pass");
	var api = new Api(username, password);

	if (!username || !password)
	{
		console.error("The user is not logged in!");
		return;
	}

	let res = await api.get_lists(api.username);
	let user_lists = res.lists;
	res = await api.get_items();
	let items = res.items;
	let user_items = {};
	let non_user_items = [];
	console.log("Total items:", items.length);

	// creating object that contains a bunch truth values for labels
	for (let i = 0; i < user_lists.length; i++)
	{
		res = await api.get_items(user_lists[i].id);
		let lits = res.items;
		if (!lits) continue;
		for (let j = 0; j < lits.length; j++)
		{
			user_items[lits[j].label] = true;
		}
	}

	for (let i = 0; i < items.length; i++)
	{
		if (user_items[items[i].label]) continue;
		non_user_items.push(items[i]);
	}
	
	console.log("Non user:",non_user_items);

	// shuffles the array
	non_user_items.sort(() => Math.random() - 0.5);

	if (non_user_items.length == 0)
	{
		console.log("not Items to show");
		return;
	}
	else if (non_user_items.length > 5)
	{
		while (non_user_items.length > 5) non_user_items.pop();
	}

	for (let i = 0; i < non_user_items.length; i++)
	{
		var rec_items = $("#recommended-items");
		rec_items.append(`
			<div id="recommended-${i}" class="col">
				<div class="container">
					<h3 class="row">${non_user_items[i].label}</h1>
					<h5 class="row">${non_user_items[i].descr}</h5>
					<h5 class="row">$ ${non_user_items[i].price}</h5>
					<div class="row">
					<button id="recommended-${i}-button" type="button" class="btn btn-success">Add Item</button>
					</div>
				</div>
			</div>
		`);

		$(`#recommended-${i}-button`).click(async function() {

			let it = non_user_items[i];
			let res = await api.add_item(listid, it.label, it.descr, it.img, it.url, it.price);
			$(`#recommended-${i}`).remove();
			console.log(res);
		});
	}
}
// When the page has loaded, update the list
$(()=>{
	console.log("document is ready");
	get_recommended_items();
});
