import time
import flask
from flask import Flask, request
from db import DatabaseConnection

app = Flask (__name__, static_folder="client/build", static_url_path="")

################################################################################
#	Client Routes
################################################################################

@app.route("/")
def home_route():
	return flask.send_from_directory(app.static_folder, "index.html")

################################################################################
#	GET Routes
################################################################################

@app.route("/api/users", methods=["GET"])
def get_users():
	c = DatabaseConnection()
	return { "users": c.get_users() }, 200

@app.route("/api/items", methods=["GET"])
def get_list_items():

	if not "listid" in request.args:
		return { "err": "listid must not be empty" }, 400

	id = request.args["listid"]
	c = DatabaseConnection()

	return { "items": c.get_list_items(id) }, 200

# requires arg "id" or "username" that correspond to user
@app.route("/api/lists", methods=["GET"])
def get_user_lists():
	# getting request args

	c = DatabaseConnection()

	id = 0
	if not "id" in request.args:
		if not "username" in request.args:
			return { "err": "must pass user id or username" }, 400
		u = c.get_user(request.args["username"])
		id = u["id"]
	else:
		id = request.args["id"]
	
	return { "lists": c.get_user_lists(id), "msg": "successfully retrieved lists" }, 200

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


@app.route("/api/newuser", methods=["POST"])
def new_user():
	j = request.get_json()
	c = DatabaseConnection()

	if auth := check_auth(j, c):
		return auth
	
	if not c.add_user(j["username"], j["password"], False):
		return { "err"	: "user already exists" }, 409

	return { "msg"	: "added user '" + username + "'" }, 201


@app.route("/api/newlist", methods=["POST"])
def new_user_list():
	j = request.get_json()
	c = DatabaseConnection()
	if auth := check_auth(j, c):
		return auth

	if not "label" in j:
		return { "err" : "label must not be empty" }, 400


	if not c.add_user_list(auth, j["label"]):
		return { "err": "user already has list with same label" }, 409

	return { "msg": "successfully added list" }, 201


@app.route("/api/newitem", methods=["POST"])
def new_list_item():
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
