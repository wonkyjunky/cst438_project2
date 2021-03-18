import time
import flask
from flask import Flask, request
from db import DatabaseConnection

app = Flask (__name__, static_folder="public", static_url_path="")

################################################################################
#	Client Routes
################################################################################

@app.route("/")
def home_route():
	return flask.render_template("index.html")

################################################################################
#	GET Routes
################################################################################

@app.route("/api/users", methods=["GET"])
def get_users():
	c = DatabaseConnection()
	return { "users": c.get_users() }, 200


#THIS ROUTE IS GUCCI
# requires arg "id" or "username" that correspond to user
@app.route("/api/lists", methods=["GET"])
def get_lists():
	# getting request args

	c = DatabaseConnection()

	userid = 0
	if not "userid" in request.args:
		if not "username" in request.args:
			return { "lists": c.get_lists() }, 200
		else:
			u = c.get_user(username=request.args["username"])
			if u:
				userid = u["id"]
	else:
		userid = int(request.args["userid"])

	if not c.get_user(userid=userid):
		return { "err": "user does not exist" }, 409

	return { "lists": c.get_lists(userid) }, 200


@app.route("/api/items", methods=["GET"])
def get_items():
	listid = 0
	if "listid" in request.args:
		listid = request.args["listid"]


	c = DatabaseConnection()

	return { "items": c.get_items(listid) }, 200

################################################################################
#	POST Routes
################################################################################

@app.route("/api/login", methods=["POST"])
def login():
	j = request.get_json()
	c = DatabaseConnection()

	if auth := check_auth(j, c):
		return auth

	return { "msg": "successfully authorized user" }, 200


@app.route("/api/adduser", methods=["POST"])
def add_user():
	j = request.get_json()
	c = DatabaseConnection()

	if auth := check_auth(j, c):
		return auth
	
	if not c.add_user(j["username"], j["password"], False):
		return { "err"	: "user already exists" }, 409

	return { "msg"	: "added user '" + username + "'" }, 201


@app.route("/api/addlist", methods=["POST"])
def add_list():
	j = request.get_json()
	c = DatabaseConnection()
	if auth := check_auth(j, c):
		return auth

	if not "label" in j:
		return { "err" : "label must not be empty" }, 400

	if not c.add_user_list(auth, j["label"]):
		return { "err": "user already has list with same label" }, 409

	return { "msg": "successfully added list" }, 201


@app.route("/api/additem", methods=["POST"])
def add_item():
	j = request.get_json()
	c = DatabaseConnection()
	if auth := check_auth(j, c):
		return auth
	
	# assuring all the required variables are in the request
	for n in ["listid", "label", "descr", "img", "url", "price"]:
		if not n in j:
			return { "err": n + " must not be empty" }, 400
	
	if not c.add_list_item(j["listid"], j["label"], j["descr"], j["img"], j["url"], j["price"]):
		return { "err": "attempting to add item with duplicate label to list" }, 409
	
	return { "msg": "successfully added item to list" }, 201


################################################################################
#	DELETE Routes
################################################################################

@app.route("/api/deluser", methods=["DELETE"])
def delete_user():
	return { "msg": "this feature is not implemented yet" }, 200


@app.route("/api/deluser", methods=["DELETE"])
def delete_list():
	return { "msg": "this feature is not implemented yet" }, 200


@app.route("/api/deluser", methods=["DELETE"])
def delete_item():
	return { "msg": "this feature is not implemented yet" }, 200

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
		return { "err": "no such user exists" }, 409
	elif auth == False:
		return { "err": "incorrect password" }, 401

	pass

if __name__ == '__main__':
	app.run(debug=True)
