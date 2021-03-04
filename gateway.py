import middleware
from flask import Flask, request, abort, redirect, url_for, render_template
from flask_restful import Resource, Api
from threading import *

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
def personal_list():
	#start_new_thread(function_name,variables as tuples)
	return render_template('MyWishlist.html')

@app.route('/view_list')
def view_list():
	#start_new_thread(function_name,variables as tuples)
	return render_template('ItemList.html')

if __name__ == '__main__':
	app.debug = True
	app.run()