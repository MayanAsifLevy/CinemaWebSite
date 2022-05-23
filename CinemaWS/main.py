from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
import json
from bson import ObjectId, datetime

from BL.auth_bl import AuthBL
from BL.users_bl import Users
from BL.members_bl import Members
from BL.movies_bl import Movies
from BL.subscriptions_bl import Subscriptions

app = Flask(__name__)
CORS(app)

#  **************************************************
class MyEncoder (json.JSONEncoder):
    def default(self, obj):
        if isinstance(self, ObjectId) or isinstance(obj, datetime.datetime) or isinstance(obj, datetime.date):
            return str(obj)
        return super(MyEncoder, self).default(obj)

app.json_encoder=MyEncoder

#  **************************************************

auth_bl=AuthBL()
users_bl=Users()
members_bl=Members()
movies_bl=Movies()
subscriptions_bl=Subscriptions()

#  **************************************************

@app.route('/firstload',methods=['GET'])
def firstLoad_data():   
    resp= auth_bl.token_verification()  
    if resp == "not authorized":
        return jsonify("The user is not autorized")
    else:
        status=subscriptions_bl.firstLoad_Check()
        return jsonify(status)


   
#  **************************************************
@app.route('/createAccount',methods=['GET'])
def get_usernames():
    userNameList = users_bl.get_usernames()
    return jsonify(userNameList)

@app.route('/createAccount/<string:id>',methods=['PUT'])
def update_password(id):
    data = request.json
    status = users_bl.update_password(data, id)
    return jsonify(status)

#  **************************************************

@app.route('/login',methods=['POST'])
def login():
    data = request.json
    username =data["username"] #data['body']["username"]
    passowrd = data["password"] #data['body']["password"]
    token = auth_bl.get_token(username,passowrd)
    if token!=-1:
        return token
    else:
        return jsonify(-1) 

@app.route('/login',methods=['GET'])
def get_login():
    userData= auth_bl.token_verification()
    if userData == "not authorized":
        return jsonify("you are not authorized")
    else:
        return jsonify(userData)

#  **************************************************
@app.route('/users',methods=['GET'])
def get_users_data():
    resp= auth_bl.token_verification()  
    if resp == "not authorized":
        return jsonify("The user is not autorized")
    else:
        data=users_bl.get_all_users()
        return jsonify(data["users"])


@app.route('/users', methods= ['POST'])
def add_user():
        data = request.json
        users_bl.add_user(data)
        return jsonify("added user")



@app.route('/users/<string:id>', methods= ['PUT'])
def update_user(id):
        data = request.json
        users_bl.update_user(id, data)
        return jsonify("updated user")
   

@app.route('/users/<string:id>', methods= ['DELETE'])
def delete_user_data(id):
    users_bl.delete_user(id)
    return jsonify("deleted user")


#  **************************************************


@app.route('/members',methods=['GET'])
def get_members_data():
    resp= auth_bl.token_verification()  
    if resp == "not authorized":
        return jsonify("The user is not autorized")
    else:
        data=members_bl.get_all_members()
        return jsonify(data)


@app.route('/members',methods=['POST'])
def post_member_data():
    data = request.json
    member_id=members_bl.add_member(data)
    return jsonify(member_id)
 
@app.route('/members/<string:id>', methods= ['PUT'])
def update_member_data(id):
    data = request.json
    status=members_bl.update_member(id, data)
    return jsonify(status)

@app.route('/members/<string:id>', methods= ['DELETE'])
def delete_member_data(id):
    status=members_bl.delete_member(id)
    return jsonify(status)

#  **************************************************
 
@app.route('/movies',methods=['GET'])
def get_movies_data():
    resp= auth_bl.token_verification()  
    if resp == "not authorized":
        return jsonify("The user is not autorized")
    else:
        data=movies_bl.get_all_movies()
        return jsonify(data)
 
@app.route('/movies',methods=['POST'])
def post_movie_data():
    data = request.json
    movie_id=movies_bl.add_movie(data)
    return jsonify(movie_id)
 

@app.route('/movies/<string:id>', methods= ['PUT'])
def update_movie_data(id):
    data = request.json
    status=movies_bl.update_movie(id, data)
    return jsonify(status)


@app.route('/movies/<string:id>', methods= ['DELETE'])
def delete_movie_data(id):
    status=movies_bl.delete_movie(id)
    return jsonify(status)

#  **************************************************
 

@app.route('/subscriptions',methods=['GET'])
def get_subscriptions_data():
    resp= auth_bl.token_verification()  
    if resp == "not authorized":
        return jsonify("The user is not autorized")
    else:
        data=subscriptions_bl.get_all_subscriptions()
        return jsonify(data)
 

@app.route('/subscriptions',methods=['POST'])
def add_subscription_data():
    data = request.json
    new_sub_id=subscriptions_bl.add_subscription(data)
    return jsonify(new_sub_id)
 

@app.route('/subscriptions/<string:id>',methods=['PUT'])
def update_movies_data_in_sub(id):
    data = request.json
    status=subscriptions_bl.update_movies_data_in_sub(id,data)
    return jsonify(status)
 
@app.route('/subscriptions/<string:id>', methods= ['DELETE'])
def delete_sub_data(id):
    status=subscriptions_bl.delete_subscription(id)
    return jsonify(status)
 #  **************************************************

if __name__== '__main__':
    app.run(port=8000)
