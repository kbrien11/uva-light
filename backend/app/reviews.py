import sqlite3

class Review:
    dbpath = "data/uva.db"

    def __init__(self,pk,Rating,Food_name,Email,city,first,last,image):
        self.pk = pk
        self.Rating = Rating
        self.Food_name = Food_name
        self.Email = Email
        self.city = city
        self.first = first
        self.last = last
        self.image = image
        
 


    def save(self):
        if self.pk:
            self._update()
        else:
            self._insert()



    def _insert(self):
        with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """INSERT INTO reviews
                    (Food_name, Rating,Email,city,first,last,image)
                    VALUES (?,?,?,?,?,?,?);"""
            values = (self.Food_name,self.Rating,self.Email,self.city,self.first,self.last,self.image)
            cursor.execute(SQL, values)

    def _update(self):
         with sqlite3.connect(self.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """UPDATE reviews SET Number_of_reviews=?
                    WHERE (Food_name=?, City =?Rating=?);"""
            values = (self.Number_of_reviews,self.Food_name, self.City,self.Rating)
            cursor.execute(SQL, values)


    @classmethod
    def all_for_account(cls, Email):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """SELECT city, Rating, Food_name,first,last,image FROM reviews WHERE Email=?"""
            cursor.execute(SQL, (Email,))
            data = cursor.fetchall()
            return data


    @classmethod
    def one_from_account(cls,Email):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """SELECT DISTINCT city FROM reviews WHERE Email=?"""
            cursor.execute(SQL,(Email,))
            data = cursor.fetchall()
            return data
    @classmethod
    def ones_from_account(cls,Email):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """SELECT DISTINCT first,last,image FROM reviews WHERE Email=?"""
            cursor.execute(SQL,(Email,))
            data = cursor.fetchall()
            return data

    @classmethod
    def select_city(cls,Email,city):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """SELECT DISTINCT city FROM reviews WHERE Email =?"""
            cursor.execute(SQL,(Email,city))