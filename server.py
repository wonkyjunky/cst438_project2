import time
import flask
from flask import Flask, request, render_template
from db import DatabaseConnection

app = Flask (__name__, static_folder="public", static_url_path="")

################################################################################
#	Client Routes
################################################################################

@app.route("/")
def home_route():
	return flask.render_template("home.html")

@app.route("/itemlists")
def itemlists():
    return flask.render_template("itemlists.html")


@app.route("/wishlists")
def wishlists():
    return flask.render_template("wishlists.html")

@app.route("/login")
def loginRoute():
    return flask.render_template("login.html")

@app.route("/createaccount")
def createAccount():
    return flask.render_template("createaccount.html")

@app.route("/itemdetails")
def itemdetails():
    return flask.render_template("itemdetails.html")

@app.route("/recommended")
def recommended():
	return flask.render_template("recommended.html")


@app.route("/wishlistdetails")
def wishlistdetails():
    return flask.render_template("wishlistdetails.html")

################################################################################
#	USER Route
################################################################################


@app.route("/api/login", methods=["POST"])
def api_login():
	j = request.get_json()
	c = DatabaseConnection()

	if auth:= check_auth(j, c):
		return auth

	return {"msg":"successfully authenicated user"}, 200


@app.route("/api/user", methods=["GET"])
def get_users():
	c = DatabaseConnection()

	username = request.args.get("username", "")
	print(username)
	if not username:
		return { "users": c.get_users() }, 200

	user = c.get_user(username=username)
	if not user:
		return { "err": "user does not exist" }, 409

	return { "user": user }, 200


@app.route("/api/adduser", methods=["POST"])
def add_user():
	j = request.get_json()
	c = DatabaseConnection()

	username = j.get("username", "")
	if not username:
		return { "err": "username must not be empty" }, 400

	password = j.get("password", "")
	if not password:
		return { "err": "password must not be empty" }, 400

	if not c.add_user(username, password, False):
		return { "err"	: "user already exists" }, 409

	return { "msg"	: "successfully created user" }, 201


@app.route("/api/deleteuser", methods=["POST"])
def delete_user():
	j = request.get_json()
	c = DatabaseConnection()

	if auth := check_auth(j, c):
		return auth

	c.delete_user(j["username"])
	return { "msg": "successfully deleted user" }, 200

################################################################################
#	LIST Routes
################################################################################


@app.route("/api/list", methods=["GET"])
def get_lists():
	c = DatabaseConnection()

	username = request.args.get("username", "")
	if not username:
		return { "lists": c.get_lists() }, 200

	user = c.get_user(username=username)
	if not user:
		return { "err": "user does not exist" }, 409

	return { "lists": c.get_lists(userid=user["id"]) }, 200


"""
Adds list to db

Params:
	username	(str)
	password	(str)
	label		(str)	name of list
"""
@app.route("/api/addlist", methods=["POST"])
def add_list():
	j = request.get_json()
	c = DatabaseConnection()

	if auth := check_auth(j, c):
		return auth

	label = j.get("label", "")
	if not label:
		return { "err": "label must not be empty" }, 400

	user = c.get_user(j["username"])

	if not c.add_list(user["id"], label):
		return { "err": "user already has list with same label" }, 409

	return { "msg": "successfully added list" }, 201


"""
Modifies list from db

Params:
	username	(str)
	password	(str)
	listid		(int)	id of list to delete
	label (optional)(str)	new name of the list
"""
@app.route("/api/deletelist", methods=["POST"])
@app.route("/api/updatelist", methods=["PUT"])
def modify_list():
	j = request.get_json()
	c = DatabaseConnection()

	if auth := check_auth(j, c):
		return auth

	listid = j.get("listid", None)
	if not listid:
		return { "err": "listid must not be empty" }, 400

	l = c.get_list(listid)
	if not l:
		return { "err": "list does not exist" }, 409

	user = c.get_user(j["username"])
	if l["userid"] != user["id"]:
		return { "err": "list does not belong to user" }, 400

	if request.path == "/api/deletelist":
		c.delete_list(listid)
		return { "msg": "successfully deleted list" }, 200

	elif request.path == "/api/updatelist":
		label = j.get("label", "")
		if not label:
			return { "err": "label must not be empty" }, 400
		if not c.update_list(listid, label):
			return { "err": "attempted to give list duplicate name" }, 409
		return { "msg": "successfully updated list" }, 200

	return { "err": "invalid method used" }, 405


################################################################################
#	ITEM Routes
################################################################################


"""
Gets list of items in db

Params:
	(optional)	listid	(int)
"""
@app.route("/api/item", methods=["GET"])
def get_items():
	c = DatabaseConnection()
	listid = int(request.args.get("listid", 0))
	return { "items": c.get_items(listid) }, 200


"""
Adds item to list

Params:
	username	(str)
	password	(str)
	listid		(int)	id of the list to add to
	label		(str)	name of the item
	descr		(str)	item description
	img			(str)	url to item image
	url			(str)	url to item website
	price		(float)	price of item
"""
@app.route("/api/additem", methods=["POST"])
def add_item():
	j = request.get_json()
	c = DatabaseConnection()

	if auth := check_auth(j, c):
		return auth

	vs = [None, None, None, None, None, None]
	varnames = ["listid", "label", "descr", "img", "url", "price"]

	for i in range(len(varnames)):
		vs[i] = j.get(varnames[i], None)
		if not vs[i]:
			return { "err": varnames[i] + " must not be empty" }, 400
	
	user = c.get_user(username=j["username"])
	l = c.get_list(vs[0])
	if not l:
		return { "err": "list does not exist" }, 409

	if user["id"] != l["userid"]:
		return { "err": "list does not belong to user" }, 400

	if not c.add_item(vs[0], vs[1], vs[2], vs[3], vs[4], vs[5]):
		return { "err": "attempting to add item with duplicate label to list" }, 409
	
	return { "msg": "successfully added item to list" }, 201


"""
Updates or deletes item in table

Params:
	username            (str)
	password            (str)
	itemid              (int)    id of item

	These variables are only needed for update:
	label (optional)    (str)    label of item
	descr (optional)    (str)    description of item
	img   (optional)    (str)    url to image of item
	url   (optional)    (str)    url to item
	price (optional)    (float)  price of the item
"""
@app.route("/api/updateitem", methods=["PUT"])
@app.route("/api/deleteitem", methods=["POST"])
def modify_item():
	j = request.get_json()
	c = DatabaseConnection()

	if auth := check_auth(j, c):
		return auth
	
	itemid = j.get("itemid", 0)
	if not itemid:
		return { "err": "itemid must not be empty" }, 400

	user = c.get_user(username=j["username"])
	item = c.get_item(itemid)
	if not item:
		return { "err": "item does not exist" }, 400
	l = c.get_list(item["listid"])
	if l["userid"] != user["id"]:
		return { "err": "item does not belong to user" }, 409
	
	# deleting item
	if request.path == "/api/deleteitem":
		c.delete_item(itemid)
		return { "msg": "successfully deleted item" }, 200
	
	# updating item
	elif request.path == "/api/updateitem":
		if not c.update_item(itemid, j):
			return { "err": "attempted to give item duplicate name" }, 409
		return { "msg": "successfully updated item" }, 200

	return { "err": "invalid method used" }, 405


################################################################################
#	Test GET Routes
################################################################################

@app.route("/api/test")
def test_route():
	return {	"msg"	: "Hello, frontend!",
				"time"	: time.time() }, 200

################################################################################
#	Meme Routes
################################################################################

@app.route("/api/shaq")
def shaq_route():
	return { "msg"	: "Welcome to the Shaq Shack" }

################################################################################
#	Util functions
################################################################################

def check_auth(j, c):
	if not "username" in j:
		return { "err": "username must not be empty" }, 400
	if not "password" in j:
		return { "err" : "password must not be empty" }, 400

	auth = c.auth_user(j["username"], j["password"])

	if auth == None:
		return { "err": "user does not exist" }, 409
	elif auth == False:
		return { "err": "incorrect password" }, 401

	return None

if __name__ == "__main__":
	app.run(debug=True)
