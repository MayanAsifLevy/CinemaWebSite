import datetime
from flask import jsonify
import re

from DAL.subscriptions_dal import Subscriptions_WS

class Movies:
     def __init__(self):
          self.subscription_dal=Subscriptions_WS()

     def get_all_movies(self):
          data=self.subscription_dal.get_movies_data()
          return data

     def add_movie(self, data):
          movie_id=self.subscription_dal.add_movie(data)
          result = re.findall('"([^"]*)"', movie_id)
          return result[0]
     
     
     def update_movie(self, id, data):
          status=self.subscription_dal.update_movie(id, data)
          result = re.findall('"([^"]*)"', status)
          return result[0]

     def delete_movie(self, id):
          status=self.subscription_dal.delete_movie(id)
          result = re.findall('"([^"]*)"', status)
          return result[0]