import mariadb
import customhash

def init():
	try:
		conn = mariadb.connect(
			host = "u3r5w4ayhxzdrw87.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
			user = "mny22dvmijrebhot",
			password="kzwlw1tsgieq85n8",
			port = 3306,
			database="wtdxbvry3emtr6vg"
		)

		c = mariadb.cursor()
		j = c.execute("CREATE TABLE IF NOT EXISTS user(id int, username varchar(32), password varchar(32));")
		print(j)

	except mariadb.Error as e:
		print(f"Failed to connect to database: {e}")
		return False


# will return a bool, false if failed
def makeuser(username, password):
	c = mariadb.cursor()
	c.execute
	(
	"INSERT INTO user(id, user) "
	)
