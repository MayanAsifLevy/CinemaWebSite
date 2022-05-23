from flask import jsonify
import json
import os

class PermissionsFile:
    def __init__(self):
        pass

    def get_permissions(self):
        path=os.path.join(os.getcwd(), "Data/Permissions.json")
        with open (path,'r') as f:
            data=json.load(f)
        return data

    def add_update_permissions(self, data):
        path=os.path.join(os.getcwd(), "Data/Permissions.json")
        with open (path,'w') as f:
            data=json.dump(data, f)