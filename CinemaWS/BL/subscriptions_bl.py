import datetime
import re

from DAL.subscriptions_dal import Subscriptions_WS

class Subscriptions:
     def __init__(self):
         self.subscription_dal=Subscriptions_WS()

     def firstLoad_Check(self):
         data=self.subscription_dal.firstLoadCheck()
         return data


     def get_all_subscriptions(self):
         data=self.subscription_dal.get_subscriptions_data()
         return data

     def add_subscription (self, data):
          new_sub_id=self.subscription_dal.add_subscription(data)
          result = re.findall('"([^"]*)"', new_sub_id)
          return result[0]

     def update_movies_data_in_sub (self, id, data):
          status=self.subscription_dal.update_movies_data_in_sub(id, data)
          result = re.findall('"([^"]*)"', status)
          return result[0]

     def delete_subscription(self, id):
          status=self.subscription_dal.delete_subscription(id)
          result = re.findall('"([^"]*)"', status)
          return result[0]