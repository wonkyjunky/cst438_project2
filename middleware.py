from flask import Flask, request, abort, redirect, url_for
from flask_restful import Resource, Api
app = Flask (__name__)
def index():
    return redirect(url_for('login'))

@app.route('/login')
def login():
    abort(401)
    this_is_never_executed()