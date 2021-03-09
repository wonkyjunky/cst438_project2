import middleware
from flask import Flask, request, abort, redirect, url_for, render_template
from flask_restful import Resource, Api
from flask_login import login_required, current_user
from threading import *
import db

#db.init()

app = Flask (__name__)
api = Api(middleware.app)
todos = {}
@app.route('/')
def index():
	#x = start_new_thread(render_template,('index.html',))
	return render_template('index.html')

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