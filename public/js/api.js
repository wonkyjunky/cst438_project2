class Api
{
	constructor(username, password)
	{
		this.username = username;
		this.passowrd = password;
	}

	api_call(func, obj, callback, method)
	{
		console.log("about to send:", obj)

		if (callback == undefined) callback = (res) => { console.log(res) }

		return $.ajax({
		type:method,
		url: "/api/" + func,
		contentType:"application/json",
		data: JSON.stringify(obj),
		success: callback,
		error: (jqXHR) => { callback(jqXHR.responseJSON) 
		}
		});
	}

	// User functions
	 
	get_users(username, callback)
	{
		if (!callback) callback = (data) => { console.log(data); };
		return $.get("/api/user", {username:username}, callback, "json");
	}

	login(callback)
	{
		return this.api_call("login", { username: this.username,
			password: this.password
		}, callback, "POST");
	}

	add_user(callback)
	{
		return this.api_call("adduser", { username: this.username,
			password: this.password
		}, callback, "POST");
	}

	delete_user(callback)
	{
		return this.api_call("deleteuser", {
			username: this.username,
			password: this.password
		}, callback, "POST");
	}

	// List functions

	get_lists(userid, callback)
	{
		if (!callback) callback = (data) => { console.log(data); };
		return $.get("/api/list", {userid:userid}, callback, "json");
	}

	add_list(label, callback)
	{
		return this.api_call("addlist", {
			username: this.username,
			password: this.password,
			label:label
		}, callback, "POST");
	}

	update_list(listid, label, callback)
	{
		return this.api_call("updatelist", {
			username: this.username,
			password: this.password,
			listid: listid,
			label:label
		}, callback, "PUT");
	}

	delete_list(listid, callback)
	{
		return this.api_call("deletelist", {
			username: this.username,
			password: this.password,
			listid: listid
		}, callback, "POST");
	}

	// Item funcitons

	get_items(listid, callback)
	{
		if (!callback) callback = (data) => { console.log(data); };
		return $.get("/api/item", { listid: listid }, callback, "json");
	}

	add_item(listid, label, descr, img, url, price, callback)
	{
		return this.api_call("additem", {
			username: this.username,
			password: this.password,
			listid: listid,
			label: label,
			descr: descr,
			img: img,
			url: url,
			price: price
		}, callback, "POST");
	}

	update_item(itemid, label, descr, img, url, price, callback)
	{
		return this.api_call("updateitem", {
			username: this.username,
			password: this.password,
			itemid: itemid,
			label: label,
			descr: descr,
			img: img,
			url: url,
			price: price
		}, callback, "PUT");
	}

	delete_item(itemid, callback)
	{
		return this.api_call("deleteitem", {
			username: this.username,
			password: this.password,
			itemid: itemid
		}, callback, "POST");
	}
};