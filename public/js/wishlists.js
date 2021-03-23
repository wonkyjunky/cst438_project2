let username2 = sessionStorage.getItem("user");
let password2 = sessionStorage.getItem("pass");
let userid2 = 0;
$.get("/api/user", {username: username2}, (data) => {
	userid2 = data.user.id;
});

$.get("/api/list", {username: username2}, (data) => {
	console.log(data);
	for (let i = 0; i < data.lists.length; i++){
	$("#wishlists").append(`     
		<figure
		style="
			width: 320px;
			padding: 10px;
			border: 5px solid gray;"
		id="wishlist"
		>
		<a id="${data.lists.id}" href="/wishlistdetails">
		<img
		src="https://cdn3.iconfinder.com/data/icons/christmas-and-new-year-13/64/Christmas_santa_bag-512.png"
		width="200"
		></img>
		<figcaption id="wishlisttitle">${data.lists[i].label}</figcaption>
		</a>
			<button type="button" id="${data.lists[i].id}" onclick="delete_list(this.id)">
			<img
				src="https://www.pngitem.com/pimgs/m/463-4637625_x-button-close-x-button-png-transparent-png.png"
				width="20"
			></img>
			</button>
		</figure>`)
	}
})
$('#create').on('click', function(e) {
	var label = document.getElementById('label').value;
	var data = {"username": username2, "password":password2, "label": label};
	if (confirm(`You want to create ${label}?`)){
		$.post_json("/api/addlist",data, res => {
			console.log(res);
			window.location.href = "/wishlists";
		});
	}
	});

function delete_list(id){
	let deleteData = {"username": username2, "password":password2, "listid": id};
	$.post_json("/api/deletelist", deleteData, res => {
		console.log(res);
		window.location.href = "/wishlists";
	});
}