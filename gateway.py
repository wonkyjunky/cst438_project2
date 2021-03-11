import middleware
from flask import Flask, request, abort, redirect, url_for, render_template
from flask_restful import Resource, Api
from flask_login import login_required, current_user, LoginManager
from threading import *
import db

#db.init()

app = Flask (__name__)

login_manager = LoginManager()
login_manager.init_app(app)
@login_manager.user_loader
def laod_user(user_id):
	return User.get(user_id)



api = Api(middleware.app)
todos = {}

@app.route('/login', methods = ['GET','POST'])
def logining():
	form = LoginForm()
	if (form.validate_on_submit()):
		login_user(user)
		flask.flash('Logged in successfully.')
		next = flask.request.args.get('next')
		if not is_safe_url(next):
			return flask.abort(400)
		return flask.redirect(next or flask.url_for('index'))
	return flask.render_template('login.html', form=form)

@app.route('/index')
def index():
	return render_template('index.html')

@app.route('/')
def index2():
	return index()

@app.route('/account')
def Account():
	#start_new_thread(function_name,variables as tuples)
	return render_template('Account.html')

@app.route('/Login')
def Login():
	#start_new_thread(function_name,variables as tuples)
	return render_template('login.html')

@app.route('/shaq')
def Shaq():
	#start_new_thread(function_name,variables as tuples)
	return "shaq"

@app.route('/personal_list')
@login_required
def personal_list():
	#start_new_thread(function_name,variables as tuples)
	return render_template('MyWishlist.html')

@app.route('/view_list')
def view_list():
	#start_new_thread(function_name,variables as tuples)
	return render_template('ItemList.html')

@app.route('/auth_user')
def auth_user():
	username = request.form.get('username')
	password = request.form.get('password')
	if db.get_user(curr,username,password):
		pass#logged in user

if __name__ == '__main__':
	app.debug = True
	app.run()