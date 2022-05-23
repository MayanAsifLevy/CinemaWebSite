import requests

class Subscriptions_WS:
    def __init__(self):
        pass

# ***********************************************************************

    def firstLoadCheck(self):
        resp=requests.get('http://127.0.0.1:5000/')
        return resp.json()


 # ***********************************************************************

    def get_members_data(self):
        resp=requests.get('http://127.0.0.1:5000/members')
        return resp.json()


    def add_member(self, new_member_dict):
        member_id=requests.post('http://127.0.0.1:5000/members', json=new_member_dict)
        return str(member_id.content)
    
    def update_member(self, id, data):
        status=requests.put('http://127.0.0.1:5000/members/'+id, json=data)
        return str(status.content)

    def delete_member(self, id):
        status=requests.delete('http://127.0.0.1:5000/members/'+id)
        return str(status.content)

   # ***********************************************************************

    def get_movies_data(self):
        resp=requests.get('http://127.0.0.1:5000/movies')
        return resp.json()

    def add_movie(self, new_movie_dict):
        movie_id=requests.post('http://127.0.0.1:5000/movies', json=new_movie_dict)
        return str(movie_id.content)
    
    def update_movie(self, id, data):
        status=requests.put('http://127.0.0.1:5000/movies/'+id, json=data)
        return str(status.content)

    def delete_movie(self, id):
        status=requests.delete('http://127.0.0.1:5000/movies/'+id)
        return str(status.content)

    # ***********************************************************************
       
    def get_subscriptions_data(self):
        resp=requests.get('http://127.0.0.1:5000/subscriptions')
        return resp.json()
    
    def add_subscription(self, new_sub_data):
        sub_id=requests.post('http://127.0.0.1:5000/subscriptions', json=new_sub_data)
        return str(sub_id.content)


    def update_movies_data_in_sub(self, id, data):
        status=requests.put('http://127.0.0.1:5000/subscriptions/'+id, json=data)
        return str(status.content)

    def delete_subscription(self, id):
        status=requests.delete('http://127.0.0.1:5000/subscriptions/'+id)
        return str(status.content)
