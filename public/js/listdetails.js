"use strict";

var api;
var rec_div = $("#recommended-items");
var list_div = $("#list-items");
var listid = parseInt(list_div.attr("listid"));
var list_item_labels = {};
var itid;

async function get_list() {
  list_div.empty();

  let res = await api.get_list(listid);
  if (res.err) {
    console.error(res.err);
    return;
  }

  $("#list-label").text(res.list.label);

  res = await api.get_items(listid);

  list_item_labels = {};

  var l = res.items;
  for (let i = 0; i < l.length; i++) {
    list_item_labels[l[i].label] = true;
    list_div.append(`
			<div id="list-item-${i}" class="col-sm-3 border rounded m-1 p-2">
				<div class="container">
					<div class="row m-1">
						<img src="${l[i].img}" class="img-thumbnail" height="105" width="150" alt="Item Image">
					</div>
					<div class="row"><h3>${l[i].label}</h1></div>
					<div class="row"><h5>$ ${l[i].price}</h5></div>
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

async function get_recommendations() {
  rec_div.empty();
  let res = await api.get_items();
  let db_items = res.items;

  console.log(list_item_labels);

  let non_user_items = [];

  // creating dictionary with truth values for if the list contians a key
  for (let i = 0; i < db_items.length; i++) {
    if (list_item_labels[db_items[i].label]) continue;
    non_user_items.push(db_items[i]);
  }

  non_user_items.sort(() => Math.random() - 0.5);

  if (non_user_items.length == 0) {
    console.log("No recommendations to show");
    return;
  }

  console.log("Non user:", non_user_items);

  // shuffles the array
  // limiting list to size of 5
  while (non_user_items.length > 5) non_user_items.pop();

  for (let i = 0; i < non_user_items.length; i++) {
    rec_div.append(`
			<div id="recommended-item-${i}" class="col-sm-3 border rounded m-1 p-2">
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

$("#create").on("click", function () {
  if (confirm(`You want to add ${$("#label-input").val()}`)) {
    api.add_item(
      listid,
      $("#label-input").val(),
      $("#descr-input").val(),
      $("#img-input").val(),
      $("#url-input").val(),
      $("#price-input").val()
    );
    window.location.href = `/wishlistdetails?listid=${listid}`;
  }
});

async function display(itemid) {
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

$("#EditConfirm").on("click", async function () {
  console.log(itid);
  if (confirm("Are you sure?")) {
    let res = await api.update_item(
      itid,
      $("#label-edit").val(),
      $("#descr-edit").val(),
      $("#img-edit").val(),
      $("#url-edit").val(),
      $("#price-edit").val()
    );
	if (res.err)
		alert(res.err);
	else
    	window.location.href = `/wishlistdetails?listid=${listid}`;
  }
});

// When the page has loaded, update the list
$(async () => {
  let username = sessionStorage.getItem("user");
  let password = sessionStorage.getItem("pass");
  if (!username || !password) {
    console.error("The user is not logged in!");
    return;
  }
  console.log("User:", username, "is logged in");

  api = new Api(username, password);

  await get_list();
  await get_recommendations();
});
