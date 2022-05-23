
import requests

class members_ws_data:
    def __init__(self):
        pass

    def get_members_data(self):
        resp=requests.get('https://jsonplaceholder.typicode.com/users')
        return resp.json()
