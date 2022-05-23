from flask import jsonify
import json
import os


class UserFile:
    def __init__(self):
        pass

    def get_all_users_data(self):
        path=os.path.join(os.getcwd(), "Data/Users.json")
        with open (path,'r') as f:
            data=json.load(f)
        return data
    
    def add_update_user(self, data):
        path=os.path.join(os.getcwd(), "Data/Users.json")
        with open (path,'w') as f:
            data=json.dump(data, f)

    