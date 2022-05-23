import datetime
import re

from DAL.subscriptions_dal import Subscriptions_WS

class Members:
     def __init__(self):
         self.subscription_dal=Subscriptions_WS()

     def get_all_members(self):
         data=self.subscription_dal.get_members_data()
         return data


     def add_member(self, data):
          member_id=self.subscription_dal.add_member(data)
          result = re.findall('"([^"]*)"', member_id)
          return result[0]
     
     
     def update_member(self, id, data):
          status=self.subscription_dal.update_member(id, data)
          result = re.findall('"([^"]*)"', status)
          return result[0]

     def delete_member(self, id):
          status=self.subscription_dal.delete_member(id)
          result = re.findall('"([^"]*)"', status)
          return result[0]