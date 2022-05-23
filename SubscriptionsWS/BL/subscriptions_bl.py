from bson import ObjectId

from DAL.subscriptionsDB_dal   import SubscriptionsDBDal


class Subscriptions:
    def __init__(self):
        self.subscriptions_dal=SubscriptionsDBDal()

    def get_all_subscriptions(self):
        Subscriptions_list=self.subscriptions_dal.get_all_subscriptions()
        return Subscriptions_list

    def convert_data_to_objectId(self, obj):
        objectid_obj={}
        objectid_obj["memberId"]=ObjectId(obj["memberId"])
       
        movies_list=[]
        for m in obj['movies']:
            mov_dict={}
            mov_dict["movieID"]=ObjectId(m["movieID"])
            # mov_dict["date"]=datetime.datetime.strptime(m_watch_date, '%Y-%m-%d')
            mov_dict["date"]=m["date"]
            movies_list.append(mov_dict)
        objectid_obj['movies']=movies_list


        return objectid_obj


        
    def add_subscription(self, obj):
        objectid_obj=self.convert_data_to_objectId(obj)
        sub_id=self.subscriptions_dal.add_subsciprtion(objectid_obj)
        return str(sub_id)


    def update_sub(self, id, obj):
        objectid_obj=self.convert_data_to_objectId(obj)
        status=self.subscriptions_dal.update_sub(id, objectid_obj)
        return status

       
    def delete_sub(self, id):
        status=self.subscriptions_dal.delete_sub(id)
        return status
