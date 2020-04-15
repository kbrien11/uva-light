import sqlite3
from .util import get_links



class Food:
    dbpath = "data/uva.db"

    def __init__(self,pk,Name,City,Cuisine_style,Ranking,Rating,Price_range,Number_of_reviews,Reviews,menu,menu_link):
        self.Name = Name
        self.City = City
        self.Ranking = Ranking
        self.Rating = Rating
        self.Price_range = Price_range
        self.Number_of_reviews = Number_of_reviews
        self.Reviews = Reviews
        self.pk = pk
        self.menu = menu
        self.menu_link = menu_link
        


    #     def _insert(self):
    #       with sqlite3.connect(self.dbpath) as conn:
    #         cursor = conn.cursor()
    #         SQL = """INSERT INTO food(
    #             Name,City,Ranking,Rating,Price_range,Number_of_reviews,Reviews) 
    #             VALUES (?,?,?,?,?,?,?);"""

    #         values = (self.name, self.City, self.Ranking,self.Rating,self.Price_range,self.Number_of_reviews,self.Reviews)
    #         cursor.execute(SQL, values)

    # def save(self):
    #     if self.pk:
    #         return
    #     else:
    #         self._insert()

    @classmethod
    def all_restaurants_city(cls,City):
            with sqlite3.connect(cls.dbpath) as conn:
                cursor = conn.cursor()
                sql = """SELECT * FROM food WHERE City = ?"""
                cursor.execute(sql, (City,))
                results = cursor.fetchmany(15)
                return results
    @classmethod
    def all_restaurants_offset(cls,City,num):
            with sqlite3.connect(cls.dbpath) as conn:
                cursor = conn.cursor()
                sql = """ SELECT * FROM food WHERE City = ? LIMIT 0,{}""".format(num)
                cursor.execute(sql, (City,))
                results = cursor.fetchall()
                return results

    @classmethod
    def all_restaurants_offset_two(cls,City,Rating,num):
            with sqlite3.connect(cls.dbpath) as conn:
                cursor = conn.cursor()
                sql = """ SELECT * FROM food WHERE City = ? AND Rating=? LIMIT 0,{}""".format(num)
                cursor.execute(sql, (City,Rating))
                results = cursor.fetchall()
                return results

    @classmethod
    def rating_city(cls,City,Rating):
            with sqlite3.connect(cls.dbpath) as conn:
                cursor = conn.cursor()
                sql = """SELECT * FROM food WHERE City=? AND Rating=?"""
                cursor.execute(sql, (City,Rating))
                results = cursor.fetchmany(15)
                return results

    @classmethod
    def price_filter(cls,City, Price_range):
            with sqlite3.connect(cls.dbpath) as conn:
                cursor = conn.cursor()
                sql = """SELECT * FROM food WHERE City=? AND Price_range = '$' """
                cursor.execute(sql, (City,))
                results = cursor.fetchmany(15)
                return results

    @classmethod
    def price_one_offset(cls,City,Price_range,num):
            with sqlite3.connect(cls.dbpath) as conn:
                cursor = conn.cursor()
                sql = """ SELECT * FROM food WHERE City = ? AND Price_range ='$' LIMIT 0,{}""".format(num)
                cursor.execute(sql, (City,))
                results = cursor.fetchall()
                return results
    
    @classmethod
    def price_filter_two(cls,City, Price_range,num):
            with sqlite3.connect(cls.dbpath) as conn:
                cursor = conn.cursor()
                sql = """SELECT * FROM food WHERE City=? AND Price_range = '$$ - $$$' LIMIT 0,{} """.format(num)
                cursor.execute(sql, (City,))
                results = cursor.fetchall()
                return results

    @classmethod
    def price_filter_four(cls,City, Price_range,num):
            with sqlite3.connect(cls.dbpath) as conn:
                cursor = conn.cursor()
                sql = """SELECT * FROM food WHERE City=? AND Price_range = '$$$$' LIMIT 0,{} """.format(num)
                cursor.execute(sql, (City,))
                results = cursor.fetchall()
                return results
 
    @classmethod
    def price_filter_italian(cls,City, Cuisine_style,num):
            with sqlite3.connect(cls.dbpath) as conn:
                cursor = conn.cursor()
                sql = """SELECT * FROM food WHERE City=? AND Cuisine_style LIKE "%'Italian'%" LIMIT 0,{} """.format(num)
                cursor.execute(sql, (City,))
                results = cursor.fetchall()
                return results

    @classmethod
    def price_filter_asian(cls,City, Cuisine_style,num):
            with sqlite3.connect(cls.dbpath) as conn:
                cursor = conn.cursor()
                sql = """SELECT * FROM food WHERE City=? AND Cuisine_style LIKE "%'Asian'%" LIMIT 0,{} """.format(num)
                cursor.execute(sql, (City,))
                results = cursor.fetchall()
                return results


    @classmethod
    def name_authenticate(cls, Rating):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """SELECT * FROM food WHERE Rating = ?"""
            cursor.execute(SQL, (Rating,))
            row = cursor.fetchone()
            if row:
                return cls(row[0], row[1], row[2], row[3], row[4],row[5],row[6],row[7],row[8],row[9],row[10])   
            return None

    @classmethod
    def price_authenticate(cls, City):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """SELECT * FROM food WHERE City = ?"""
            cursor.execute(SQL, (City,))
            row = cursor.fetchone()
            if row:
                return cls(row[0], row[1], row[2], row[3], row[4],row[5],row[6],row[7],row[8],row[9],row[10])
            return None


    @classmethod
    def food_authenticate(cls, Name,City):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """SELECT * FROM food WHERE Name = ? AND City=?"""
            cursor.execute(SQL, (Name,City))
            row = cursor.fetchone()
            if row:
                return cls(row[0], row[1], row[2], row[3], row[4],row[5],row[6],row[7],row[8],row[9],row[10])           
            return None   

    @classmethod
    def all_cities(cls):
        with sqlite3.connect(cls.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """SELECT * FROM food """
            cursor.execute(SQL,)
            row = cursor.fetchone()
            if row:
                return cls(row[0], row[1], row[2], row[3], row[4],row[5],row[6],row[7],row[8],row[9],row[10])
            return None


    @classmethod
    def vacation_five(cls,City,Rating,Price_range):
         with sqlite3.connect(cls.dbpath) as conn:
                cursor = conn.cursor()
                sql = """SELECT * FROM food WHERE City=? AND Rating =5 AND Price_range ="$" LIMIT 10"""
                cursor.execute(sql, (City,))
                results = cursor.fetchall()
                return results