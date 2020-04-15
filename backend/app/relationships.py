import sqlite3

class Relationship:

    dbpath = "data/uva.db"

    def __init__(self,pk,email_one,email_two,Action_email,Status=0):
        self.email_one = email_one
        self.email_two = email_two
        self.Action_email = Action_email
        self.pk = pk
        self.Status = Status
      



    def _insert(self):
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """INSERT INTO relationships(
                email_one,email_two,Status,Action_email) 
                VALUES (?,?,?,?);"""
            values = (self.email_one,self.email_two,self.Status,self.Action_email)
            cursor.execute(SQL, values)


    def save(self):
        if self.pk:
            self._update()
        else:
            self._insert()

    
    def update(self):
        with sqlite3.connect(self.dbpath) as conn:
            cursor=conn.cursor()
            SQL = """ UPDATE relationships SET Status = 1
                     WHERE (pk = ?);"""
            cursor.execute(SQL,(self.pk,))
            


    # @classmethod
    # def all_relationships(cls,User_id_one User_id_two):
    #     with sqlite3.connect(cls.dbpath) as conn:
    #         cursor = conn.cursor()
    #         SQL = """SELECT * FROM relationships WHERE pk=?"""
    #         cursor.execute(SQL, (pk,))
    #         data = cursor.fetchall()
    #         return data

  
    @classmethod
    def get_by_pk(cls,pk):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """SELECT * FROM relationships WHERE pk=?"""
            cursor.execute(SQL, (pk,))
            row = cursor.fetchone()
            if row:
                return cls(row[0], row[1], row[2], row[3], row[4])
            return None


    @classmethod
    def user_one_authenticate(cls,email_one):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """SELECT * FROM relationships WHERE email_one=?"""
            cursor.execute(SQL, (email_one,))
            row = cursor.fetchone()
            if row:
                return cls(row[0], row[1], row[2], row[3], row[4])
            return None

  
    @classmethod
    def get_pending (cls,email_two):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor=conn.cursor()
            SQL = """SELECT email_one,pk FROM relationships WHERE email_two = ? AND Status = 0"""
            cursor.execute(SQL,(email_two,))
            row = cursor.fetchall()
            return row
    
    
    

    @classmethod
    def get_friends (cls,email_two):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor=conn.cursor()
            SQL = """SELECT email_one FROM relationships WHERE email_two = ? AND Status = 1"""
            cursor.execute(SQL,(email_two,))
            row = cursor.fetchall()
            return row
           