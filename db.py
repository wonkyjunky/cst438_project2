import mariadb

# user constants
CREATE_USER_TABLE_QUERY = """
CREATE TABLE IF NOT EXISTS user (
	id			INT PRIMARY KEY AUTO_INCREMENT,
	username	TEXT UNIQUE NOT NULL,
	password	TEXT NOT NULL,
	admin		BOOLEAN NOT_NULL
);
"""
INSERT_USER_QUERY	= "INSERT INTO user (username, password, admin) VALUES (?, ?, ?)"
DELETE_USER_QUERY	= ""
SELECT_USER_QUERY	= "SELECT * FROM user WHERE username = ?"
SELECT_USERS_QUERY	= "SELECT * FROM user"

# list constants
CREATE_LIST_TABLE_QUERY = """
CREATE TABLE IF NOT EXISTS list (
	id		INT PRIMARY KEY AUTO_INCREMENT,
	userid	TEXT NOT NULL,
	label	TEXT NOT NULL
);
"""
INSERT_LIST_QUERY	= "INSERT INTO list (userid, label) VALUES (?, ?)"
DELETE_LIST_QUERY	= "DELETE FROM list"
SELECT_USER_LISTS_QUERY	= "SELECT * FROM user WHERE userid = ?"
SELECT_ALL_LISTS_QUERY	= "SELECT * FROM user"

# item constants
CREATE_ITEM_TABLE_QUERY = """
CREATE TABLE IF NOT EXISTS item (
	id		INT PRIMARY KEY AUTO_INCREMENT,
	listid	INT NOT NULL,
	label	TEXT NOT NULL,
	desc	TEXT,
	price	DOUBLE,
	img		TEXT,
	url		TEXT
);
"""
INSERT_ITEM_QUERY	= "INSERT INTO item (username, password) VALUES (?, ?)"
DELETE_ITEM_QUERY	= ""
SELECT_LIST_ITEMS_QUERY	= "SELECT * FROM user WHERE username = ?"
SELECT_ALL_ITEMS_QUERY	= "SELECT * FROM user"

def connect():
	try:
		conn = mariadb.connect(
			#autocommit=True
		)
		return conn
	except mariadb.Error as e:
		print(f"Failed to connect to database: {e}")
		pass


def init_tables(cur):
	cur.execute(CREATE_USER_TABLE_QUERY)
	cur.execute(CREATE_LIST_TABLE_QUERY)
	cur.execute(CREATE_ITEM_TABLE_QUERY)

def create_user(cur, username, password):
	cur.execute(INSERT_USER_QUERY, (username, password))

def get_users(cur):
	cur.execute(SELECT_USERS_QUERY)
	users = []
	for (id, username, password) in cur:
		users.append((id, username, password))
	return users

# Gets user from database
# return: 	User tuple if correct credentials
# 			None if incorrect username
# 			False if incorrect password
def get_user(cur, username, password):
	cur.execute(SELECT_USER_QUERY, (username,))
	user = cur.fetchone()
	if (user):
		if user[2] == password:
			return user
		else:
			return False
	pass
