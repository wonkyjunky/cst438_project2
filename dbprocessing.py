import mysql.connector
import customhash

mydb = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  password="yourpassword",
  database="mydatabase"
)


def makeuser(username,password):
	mycursor = mydb.cursor()
	sql = ""
	val = (username,customhash.hash(password))