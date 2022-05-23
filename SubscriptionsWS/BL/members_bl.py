from bson import ObjectId

from DAL.membersDB_dal import MembersDBDal
from DAL.subscriptionsDB_dal import SubscriptionsDBDal

class Members:
    def __init__(self):
        self.member_dal=MembersDBDal()
        self.subscriptions_dal=SubscriptionsDBDal()

    def get_members(self):
        members_list=self.member_dal.get_all_members()
        return members_list

        
    
    def add_member(self, obj):       
        member_id=self.member_dal.add_member(obj)
        return str(member_id)

    def update_member(self, id, obj):
        status=self.member_dal.update_member(id, obj)
        return status

    def delete_member(self, id):
        status=self.member_dal.delete_member(id)
        return status

