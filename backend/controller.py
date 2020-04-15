from flask import Flask,flash, request, render_template, redirect, session, jsonify,url_for
import sqlite3
import os
from flask_cors import CORS
from werkzeug.utils import secure_filename
from app import User,Review,Food,Relationship,Message
from app.util import hash_pass,get_links





User.dbpath = "data/uva.db"

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = '/mnt/c/Users/kbrie/OneDrive/Documents/Project_Yelp/backend/photos'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods=['GET'])
def homepage():
        return render_template('help.html')

@app.route('/create/', methods=['POST'])
def create_account():
    data = request.get_json()
    new_user = User(None,data['Email'],data['password'],data['First_name'],data['Last_name'],data['image_path'])
    new_user.Api_key = new_user.generate_key()
    new_user.save()
    if new_user:
        return jsonify({"message":data['image_path']})
    return jsonify({"message":"failed"})

@app.route('/login',methods = ['POST'])
def signin():
    data = request.get_json()
    Email = data.get("Email")
    password = data.get("password")
    account = User.log_authenticate(Email,password)
    if account:
        return jsonify({"token":account.Api_key})
    return jsonify({"token": ""})

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['GET','POST'])
def upload():
    if request.method =='POST':
        print(request.files)
        # if 'image_path' not  in request.files:
        #     # flash('No file port')
        #     return jsonify({"upload": "existed"})
        file = request.files['file']
        # if file.filename == '':
        #     # flash('No seleclted file')
        #     return jsonify({"upload": "no file selected"})
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER,filename))
            return jsonify({"upload":"success"})
    return jsonify({"message":"failed"})




@app.route('/friendRequest/<user_two>', methods =['POST'])
def friend_request(user_two):
    data = request.get_json()
    api_key = data.get("api_key")
    new_user = User.api_authenticate(api_key)
    friend = Relationship.user_one_authenticate(user_two)
    if new_user:
        new_request = Relationship(None,new_user.email,user_two,new_user.email,0)
        new_request.save()
        return jsonify({"token":new_user.Api_key})
    return jsonify({"message":"failed"})

@app.route('/message/<email>/<message>', methods =['POST'])
def message(email,message):
    data = request.get_json()
    api_key = data.get("api_key")
    times = data.get("time_stamp")
    new_user = User.api_authenticate(api_key)
    new_request = Message(None,data['email'],new_user.email,data['message'],new_user.image_path,new_user.First_name,new_user.Last_name,times)
    new_request.save()
    if new_request:
        return jsonify({"token":times})
    return jsonify({"message":"failed"})



@app.route('/getfriends/<api_key>', methods = ['GET'])
def get_pending_friends(api_key):
        token = User.api_authenticate(api_key)
        if token:
            view_friends = Relationship.get_pending(token.email)
            print(view_friends)
            return jsonify({"friends":view_friends})
        return jsonify({"message":"failed"})

@app.route('/getmessages/<api_key>', methods = ['GET'])
def get_messages(api_key):
        token = User.api_authenticate(api_key)
        if token:
            view_friends = Message.get_messages(token.email)
            print(view_friends)
            return jsonify({"friends":view_friends,"token":token.Api_key})
        return jsonify({"message":"failed"})

@app.route('/getacceptedfriends/<api_key>',methods = ['GET'])
def get_accepted_friends (api_key):
    token = User.api_authenticate(api_key)
    if token:
        friends = Relationship.get_friends(token.email)
        return jsonify({"friends":friends, "token":token.Api_key})
    return jsonify({"message":"failed"})
# @app.route('/getUsers/<pk>' , methods = ['GET'])
# def get_users(pk) :
#         new_user = Relationship.user_one_authenticate(pk)
#         user_list = Relationship.seepending(new_user.User_id_one)
#         if user_list:
#             return jsonify({"users":user_list})
#         return jsonify({"message":"failed"})


@app.route('/api/searchuser/<Email>',methods=["GET"])
def searchuser(Email):
        data=request.get_json()
        review = Review.all_for_account(Email)
        if review:
            return jsonify({"reviews":review})
        return jsonify({"message":"failed"})

@app.route('/api/searchusers/<Email>',methods=["GET"])
def searchusers(Email):
        data=request.get_json()
        review = Review.one_from_account(Email)
        if review:
            return jsonify({"reviews":review})
        return jsonify({"message":"failed"})

@app.route('/api/searchuserss/<Email>',methods=["GET"])
def searchuserss(Email):
        data=request.get_json()
        review = Review.ones_from_account(Email)
        if review:
            return jsonify({"reviews":review})
        return jsonify({"message":"failed"})

@app.route('/api/finduser/<api_key>',methods =['GET'])
def finduser(api_key):
    token_key = User.api_authenticate(api_key)
    if token_key:
        user = User.select_one(token_key.email)
        if user:
            return jsonify({"users":user})
    return jsonify({"message":"failed"})

@app.route('/api/users/<token>' , methods = ['GET'])
def users(token):
    tokens = User.api_authenticate(token)
    if tokens:
        results = tokens.select_one(tokens.email)
        return jsonify({"results":results,"token":tokens.Api_key})
    return jsonify({"message":"failed"})

    
@app.route('/acceptfriend/<pk>', methods = ['POST'])
def acceptFriend(pk):
    data = request.get_json()
    api_key = data.get("api_key")
    token = User.api_authenticate(api_key)
    if token:
        friends = Relationship.get_by_pk(pk)
        friend= friends.update()
        print(friend)
        if friend:
            return jsonify({"token":token.Api_key})
    return jsonify({"message":"failed"})


@app.route('/api/onereview/<token>',methods =['GET'])
def getReview (token):
    token = User.api_authenticate(token)
    email = Review.all_for_account(token.email)
    if email:
        return jsonify({"reviews":email})
    return jsonify({"token":""})            


@app.route('/api/rating/<rating>', methods=['GET'])
def lookup_rating(rating):
        user = Food.name_authenticate(rating)
        restaurants = Food.rating_city(user.City,rating)
        if restaurants:
            return jsonify ({"rest":restaurants})
        return jsonify({"No restaurant here,":restaurants})



# @app.route('/api/price/<city>/<price>', methods=['GET'])
# def lookup_price(city,price):
#         restaurants = Food.filter_price(city,price)
#         if restaurants:
#           return jsonify ({"restaurants": restaurants})
#             #    return jsonify({"pk":results[0],"name":results[1], "city":results[2], "cuisine_style":results[3],"ranking":results[4],"rating":results[5],"price_range":results[6],"number_of_reviews":results[7],"reviews":results[8]})
#         return jsonify({"No restaurant here,":restaurants})


@app.route('/api/addreview/<api_key>/<name>/<city>', methods = ['POST'])
def addReview(api_key,name,city):
    example = User.api_authenticate(api_key)
    example_two = Food.food_authenticate(name,city)
    if example:
            data=request.get_json()
            new_review =Review(0,name,data['Rating'],example.email,city,example.First_name,example.Last_name,example.image_path)
            new_review.save()
            if new_review:
              return jsonify({"token":example.Api_key})
    return jsonify({"token":""})




@app.route('/api/city/<city>', methods=['GET'])
def lookup_ranking(city):
        restaurants = Food.all_restaurants_city(city)
        if restaurants:
            return jsonify ({"restaurants": restaurants})
        return jsonify({"No restaurant here,":"city"})

@app.route('/api/city/<num>/<city>', methods=['GET'])
def offset(city,num=5):
        restaurants = Food.all_restaurants_offset(city,int(num) + 5)
        if restaurants:
           return jsonify ({"restaurant": restaurants})
        #    return jsonify({"pk":results[0],"name":results[1], "city":results[2], "cuisine_style":results[3],"ranking":results[4],"rating":results[5],"price_range":results[6],"number_of_reviews":results[7],"reviews":results[8]})
        return jsonify({"No restaurant here,":city})

@app.route('/api/price_one/offset/<city>/<price_range>/<num>',  methods =['GET'])
def price_one_offset(city,price_range,num = 5):
    user = Food.price_authenticate(city)
    food = user.price_one_offset(user.City, price_range, int(num) +5)
    if food:
        return jsonify ({"restaurant": food})
    return jsonify({"No restaurant here,":food})

@app.route ('/city/<city>/<price_range>', methods =['GET'])
def filter_price(city,price_range):
    user = Food.price_authenticate(city)
    rest = user.price_filter(user.City,price_range)
    print(rest)
    if rest:
        return jsonify ({"restaurant": rest})
    return jsonify({"No restaurant here,":rest})

@app.route ('/price/<city>/<price_range>/<num>', methods =['GET'])
def filter_price_two(city,price_range,num = 5):
    user = Food.price_authenticate(city)
    rest = user.price_filter_two(user.City,price_range,int(num) +5)
    print(rest)
    if rest:
        return jsonify ({"restaurant": rest})
    return jsonify({"No restaurant here,":rest})

@app.route ('/price_four/<city>/<price_range>/<num>', methods =['GET'])
def filter_price_four(city,price_range, num = 5):
    user = Food.price_authenticate(city)
    rest = user.price_filter_four(user.City,price_range, int(num) + 5)
    print(rest)
    if rest:
        return jsonify ({"restaurant": rest})
    return jsonify({"No restaurant here,":rest})

@app.route ('/italian/<city>/<cuisine>/<num>', methods =['GET'])
def filter_price_asian(city,cuisine,num=5):
    user = Food.price_authenticate(city)
    rests = user.price_filter_italian(user.City,cuisine,int(num) + 5)
    if rests:
        return jsonify ({"restaurant": rests})
    return jsonify({"No restaurant here,":rests})


@app.route ('/asian/<city>/<cuisine>/<num>', methods =['GET'])
def filter_price_italian(city,cuisine, num =5):
    user = Food.price_authenticate(city)
    rests = user.price_filter_asian(user.City,cuisine, int(num) + 5)
    if rests:
        return jsonify ({"restaurant": rests})
    return jsonify({"No restaurant here,":rests})

@app.route('/api/suggest/<city>/<rating>/<price_range>', methods=['GET'])
def suggest(city,rating,price_range):
    user = Food.price_authenticate(city)
    restaurants = Food.vacation_five(user.City,rating,price_range)
    if restaurants:
        return jsonify ({"restaurant": restaurants})
    return jsonify({"No restaurant here,":restaurants})


@app.route('/api/rating/<rating>/<num>', methods =['GET'])
def offset_rating(rating,num =5):
    user = Food.name_authenticate(rating)
    rest = Food.all_restaurants_offset_two(user.City,rating,int(num) +5)
    if rest:
        return jsonify ({"restaurant": rest})

    return jsonify({"No restaurant here,":rest})
            
# @app.route('/review', methods=['GET','POST'])
# def leave_review():
#     if request.method == 'GET':
#         return render_template("review.html")
#     else: 
#         if request.method =='POST':
#             Food_name = request.form['Food_name']
#             Rating = request.form['Rating']
#             Email = request.form['Email']
#             City = request.form['City']
#             new_user = User.email_authenticate(Email)
#             if new_user:
#                 user = Review(None,Rating,Food_name,City,new_user.pk)
#                 add_review(Food_name,City,Rating,user.Number_of_reviews,user.users_pk)
               
# @app.route('/search',methods = ['GET','POST'])
# def search():
#     if request.method =='GET':
#         return render_template('search.html')
#     else:
#         if request.method =='POST':
#             email = request.form['email']
#             user = User.email_authenticate(email)
#             if user:
#                 user_one = user.get_my_reviews()
#                 return render_template('search_two.js', value=user_one, account=user.Email)
#             else:
#                 return render_template('search.html', response = 'Email does not exist')


# @app.route('/login', methods=['GET', 'POST'])
# def log_in():
#     if request.method == 'GET':
#         return render_template('login.html')
#     else:
#         email = request.form['email']
#         password = request.form['password']
#         if check_user(email, password):
#             return render_template('help_two.html',message=email)
#         else:
#             return render_template('login.html', message="Login Error")

def check_user( email, password):
        with sqlite3.connect(User.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """SELECT * FROM users WHERE Email=? AND password=?;"""
            cursor.execute(SQL, (email,hash_pass(password)))
            row = cursor.fetchone()
            if row:
                return (row[0], row[1], row[2])
            return None

def add_user(email,password,first_name,last_name):
        with sqlite3.connect(User.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """INSERT INTO users(
                Email, Password,First_name,Last_name) 
                VALUES (?,?);"""
            values = (email, hash_pass(password),first_name,last_name)
            cursor.execute(SQL, values)

def add_review(name,city,rating,Number_of_reviews,users_pk):
    with sqlite3.connect(User.dbpath) as conn:
            cursor = conn.cursor()
            SQL = """INSERT INTO reviews (
                Food_name, City, Rating,Number_of_reviews,users_pk) 
                VALUES (?,?,?,?,?);"""
            values = (name,city,rating,Number_of_reviews,users_pk)
            cursor.execute(SQL, values)

def search_city(city):
    with sqlite3.connect(User.dbpath) as conn:
        cursor = conn.cursor()
        sql = """SELECT * FROM food WHERE City=? LIMIT 10"""
        cursor.execute(sql, (city,))
        result = cursor.fetchone()
        if result:
            return jsonify({"name":result[0], "city":result[1], "cuisine_style":result[2],"ranking":result[3],"rating":result[4],"price_range":result[5],"number_of_reviews":result[6],"reviews":result[7]})
        else:
            return None





if __name__ == "__main__":
    app.run(debug=True , port = 5000)