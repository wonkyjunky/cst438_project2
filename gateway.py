from flask import Flask, request
from flask_restful import Resource, Api
app = Flask (__name__)
api = Api(app)
todos = {}
""" middleware 
app.wsgi_app = middleware(app.wsgi_app)
@app.route('/', methods=['GET', 'PUT'])
"""
class HelloWorld(Resource):
	def get(self, todo_id):
		if(len(todos[todo_id].password)==0):
			return{todo_id: todos[todo_id]}
		else:
			return response, 401
	def get(self,todo_id, auth):
		if(len(todos[todo_id].password)==0 or todos[todo_id].password == auth):
			return{todo_id: todos[todo_id]}
		else:
			return response, 401
	def put(self,todo_id,auth):
		todos[todo_id] = request.form['data',auth]
		return {todo_id: todos[todo_id]}	
	def put(self, todo_id):
		todos[todo_id] = request.form['data']
		return {todo_id: todos[todo_id]}
api.add_resource(HelloWorld, '/<string:todo_id>')
if __name__ == '__main__':
	app.run(debug=True)