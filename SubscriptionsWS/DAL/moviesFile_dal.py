import requests

class movies_url_data:
    def __init__(self):
        pass

    def get_movies_data(self):
        resp=requests.get('https://api.tvmaze.com/shows')
        return resp.json()