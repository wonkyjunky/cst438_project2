import mariadb

CLEAR_DATABASE_QUERY = """
DROP TABLE IF EXISTS user, list, item
"""

# user constants
CREATE_USER_TABLE_QUERY = """
CREATE TABLE IF NOT EXISTS user (
	id			INT PRIMARY KEY AUTO_INCREMENT,
	username	TEXT UNIQUE NOT NULL,
	password	BIGINT NOT NULL,
	admin		BOOLEAN NOT NULL
);
"""
INSERT_USER_QUERY	= "INSERT INTO user (username, password, admin) VALUES (?, ?, ?)"
DELETE_USER_QUERY	= "DELETE FROM user WHERE username = ?"
SELECT_USER_QUERY	= "SELECT * FROM user WHERE username = ?"
SELECT_USERS_QUERY	= "SELECT * FROM user"

# list constants
CREATE_LIST_TABLE_QUERY = """
CREATE TABLE IF NOT EXISTS list (
	id		INT PRIMARY KEY AUTO_INCREMENT,
	userid	INT NOT NULL,
	label	TEXT NOT NULL
);
"""
INSERT_LIST_QUERY		= "INSERT INTO list (userid, label) VALUES (?, ?)"
DELETE_LIST_QUERY		= "DELETE FROM list WHERE id = ?; DELETE * FROM item WHERE listid = ?;"
SELECT_USER_LISTS_QUERY	= "SELECT * FROM list WHERE userid = ?"

# item constants
CREATE_ITEM_TABLE_QUERY = """
CREATE TABLE IF NOT EXISTS item (
	id		INT PRIMARY KEY AUTO_INCREMENT,
	listid	INT NOT NULL,
	label	TEXT NOT NULL,
	descr	TEXT,
	img		TEXT,
	url		TEXT,
	price	FLOAT
);
"""
INSERT_ITEM_QUERY		= "INSERT INTO item (listid, label, descr, img, url, price) VALUES (?, ?, ?, ?, ?, ?)"
DELETE_ITEM_QUERY		= "DELETE FROM item WHERE id = ?"
SELECT_ITEM_QUERY		= "SELECT FROM item WHERE id = ?"
SELECT_LIST_ITEMS_QUERY	= "SELECT * FROM item WHERE listid = ?"

username = ""
password = ""
hostname = ""
database = ""
port = 0

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
def connect(testing = False):
	if not username or not password or not hostname or not database or not port:
		load_credentials()
	try:
		conn = mariadb.connect(
			user = username,
			password = password,
			host = hostname,
			database = database,
			port = port,
			autocommit = not testing
		)
		return conn
	except mariadb.Error as e:
		print(f"Failed to connect to database: {e}")
		pass

"""
Loads credentials from dbcred.txt

Automatically called by connect if any of the credentials are invalid
"""
def load_credentials():
	f = open("./dbcred.txt")
	string = f.read()
	toks = string.split(',')
	global username
	global password
	global hostname
	global database
	global port
	username = toks[0]
	password = toks[1]
	hostname = toks[2]
	database = toks[3]
	port = int(toks[4])
	pass

##################################################################
#	TABLE FUNCTIIONS
##################################################################

"""
Creates tables if they do not exist

Params:
	cur		(obj)	database cursor
"""
def init_tables(cur):
	cur.execute(CREATE_USER_TABLE_QUERY)
	cur.execute(CREATE_LIST_TABLE_QUERY)
	cur.execute(CREATE_ITEM_TABLE_QUERY)

"""
WARNING!
Deletes all database tables

Params:
	cur		(obj)	database cursor
"""
def clear_database(cur):
	cur.execute(CLEAR_DATABASE_QUERY)

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
def add_user(cur, username, password, admin):
	cur.execute(INSERT_USER_QUERY, (username, password, admin))

"""
Gets all users in user table

Params:
	cur		(obj)	database cursor

Returns:
	Array of user tuples
"""
def get_users(cur):
	cur.execute(SELECT_USERS_QUERY)
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
def get_user(cur, username):
	cur.execute(SELECT_USER_QUERY, (username,))
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
def authenticate_user(cur, username, password):
	cur.execute(SELECT_USER_QUERY, (username,))
	user = cur.fetchone()
	if (user):
		if user[2] == password:
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
def add_user_list(cur, userid, label):
	cur.execute(INSERT_LIST_QUERY, (userid, label))

"""
Gets array of user's lists

Params:
	cur		(obj)	database cursor
	userid	(int)	id of user

Return:
	array of list tuples
"""
def get_user_lists(cur, userid):
	cur.execute(SELECT_USER_LISTS_QUERY, (userid,))
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
def delete_list(cur, id):
	cur.execute(DELETE_LIST_QUERY, (id,))

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
def add_list_item(cur, listid, label, descr, img, url, price):
	cur.execute(INSERT_ITEM_QUERY, (listid, label, descr, img, url, price))

"""
Gets array of items in a list

Params:
	cur		(obj)	database cursor
	listid	(int)	list id

Return:
	array of item tuples
"""
def get_list_items(cur, listid):
	cur.execute(SELECT_LIST_ITEMS_QUERY, (listid,))
	items = []
	for i in cur:
			items.append(i)
	return items

"""
Gets item

Params:
	cur		(obj)	database cursor
	id		(int)	item id
"""
def get_item(cur, id):
	cur.execute(SELECT_ITEM_QUERY, (id,))
	return cur.fetchone()

"""
Deletes item from table

Params:
	cur		(obj)	database cursor
	id		(int)	item id
"""
def delete_item(cur, id):
	cur.execute(DELETE_ITEM_QUERY, (id,))

"""
DO NOT CALL THIS FUNCTION
Function to test if everything is working right.
"""
def test():
	conn = connect(True)
	cur = conn.cursor()
	clear_database(cur)
	init_tables(cur)

	add_user(cur, "ike", "password", False)
	add_user(cur, "jeff", "mynamejeff", True)
	user = get_user(cur, "ike")
	add_user_list(cur, user[0], "Ike's Wish List")
	add_user_list(cur, user[0], "Ike's Grocery List")
	lists = get_user_lists(cur, user[0])
	listid = lists[0][0]

	#testing adding items
	add_list_item(cur, listid, "Goldbond", "Feel the fresh", "...", "...", 19.99)
	add_list_item(cur, listid, "IcyHot", "Icy, icy, hot, hot", "...", "...", 10.95)
	items = get_list_items(cur, listid)
	print("Items:", items)

	# testing deleting items

	delete_item(cur, items[0][0])

	items = get_list_items(cur, listid)
	print("Items:", items)

	conn.close()

#test()