import sqlite3
import random
from .reviews import Review
from.util import hash_pass

class User:
    dbpath = "data/uva.db"

    def __init__(self,pk,email,Password,First_name,Last_name,image_path,Api_key =""):
        self.pk = pk
        self.email=email
        self.Password= hash_pass(Password)
        self.First_name= First_name
        self.Last_name = Last_name
        self.image_path = image_path
        self.Api_key = Api_key
  


    def _insert(self):
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """INSERT INTO users(
                email, Password, First_name,Last_name,image_path,api_key) 
                VALUES (?,?,?,?,?,?);"""

            values = (self.email, self.Password, self.First_name,self.Last_name,self.image_path,self.Api_key)
            cursor.execute(SQL, values)

    def save(self):
        if self.pk:
            return
        else:
            self._insert()

    def generate_key(self):
        Api_key = random.randint(1000,100000000000000)
        return Api_key
  
    def get_my_reviews(self):
        my_reviews = Review.all_for_account(self.pk)
        return my_reviews



    @classmethod
    def log_authenticate(cls, email,password):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """SELECT * FROM users WHERE email=? AND password=?;"""
            cursor.execute(SQL, (email, hash_pass(password)))
            row = cursor.fetchone()
            if row:
                return cls(row[0], row[1], row[2],row[3],row[4],row[5],row[6])
            return None


    @classmethod
    def api_authenticate(cls, api_key):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """SELECT * FROM users WHERE api_key=?"""
            cursor.execute(SQL, (api_key,))
            row = cursor.fetchone()
            if row:
                return cls(row[0], row[1], row[2], row[3], row[4],row[5],row[6])
            return None


    @classmethod
    def select_one(cls, email):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """SELECT First_name,Last_name,image_path FROM users WHERE email=?;"""
            cursor.execute(SQL, (email,))
            row = cursor.fetchall()
            return row

    @classmethod
    def selectAll(cls,pk):
            with sqlite3.connect(cls.dbpath) as conn:
                cursor = conn.cursor()
                SQL = """SELECT * FROM users WHERE PK =?;"""
                cursor.execute(SQL,(pk,))
                row = cursor.fetchone()
                return row

    @classmethod
    def pk_authenticate(cls, pk):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """SELECT * FROM users WHERE pk=?"""
            cursor.execute(SQL, (pk,))
            row = cursor.fetchone()
            if row:
                return cls(row[0], row[1], row[2], row[3], row[4],row[5],row[6])
            return None