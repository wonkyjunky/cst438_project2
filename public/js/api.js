class Api
{
	constructor(username, password)
	{
		this.username = username;
		this.password = password;
	}
	
	api_get(func, body, callback)
	{
		if (!callback) callback = (data) => { console.log(data); };
		let url = "/api/" + func;
		let query = "?";

		for (var v in body)
		{
			if (!body[v]) continue;
			query += v + "=" + body[v];
		}

		if (query.length > 1) url += query;

		fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
		.then(response => response.json())
		.then(data => callback(data))
		.catch(callback);
	}

	api_call(func, method, body, callback)
	{
		if (!callback) callback = (res) => { console.log(res); };

		fetch("/api/" + func,
		{
			method: method,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		})
		.then(response => response.json())
		.then(data => callback(data))
		.catch(callback);
	}

	// User functions
	 
	get_users(username, callback)
	{
		return this.api_get("user", { username: username }, callback);
	}

	login(callback)
	{
		return this.api_call("login", "POST",
		{
			username: this.username,
			password: this.password
		}, callback);
	}

	add_user(callback)
	{
		return this.api_call("adduser", "POST",
		{
			username: this.username,
			password: this.password
		}, callback);
	}

	delete_user(callback)
	{
		return this.api_call("deleteuser", "POST",
		{
			username: this.username,
			password: this.password
		}, callback);
	}

	// List functions

	get_lists(username, callback)
	{
		return this.api_get("list", { username: username }, callback);
	}

	add_list(label, callback)
	{
		return this.api_call("addlist", "POST",
		{
			username: this.username,
			password: this.password,
			label: label
		}, callback);
	}

	update_list(listid, label, callback)
	{
		return this.api_call("updatelist", "PUT",
		{
			username: this.username,
			password: this.password,
			listid: listid,
			label:label
		}, callback);
	}

	delete_list(listid, callback)
	{
		return this.api_call("deletelist", "POST",
		{
			username: this.username,
			password: this.password,
			listid: listid
		}, callback);
	}

	// Item funcitons

	get_items(listid, callback)
	{
		return this.api_get("item", { listid: listid }, callback);
	}

	add_item(listid, label, descr, img, url, price, callback)
	{
		return this.api_call("additem", "POST",
		{
			username: this.username,
			password: this.password,
			listid: listid,
			label: label,
			descr: descr,
			img: img,
			url: url,
			price: price
		}, callback);
	}

	update_item(itemid, label, descr, img, url, price, callback)
	{
		return this.api_call("updateitem", "PUT",
		{
			username: this.username,
			password: this.password,
			itemid: itemid,
			label: label,
			descr: descr,
			img: img,
			url: url,
			price: price
		}, callback);
	}

	delete_item(itemid, callback)
	{
		return this.api_call("deleteitem", "POST",
		{
			username: this.username,
			password: this.password,
			itemid: itemid
		}, callback);
	}
}
