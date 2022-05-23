from pymongo import MongoClient
from bson import ObjectId

class MembersDBDal:
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["FullStack1_Subscriptions"] 
        self.__members=self.__client["FullStack1_Subscriptions"]['Members']

    def get_all_members(self):
        members=[]
        recrods= self.__members.find({})
        for r in recrods:
            rec={}
            rec["id"]=str(r["_id"])
            rec["Name"]=r["Name"]
            rec["Email"]=r["Email"]
            rec["City"]=r["City"]
            
            members.append(rec)
        return members


    def add_member(self,obj):
        new_member=self.__members.insert_one(obj)
        return new_member.inserted_id

    def add_all_members(self,obj):
        self.__members.insertMany(obj)
    
    def update_member(self, id, obj):
        self.__members.update_one({'_id' :ObjectId(id) } , {"$set" : obj} )
        return ('Member was updated!')
        
    def delete_member(self, id):
        self.__members.delete_one({'_id' : ObjectId(id) })
        return ('Member was deleted!')
