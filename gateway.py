from flask import Flask, request, abort, redirect, url_for, render_template
from flask_restful import Resource, Api
from flask_login import login_required, current_user, LoginManager
import db
import time
import os

app = Flask (__name__, static_folder="public")

# login_manager = LoginManager()
# login_manager.init_app(app)
# @login_manager.user_loader
# def load_user(user_id):
# 	return User.get(user_id)

################################################################################
#	Api Routes
################################################################################


@app.route("/api/item")
def item_route():
	# TODO: add db calls/ arguments that this route will take
	return { "msg"	: "this feature is not implemented yet" }

@app.route("/api/list")
def list_route():
	# TODO: add db calls/ arguments that this route will take
	return { "msg"	: "this feature is not implemented yet" }

@app.route("/api/user")
def user_route():
	# TODO: add db calls/ arguments that this route will take
	return { "msg"	: "this features isn't implemented yet" }

################################################################################
#	Test Routes
################################################################################


@app.route("/api/test")
def test_route():
	return {	"msg"	: "Hello, frontend!",
				"time"	: time.time() }

################################################################################
#	Meme Routes
################################################################################

@app.route("/api/shaq")
def shaq_route():
	return { "msg"	: "Shaq ist die Liebe. Shaq ist das Leben." }

if __name__ == '__main__':
	run_port = os.environ.get("PORT", 8000)
	print("Binding to port:", run_port)
	app.run(host='0.0.0.0', debug=False, port=run_port)