import middleware
from flask import Flask, request, abort, redirect, url_for
from flask_restful import Resource, Api
from _thread import *

app = Flask (__name__)
api = Api(middleware.app)
todos = {}
@app.route('/')
def index():
	#start_new_thread(function_name,variables as tuples)
	return "home"

@app.route('/shaq')
def Shaq():
	#start_new_thread(function_name,variables as tuples)
	return "shaq"

@app.route('/personal_list')
def personal_list():
	#start_new_thread(function_name,variables as tuples)
	return "personal list"

@app.route('/view_list')
def view_list():
	#start_new_thread(function_name,variables as tuples)
	return "view list"

if __name__ == '__main__':
	app.run(debug=True)