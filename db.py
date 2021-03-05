import mariadb

CLEAR_DATABASE_QUERY = """
DROP TABLE IF EXISTS user, list, item
"""

# user constants
CREATE_USER_TABLE_QUERY = """
CREATE TABLE IF NOT EXISTS user (
	id			INT PRIMARY KEY AUTO_INCREMENT,
	username	TEXT UNIQUE NOT NULL,
	password	TEXT NOT NULL,
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
DELETE_LIST_QUERY		= "DELETE FROM list WHERE id = ?"
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
SELECT_LIST_ITEMS_QUERY	= "SELECT * FROM item WHERE listid = ?"

username = ""
password = ""
hostname = ""
database = ""
port = 0


def connect():
	try:
		conn = mariadb.connect(
			user = username,
			password = password,
			host = hostname,
			database = database,
			port = port,
			autocommit = True
		)
		return conn
	except mariadb.Error as e:
		print(f"Failed to connect to database: {e}")
		pass

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

def init_tables(cur):
	cur.execute(CREATE_USER_TABLE_QUERY)
	cur.execute(CREATE_LIST_TABLE_QUERY)
	cur.execute(CREATE_ITEM_TABLE_QUERY)

def clear_database(cur):
	cur.execute(CLEAR_DATABASE_QUERY)

##################################################################
#	USER FUNCTIONS
##################################################################


def add_user(cur, username, password, admin):
	cur.execute(INSERT_USER_QUERY, (username, password, admin))

def get_users(cur):
	cur.execute(SELECT_USERS_QUERY)
	users = []
	for (id, username, password, admin) in cur:
		users.append((id, username, password, admin))
	return users

def get_user(cur, username):
	cur.execute(SELECT_USER_QUERY, (username,))
	return cur.fetchone()

# Gets user from database and checks credentials
# return: 	User tuple if correct credentials
# 			None if incorrect username
# 			False if incorrect password
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

# adds list to the table
def add_list(cur, userid, label):
	cur.execute(INSERT_LIST_QUERY, (userid, label))

# returns an array of all lists associated with a user id
def get_lists(cur, userid):
	cur.execute(SELECT_USER_LISTS_QUERY, (userid,))
	lists = []
	for l in cur:
		lists.append(l)
	return lists

# deletes the list and all items associated with it
def delete_list(cur, id):
	cur.execute(DELETE_LIST_QUERY, (id,))

##################################################################
#	ITEM FUNCTIONS
##################################################################

def add_item(cur):
	#cur.execute(INSERT_ITEM_QUERY, (listid, )
	pass
def get_items(cur, listid):
	pass
def get_item(cur, id):
	pass
def delete_item(cur, id):
	pass


# load_credentials()
# conn = connect()
# cur = conn.cursor()
# clear_database(cur)
# init_tables(cur)

# add_user(cur, "ike", "password", False)
# add_user(cur, "jeff", "mynamejeff", True)
# user = get_user(cur, "ike")
# add_list(cur, user[0], "Ike's Wish List")
# add_list(cur, user[0], "Ike's Grocery List")
# lists = get_lists(cur, user[0])

# print(get_items(lists[0][0])

# conn.close()