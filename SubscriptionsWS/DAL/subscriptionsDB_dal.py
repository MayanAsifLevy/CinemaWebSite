from pymongo import MongoClient
from bson import ObjectId

class SubscriptionsDBDal:
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["FullStack1_Subscriptions"] 
        self.__subscriptions=self.__client["FullStack1_Subscriptions"]['Subscriptions']

    def get_all_subscriptions(self):
        subscriptions=[]
        recrods= self.__subscriptions.find({})
        for r in recrods:
            rec={}
            rec["subscriptionId"]=str(r["_id"])
            rec["memberId"]=str(r["memberId"])
            
            mo=[]
            for m in  r["movies"]:
                sub={}
                sub["movieID"]=str(m["movieID"])
                sub["date"]=m["date"]
                mo.append(sub)

            rec["movies"]=mo
        
            
            subscriptions.append(rec)
        return subscriptions

    def add_subsciprtion(self,obj):
        new_subcpt_id=self.__subscriptions.insert_one(obj)
        return new_subcpt_id.inserted_id

    
    def update_sub(self, id, obj):
        self.__subscriptions.update_one({'_id' :ObjectId(id) } , {"$set" : obj} )
        return ('Subscription was updated!')

        
    def delete_sub(self, id):
        self.__subscriptions.delete_one({'_id' : ObjectId(id) })
        return ('Subscription was deleted!')
