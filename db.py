import sqlite3
import hashlib

DB_NAME = "project2-db"

# user constants
CREATE_USER_TABLE_QUERY = """
CREATE TABLE IF NOT EXISTS user (
	id			INTEGER PRIMARY KEY AUTOINCREMENT,
	username	TEXT UNIQUE NOT NULL,
	passhash	TEXT NOT NULL,
	admin		BOOLEAN NOT NULL
);
"""
DROP_USER_TABLE_QUERY = " DROP TABLE IF EXISTS user"

INSERT_USER_QUERY	= "INSERT INTO user (username, passhash, admin) VALUES (?, ?, ?)"
DELETE_USER_QUERY	= "DELETE FROM user WHERE username = ?"

SELECT_USER_BY_USERNAME_QUERY	= "SELECT * FROM user WHERE username = ?"
SELECT_USER_BY_ID_QUERY	= "SELECT * FROM user WHERE id = ?"
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
SELECT_LISTS_QUERY		= "SELECT * FROM list"

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
SELECT_ITEMS_QUERY		= "SELECT * FROM item"

class DatabaseConnection:
	
	def __init__(self, testing = False):
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
		conn.close()			# ce digest of the data passedoses the connection (very important)

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
		if self.get_user(username):
			return False
		h = hashlib.sha256()
		h.update(password.encode())
		self.conn.execute(INSERT_USER_QUERY, (username, h.digest(), admin))
		self.conn.commit()
		return True

	"""
	Gets all users in user table

	Returns:
		Array of user objects
	"""
	def get_users(self):
		cur = self.conn.execute(SELECT_USERS_QUERY)
		users = []
		for (id, username, passhash, admin) in cur:
			user = {}
			user["id"] = id
			user["username"] = username
			user["admin"] = bool(admin)
			users.append(user)
		return users

	"""
	Gets user from database

	Params:
		username	(str)	username of user

	Return:
		User object if user exists
		None if user doesn't exist
	"""
	def get_user(self, username = "", userid = 0):
		tup = ()
		if not username:
			if not userid:
				return None
			else:
				tup = self.conn.execute(SELECT_USER_BY_ID_QUERY, (userid,)).fetchone()
		else:
			tup = self.conn.execute(SELECT_USER_BY_USERNAME_QUERY, (username,)).fetchone()

		if not tup:
			return None

		user = {}
		user["id"] = int(tup[0])
		user["username"] = str(tup[1])
		user["admin"] = bool(tup[3])
		return user

	"""
	Gets user from database and checks credentials

	Params:
		username	(str)	username of user
		password	(str)	password of user

	Return: 
		True if correct credentials
		False if incorrect password
		None if incorrect username
	"""
	def auth_user(self, username, password):
		user = self.conn.execute(SELECT_USER_QUERY, (username,)).fetchone()
		if user:
			h = hashlib.sha256()
			h.update(password.encode())
			if user[2] == h.digest():
				return True
			else:
				return False
		pass

	def delete_user(self, username):
		self.conn.execute(DELETE_USER_QUERY, (username,))
		self.conn.commit()


	##################################################################
	#	LIST FUNCTIONS
	##################################################################

	"""
	Adds list with user's id

	Params:
		userid	(int)	id of user
		label	(str)	label for list
	"""
	def add_list(self, userid, label):
		lists = self.get_user_lists(userid)
		for l in lists:
			if l["label"] == label:
				return False

		self.conn.execute(INSERT_LIST_QUERY, (userid, label))
		self.conn.commit()
		return True

	"""
	Gets array of user's lists

	Params:
		(optional) userid	(int)	id of user

	Return:
		array of list objects
	"""
	def get_lists(self, userid = 0):
		if userid > 0:
			cur = self.conn.execute(SELECT_USER_LISTS_QUERY, (userid,))
		else:
			cur = self.conn.execute(SELECT_LISTS_QUERY)

		lists = []
		for (id, userid, label) in cur:
			l = {}
			l["id"] = id
			l["userid"] = userid
			l["label"] = label
			lists.append(l)
		return lists

	# deletes the list and all items associated with it
	"""
	Deletes list

	Params:
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
		listid	(int)	list id
		label	(str)	item label
		descr	(str)	item description
		img		(str)	URL to item image
		url		(str)	URL to item web page
		price	(float)	item price
	"""
	def add_item(self, listid, label, descr, img, url, price):
		items = self.get_list_items(listid)

		for i in items:
			if i["label"] == label:
				return False

		self.conn.execute(INSERT_ITEM_QUERY, (listid, label, descr, img, url, price))
		self.conn.commit()
		return True

	"""
	Gets array of items

	Params:
		(optional) listid	(int)	list id

	Return:
		array of item maps
	"""
	def get_items(self, listid = 0):

		if listid > 0:
			cur = self.conn.execute(SELECT_LIST_ITEMS_QUERY, (listid,))
		else:
			cur = self.conn.execute(SELECT_ITEMS_QUERY)
		items = []

		for (listid, listid, label, descr, img, url, price) in cur:
			i = {}
			i["id"] = listid
			i["listid"] = listid
			i["label"] = label
			i["descr"] = descr
			i["img"] = img
			i["url"] = url
			i["price"] = price
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

