// do not call this function
// it is here only for example purposes
async function api_example_test() {
  // Let's say we want to create a new user "bob" with password "coconut"
  // We need to create the api object:
  let api = new Api("bob", "coconut");

  // then we call the add user function
  // this needs the await keyword so that it doesn't
  // require a callback. Otherwise it can be handled like
  // a regular Promise object in java script

  // NOTE: await can only be used inside of an async function
  let res = await api.add_user();

  // this will return a msg on success or an err on failure
  // all non-GET functions work this way
  console.log(res);

  // now that the user exists, we can add a list to it
  await api.add_list("Wish List");

  // now an example of getting the lists bob has
  res = await api.get_lists("bob");

  // this gets the first of bob's lists
  let listid = res.lists[0].id;

  // and add some goldbond to it
  await api.add_item(listid, "Goldbond", "Stay cool", "...", "", 12.99);
  //in general, get_ functions return json with the object you want
  // and everything else returns either a msg or an err object
}

class Api {
  /**
   * Constructs api object
   *
   * @param	username
   * @param	password
   *
   * The username and password don't have to be for
   * a user that exists, they just have to be non null
   *
   * If the user does not exist, calling add_user() will
   * create an account for them
   */
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  /**
   * Makes a get call to the api
   * Does not normally need to be used
   *
   * @return json with payload or err
   */
  async api_get(func, body) {
    let url = "/api/" + func;
    let query = "?";

    for (var v in body) {
      if (!body[v]) continue;
      query += v + "=" + body[v];
    }

    if (query.length > 1) url += query;

    let call = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await call.json();
  }

  /**
   * Makes a non get call to the api
   * Does not normally need to be used
   *
   * @return json with payload or err
   */
  async api_call(func, method, body) {
    let call = await fetch("/api/" + func, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return await call.json();
  }

  /**
   * Gets list of users
   *
   * @param	username	(optional)
   * @return	json of users or err
   */
  async get_users(username) {
    return this.api_get("user", username);
  }

  /**
   * Authenticates user that the api was created with
   *
   * @return json with either msg or err
   */
  async login() {
    return this.api_call("login", "POST", {
      username: this.username,
      password: this.password,
    });
  }

  /**
   * Creates user account
   *
   * @return json with either msg or err
   */
  async add_user() {
    return this.api_call("adduser", "POST", {
      username: this.username,
      password: this.password,
    });
  }

  /**
   * Deletes user account
   *
   * @return json with either msg or err
   */
  async delete_user() {
    return this.api_call("deleteuser", "POST", {
      username: this.username,
      password: this.password,
    });
  }

  /**
   * Gets list by id
   *
   * @param	listid
   *
   * @return json with list or err
   */
  async get_list(listid) {
    return this.api_get("list", { listid: listid });
  }

  /**
   * Get list of lists
   *
   * @param	username	(optional)
   *
   * If username is specified, the lists will be the user's.
   * Otherwise all lists in the db will be returned
   * @return json with response or err
   */
  async get_lists(username) {
    return this.api_get("list", { username: username });
  }

  /**
   * Adds list to user
   *
   * @param	label	name of the list
   *
   * @return json with msg or err
   */
  async add_list(label) {
    return this.api_call("addlist", "POST", {
      username: this.username,
      password: this.password,
      label: label,
    });
  }

  /**
   * Changes list label
   *
   * @param	label	new label for the list
   *
   * @return json with msg or err
   */
  async update_list(listid, label) {
    return this.api_call("updatelist", "PUT", {
      username: this.username,
      password: this.password,
      listid: listid,
      label: label,
    });
  }

  /**
   * Deletes user's list
   *
   * @param	listid	id of list to delete
   *
   * @return json with msg or err
   */
  async delete_list(listid) {
    return this.api_call("deletelist", "POST", {
      username: this.username,
      password: this.password,
      listid: listid,
    });
  }

  /**
   * Gets list of items
   *
   * @param	listid	(optional) id
   *
   * If listid is given, items in that list will be returned,
   * otherwise it will be all items in the db
   *
   * @return	json with list of items
   */
  async get_items(listid) {
    return this.api_get("item", { listid: listid });
  }

  /**
   * Add item to list
   *
   * @param	listid		id of list to add item to
   * @param	label		label for item
   * @param	descr		description of item
   * @param	img			url to image of item
   * @param	url			url to item webpage
   * @param	price		price of item
   *
   * @return	json with msg or err
   */
  async add_item(listid, label, descr, img, url, price) {
    return this.api_call("additem", "POST", {
      username: this.username,
      password: this.password,
      listid: listid,
      label: label,
      descr: descr,
      img: img,
      url: url,
      price: price,
    });
  }

  /**
   * Updates item info in list
   *
   * @param	itemid	id of item to update
   * @param	label	(optional) new label for item
   * @param	descr	(optional) new description for item
   * @param	img		(optional) new img url for item
   * @param	url		(optional) new url for item
   * @param	price	(optional) new price for item
   */
  async update_item(itemid, label, descr, img, url, price) {
    return this.api_call("updateitem", "PUT", {
      username: this.username,
      password: this.password,
      itemid: itemid,
      label: label,
      descr: descr,
      img: img,
      url: url,
      price: price,
    });
  }

  /**
   * Deletes item from list
   *
   * @param	itemid	id of item to delete
   *
   * @return	json with msg or err
   */
  async delete_item(itemid) {
    return this.api_call("deleteitem", "POST", {
      username: this.username,
      password: this.password,
      itemid: itemid,
    });
  }

  async get_item(id) {
    return this.api_get("item", { id: id });
  }
}
