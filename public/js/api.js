class Api
{
	constructor(username, password)
	{
		this.username = username;
		this.password = password;
	}
	
	async api_get(func, body)
	{
		let url = "/api/" + func;
		let query = "?";

		for (var v in body)
		{
			if (!body[v]) continue;
			query += v + "=" + body[v];
		}

		if (query.length > 1) url += query;

		let call = await fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		});
		return await call.json();
	}

	async api_call(func, method, body)
	{
		let call = fetch("/api/" + func,
		{
			method: method,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		})
		return await call.json();
	}

	// User functions
	
	async get_users(username)
	{
		return this.api_get("user", username);
	}

	async login()
	{
		return this.api_call("login", "POST",
		{
			username: this.username,
			password: this.password
		});
	}

	async add_user()
	{
		return this.api_call("adduser", "POST",
		{
			username: this.username,
			password: this.password
		});
	}

	async delete_user()
	{
		return this.api_call("deleteuser", "POST",
		{
			username: this.username,
			password: this.password
		});
	}

	// List functions

	async get_lists(username)
	{
		return this.api_get("list", { username: username });
	}

	async add_list(label)
	{
		return this.api_call("addlist", "POST",
		{
			username: this.username,
			password: this.password,
			label: label
		});
	}

	async update_list(listid, label)
	{
		return this.api_call("updatelist", "PUT",
		{
			username: this.username,
			password: this.password,
			listid: listid,
			label:label
		});
	}

	async delete_list(listid)
	{
		return this.api_call("deletelist", "POST",
		{
			username: this.username,
			password: this.password,
			listid: listid
		});
	}

	// Item funcitons

	async get_items(listid)
	{
		return this.api_get("item", { listid: listid });
	}

	async add_item(listid, label, descr, img, url, price)
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
		});
	}

	async update_item(itemid, label, descr, img, url, price)
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
		});
	}

	async delete_item(itemid)
	{
		return this.api_call("deleteitem", "POST",
		{
			username: this.username,
			password: this.password,
			itemid: itemid
		});
	}
}
