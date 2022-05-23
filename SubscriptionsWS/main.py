from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
import json
from bson import ObjectId, datetime
from BL.members_bl import Members
from BL.movies_bl import Movies
from BL.subscriptions_bl import Subscriptions
from BL.firstLoad import FirstUpload

app = Flask(__name__)
CORS(app)

members_bl=Members()
movies_bl=Movies()
subscriptions_bl=Subscriptions()
firstLoad=FirstUpload()


class MyEncoder (json.JSONEncoder):
    def default(self, obj):
        if isinstance(self, ObjectId) or isinstance(obj, datetime.datetime) or isinstance(obj, datetime.date):
            return str(obj)
        return super(MyEncoder, self).default(obj)

app.json_encoder=MyEncoder

# ******************************************************

@app.route('/', methods= ['GET'])
def firstUplaod():
    firstLoad.first_load()
    return jsonify('uploaded')


# ******************************************************

@app.route('/members', methods=['GET'])
def get_members():
        members_list=members_bl.get_members()
        return jsonify(members_list)


@app.route('/members', methods=['POST'])
def add_member():
        new_member = request.json
        member_id=members_bl.add_member(new_member)  
        return jsonify(member_id)


@app.route('/members/<string:id>', methods=['PUT'])
def update_member(id):
        updated_member = request.json
        status=members_bl.update_member(id, updated_member)
        return jsonify(status)


@app.route('/members/<string:id>', methods=['DELETE'])
def delete_member(id):
        status=members_bl.delete_member(id)
        return jsonify(status)


# ******************************************************

@app.route('/movies', methods=['GET'])
def get_movies():
        movies_list=movies_bl.get_movies()
        return jsonify(movies_list)



@app.route('/movies', methods=['POST'])
def add_movie():
        new_movie = request.json
        movie_id=movies_bl.add_movie(new_movie)
        return jsonify(movie_id)


@app.route('/movies/<string:id>', methods=['PUT'])
def update_movie(id):
        updated_movie = request.json
        status=movies_bl.update_movie(id, updated_movie)
        return jsonify(status)

@app.route('/movies/<string:id>', methods=['DELETE'])
def delete_movie(id):
        status=movies_bl.delete_movie(id)
        return jsonify(status)

        
# ******************************************************

@app.route('/subscriptions', methods=['GET'])
def get_subscriptions():
        subscriptions_list=subscriptions_bl.get_all_subscriptions()
        return jsonify(subscriptions_list)

@app.route('/subscriptions', methods=['POST'])
def add_subscription():
        new_subscriptions = request.json
        sub_id=subscriptions_bl.add_subscription(new_subscriptions)
        return jsonify(sub_id)


@app.route('/subscriptions/<string:id>', methods=['PUT'])
def add_movie_2_subscription(id):
        new_subscription = request.json
        status=subscriptions_bl.update_sub(id, new_subscription)
        return jsonify(status)

@app.route('/subscriptions/<string:id>', methods=['DELETE'])
def delete_subscriptions(id):
        status=subscriptions_bl.delete_sub(id)
        return jsonify(status)

# ******************************************************

if __name__== '__main__':
    app.run(port=5000)


