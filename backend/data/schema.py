import sqlite3
import os

DIR = os.path.dirname(__file__)
DBNAME = "uva.db"
DBPATH = os.path.join(DIR, DBNAME)

def schema(dbpath):
    with sqlite3.connect(dbpath) as conn:
        cursor = conn.cursor()

        SQL = "DROP TABLE IF EXISTS food;"
        cursor.execute(SQL)

        SQL = """CREATE TABLE food(
             pk INTEGER PRIMARY KEY AUTOINCREMENT,
             Name VARCHAR(64),
             City VARCHAR(32),
             Cuisine_style TEXT,
             Ranking INTEGER,
             Rating FLOAT,
             Price_range INTEGER,
             Number_of_reviews INTEGER,
             Reviews TEXT,
             menu TEXT,
             menu_link TEXT
            );"""

        cursor.execute(SQL)

        SQL = "DROP TABLE IF EXISTS relationships;"
        cursor.execute(SQL)
        SQL = """CREATE TABLE relationships(
             pk INTEGER PRIMARY KEY AUTOINCREMENT,
             email_one INTEGER,
             email_two INTEGER,
             Status INTEGER,
             Action_email INTEGER,
             FOREIGN KEY (email_one) REFERENCES users(email),
             FOREIGN KEY (email_two) REFERENCES users(email),
             FOREIGN KEY (Action_email) REFERENCES users(email)
            );"""

        cursor.execute(SQL)
        
        SQL = "DROP TABLE IF EXISTS users;"
        cursor.execute(SQL)

        SQL = """CREATE TABLE users(
             pk INTEGER PRIMARY KEY AUTOINCREMENT,
             email VARCHAR(64),
             password VARCHAR(32),
             First_name VARCHAR(32),
             Last_name VARCHAR(32),
             image_path TEXT,
             Api_key Varchar(32)
            );"""

        cursor.execute(SQL)

        SQL = "DROP TABLE IF EXISTS messages;"
        cursor.execute(SQL)

        SQL = """CREATE TABLE messages(
             pk INTEGER PRIMARY KEY AUTOINCREMENT,
             email VARCHAR(64),
             sender VARCHAR(64),
             message TEXT,
             time_stamp VARCHAR(64),
             image TEXT,
             first VARCHAR(64),
             last VARCHAR(64),
            FOREIGN KEY (email) REFERENCES users(email)
            FOREIGN KEY (sender) REFERENCES users(email)
            FOREIGN KEY (image) REFERENCES users(image_path)
            FOREIGN KEY (first) REFERENCES users(First_name)
            FOREIGN KEY (last) REFERENCES users(Last_name)
            );"""

        cursor.execute(SQL)




        SQL = "DROP TABLE IF EXISTS reviews;"
        cursor.execute(SQL)

        SQL = """CREATE TABLE reviews(
             pk INTEGER PRIMARY KEY AUTOINCREMENT,
             Food_name varchar(32),
             Rating INTEGER,
             Api_key Varchar (32),
             Email VARCHAR(32),
             city VARCHAR (32),
             first VARCHAR(32),
             last VARCHAR(32),
             image TEXT,
             FOREIGN KEY (Email) REFERENCES users(email),
             FOREIGN KEY (Api_key) REFERENCES users(Api_key),
             FOREIGN KEY(Food_name) References food(Name),
             FOREIGN KEY(city) References food(City),
             FOREIGN KEY (first) REFERENCES users(First_name),
             FOREIGN KEY (last) REFERENCES users(Last_name),
             FOREIGN KEY (image) REFERENCES users(image_path)
            );"""
        cursor.execute(SQL)
schema(DBPATH)