import db
import time
import flask

app = flask.Flask (__name__, static_folder="client/build/templates", static_url_path="")

################################################################################
#	Client Routes
################################################################################

@app.route("/")
def home_route():
	return flask.send_from_directory(app.static_folder, "index.html")

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

@app.route("/api/test2")
def test2_route():
	return { "msg"	: "this is test route 2" }

################################################################################
#	Meme Routes
################################################################################

@app.route("/api/shaq")
def shaq_route():
	return { "msg"	: "Shaq ist die Liebe. Shaq ist das Leben." }

if __name__ == '__main__':
	app.run(debug=True)
