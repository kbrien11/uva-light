import csv
import sqlite3
from utils import get_link,get_address



def dump_employees(filepath):
    with open(filepath, 'r') as input_csv:
        reader = csv.reader(input_csv)
        next(reader)
        for line in reader:
            Name = line[1]
            City = line[2]
            Cuisine_style = line[3]
            Ranking = line[4]
            Rating = line[5]
            Price_range = line[6]
            Number_of_reviews = line[7]
            Reviews = line[8]
            menu =line[9]
            menu_link = line[9]
            address = line[9]
            add_value(Name,City,Cuisine_style,Ranking,Rating,Price_range,Number_of_reviews,Reviews,menu,get_link(menu_link),get_address(address))
 
def add_value(Name,City,Cuisine_style,Ranking,Rating,Price_range,Number_of_reviews,Reviews,menu,menu_link,address):
    with sqlite3.connect("uva.db") as conn:
        cursor = conn.cursor()

        SQL = """ INSERT INTO food (Name,City,Cuisine_style,Ranking,Rating,Price_range,Number_of_reviews,Reviews,menu,menu_link,address)
            VALUES (?,?,?,?,?,?,?,?,?,?,?)"""

        cursor.execute(SQL, (Name,City,Cuisine_style,Ranking,Rating,Price_range,Number_of_reviews,Reviews,menu,menu_link,address))


if __name__=="__main__":
   dump_employees("UpdatedFood.csv")