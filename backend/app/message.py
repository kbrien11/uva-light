import sqlite3

class Message:

    dbpath = "data/uva.db"


    def __init__(self,pk,email,sender,message,image,first,last,time_stamp=""):
        self.email = email
        self.sender = sender
        self.message = message
        self.pk = pk
        self.time_stamp = time_stamp
        self.image = image
        self.first = first
        self.last = last
        

    def _insert(self):
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """INSERT INTO messages(
                email,sender,message,image,first,last,time_stamp) 
                VALUES (?,?,?,?,?,?,?);"""
            values = (self.email,self.sender,self.message,self.image,self.first,self.last,self.time_stamp)
            cursor.execute(SQL, values)

    
    def save(self):
        if self.pk:
            return
        else:
            self._insert()


    @classmethod
    def get_messages (cls,email):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor=conn.cursor()
            SQL = """SELECT message,sender,time_stamp,image,first,last FROM messages WHERE email = ?;"""
            cursor.execute(SQL,(email,))
            row = cursor.fetchall()
            return row

    @classmethod
    def email_authenticate(cls, email):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """SELECT * FROM messages WHERE email = ? """
            cursor.execute(SQL, (email,))
            row = cursor.fetchone()
            if row:
                return cls(row[0], row[1], row[2],row[3],row[4],row[5],row[6])
            return None   