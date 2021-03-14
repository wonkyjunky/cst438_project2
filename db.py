#!/bin/python3
import sqlite3

DB_NAME = "project2-db"

# user constants
CREATE_USER_TABLE_QUERY = """
CREATE TABLE IF NOT EXISTS user (
	id			INTEGER PRIMARY KEY AUTOINCREMENT,
	username	TEXT UNIQUE NOT NULL,
	passhash	BIGINT NOT NULL,
	admin		BOOLEAN NOT NULL
);
"""
DROP_USER_TABLE_QUERY = " DROP TABLE IF EXISTS user"

INSERT_USER_QUERY	= "INSERT INTO user (username, passhash, admin) VALUES (?, ?, ?)"
DELETE_USER_QUERY	= "DELETE FROM user WHERE username = ?"
SELECT_USER_QUERY	= "SELECT * FROM user WHERE username = ?"
SELECT_USERS_QUERY	= "SELECT * FROM user"

# list constants
CREATE_LIST_TABLE_QUERY = """
CREATE TABLE IF NOT EXISTS list (
	id		INTEGER PRIMARY KEY AUTOINCREMENT,
	userid	INTEGER NOT NULL,
	label	TEXT NOT NULL
);
"""
DROP_LIST_TABLE_QUERY = " DROP TABLE IF EXISTS list"
INSERT_LIST_QUERY		= "INSERT INTO list (userid, label) VALUES (?, ?)"
DELETE_LIST_QUERY		= "DELETE FROM list WHERE id = ?"
SELECT_USER_LISTS_QUERY	= "SELECT * FROM list WHERE userid = ?"

# item constants
CREATE_ITEM_TABLE_QUERY = """
CREATE TABLE IF NOT EXISTS item (
	id		INTEGER PRIMARY KEY AUTOINCREMENT,
	listid	INTEGER NOT NULL,
	label	TEXT NOT NULL,
	descr	TEXT,
	img		TEXT,
	url		TEXT,
	price	FLOAT
);
"""
DROP_ITEM_TABLE_QUERY = " DROP TABLE IF EXISTS item"
INSERT_ITEM_QUERY		= "INSERT INTO item (listid, label, descr, img, url, price) VALUES (?, ?, ?, ?, ?, ?)"
DELETE_ITEM_QUERY		= "DELETE FROM item WHERE id = ?"
DELETE_LIST_ITEMS_QUERY	= "DELETE FROM item WHERE listid = ?"
SELECT_ITEM_QUERY		= "SELECT * FROM item WHERE id = ?"
SELECT_LIST_ITEMS_QUERY	= "SELECT * FROM item WHERE listid = ?"


class DatabaseConnection:
	
	def __init__(self, testing):
		self.testing = testing
		self.conn = sqlite3.connect(DB_NAME)
		self.init_tables()

	def __del__(self):
		self.conn.close()

	"""
	Gets connection object for db 

	Example Usage:
		conn = db.connect()		# connection object for db
		cur = db.cursor()		# pointer to db data
		some_db_function(cur)	# requires the cursor object from connection
		conn.close()			# closes the connection (very important)

	Params:
		testing		(bool)	if true, changes will not affect db

	Return:
		connection object for db
	"""

	##################################################################
	#	TABLE FUNCTIIONS
	##################################################################

	"""
	Creates tables if they do not exist

	Params:
		cur		(obj)	database cursor
	"""
	def init_tables(self):
		self.conn.execute(CREATE_ITEM_TABLE_QUERY)
		self.conn.execute(CREATE_USER_TABLE_QUERY)
		self.conn.execute(CREATE_LIST_TABLE_QUERY)

	"""
	WARNING!
	Deletes all database tables

	Params:
		cur		(obj)	database cursor
	"""
	def clear_database(self):
		self.conn.execute(DROP_USER_TABLE_QUERY)
		self.conn.execute(DROP_LIST_TABLE_QUERY)
		self.conn.execute(DROP_ITEM_TABLE_QUERY)

	##################################################################
	#	USER FUNCTIONS
	##################################################################

	"""
	Adds user to db

	Params:
		cur			(obj)	database cursor
		username	(str)	chosen name of the user
		password	(str)	password for the user
		admin		(bool)	whether or not they have admin privileges
	"""
	def add_user(self, username, password, admin):
		self.conn.execute(INSERT_USER_QUERY, (username, hash(password), admin))

	"""
	Gets all users in user table

	Params:
		cur		(obj)	database cursor

	Returns:
		Array of user tuples
	"""
	def get_users(self):
		cur = self.conn.execute(SELECT_USERS_QUERY)
		users = []

		for (id, username, password, admin) in cur:
			users.append((id, username, password, admin))

		return users

	"""
	Gets user from database

	Params:
		cur 		(obj)	database cursor
		username	(str)	username of user

	Return:
		User object if user exists
		None if user doesn't exist
	"""
	def get_user(self, username):
		cur = self.conn.execute("SELECT * FROM user WHERE username=?", (username,))
		return cur.fetchone()

	"""
	Gets user from database and checks credentials

	Params:
		cur			(obj)	database cursor
		username	(str)	username of user
		password	(str)	password of user

	Return: 
		User tuple if correct credentials
		None if incorrect username
		False if incorrect password
	"""
	def authenticate_user(self, username, password):
		user = self.conn.execute(SELECT_USER_QUERY, (username,)).fetchone()
		if (user):
			if user[2] == hash(password):
				return user
			else:
				return False
		pass

	##################################################################
	#	LIST FUNCTIONS
	##################################################################

	"""
	Adds list with user's id

	Params:
		cur		(obj)	database cursor
		userid	(int)	id of user
		label	(str)	label for list
	"""
	def add_user_list(self, userid, label):
		self.conn.execute(INSERT_LIST_QUERY, (userid, label))

	"""
	Gets array of user's lists

	Params:
		cur		(obj)	database cursor
		userid	(int)	id of user

	Return:
		array of list tuples
	"""
	def get_user_lists(self, userid):
		cur = self.conn.execute(SELECT_USER_LISTS_QUERY, (userid,))
		lists = []
		for l in cur:
			lists.append(l)
		return lists

	# deletes the list and all items associated with it
	"""
	Deletes list

	Params:
		cur		(obj)	database cursor
		id		(int)	id of list
	"""
	def delete_list(self, id):
		self.conn.execute(DELETE_LIST_QUERY, (id,))
		self.conn.execute(DELETE_LIST_ITEMS_QUERY, (id,))

	##################################################################
	#	ITEM FUNCTIONS
	##################################################################
	"""
	Adds item to list

	Params:
		cur		(obj)	database cursor
		listid	(int)	list id
		label	(str)	item label
		descr	(str)	item description
		img		(str)	URL to item image
		url		(str)	URL to item web page
		price	(float)	item price
	"""
	def add_list_item(self, listid, label, descr, img, url, price):
		self.conn.execute(INSERT_ITEM_QUERY, (listid, label, descr, img, url, price))

	"""
	Gets array of items in a list

	Params:
		cur		(obj)	database cursor
		listid	(int)	list id

	Return:
		array of item tuples
	"""
	def get_list_items(self, listid):
		cur = self.conn.execute(SELECT_LIST_ITEMS_QUERY, (listid,))
		items = []
		for i in cur:
				items.append(i)
		return items

	"""
	Gets item

	Params:
		id		(int)	item id
	"""
	def get_item(self, id):
		cur = self.conn.execute(SELECT_ITEM_QUERY, (id,))
		return cur.fetchone()

	"""
	Deletes item from table

	Params:
		cur		(obj)	database cursor
		id		(int)	item id
	"""
	def delete_item(self, id):
		self.conn.execute(DELETE_ITEM_QUERY, (id,))

"""
DO NOT CALL THIS FUNCTION
Function to test if everything is working right.
"""
def test():
	# creating connection object
	conn = DatabaseConnection(False)
	# dropping all info from db
	conn.clear_database()
	# initializing fresh tables
	conn.init_tables()

	print("Testing user functions...")

	# adding test user
	conn.add_user("ike", "password", False)
	print("\tAdded user: 'ike'")

	# adding test admin
	conn.add_user("jeff", "mynamejeff", True)
	print("\tAdded admin: 'jeff'")

	# getting all users
	print("\tGot all users:\t", conn.get_users())

	# getting user by username
	user = conn.get_user("ike")
	print("\tGot user by username 'ike':\t", user)

	# authenticating users
	print("\tAuth with nonexistent user:\t", conn.authenticate_user("Billy", "password"))
	print("\tAuth with incorrect password:\t", conn.authenticate_user("ike", "password1"))
	print("\tAuth with correct password:\t", conn.authenticate_user("ike", "password"))

	print("\nTesting list functions...")

	# adding a list
	conn.add_user_list(user[0], "Wish List")
	print("\tAdded list 'Wish List' to 'ike'")


	conn.add_user_list(user[0], "Grocery List")
	print("\tAdded list 'Grocery List' to 'ike'")


	# getting lists by user id
	lists = conn.get_user_lists(user[0])
	print("\tGot all list of 'ike':\t", lists)

	listid = lists[1][0]

	# deleting list
	conn.delete_list(1)
	print("\tDeleted list with id:\t", 1)

	print("\nTesting item functions...")

	#testing adding items
	conn.add_list_item(listid, "Goldbond", "Feel the fresh", "...", "...", 19.99)
	print("\tAdded item to list:\t", listid)
	conn.add_list_item(listid, "IcyHot", "Icy, icy, hot, hot", "...", "...", 10.95)
	print("\tAdded item to list:\t", listid)
	items = conn.get_list_items(listid)
	print("\tGot items by list id:\t", items)
	print("\tGot item with id 1:\t",conn.get_item(1))
	# testing deleting items

	conn.delete_item(items[0][0])
	print("\tDeleted item with id:", items[0][0])

	items = conn.get_list_items(listid)
	print("\tRemaining list items:", items)
