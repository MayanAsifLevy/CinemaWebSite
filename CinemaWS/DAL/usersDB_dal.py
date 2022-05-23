from pymongo import MongoClient
from bson import ObjectId

class UsersDB:
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["FullStack1_Users"] 


    

    def get_all_users(self):
        users=[]
        recrods= self.__db["Users"].find({})
        for r in recrods:
            rec={}
            rec["userId"]=str(r["_id"])
            rec["userName"]=r["userName"]
            rec["password"]=r["password"]
            
            users.append(rec)
        return users

    def add_user(self,username):
        # add user to DB in order to get the id
        new_user={}
        new_user["userName"]=username
        new_user["password"]=""
        self.__db["Users"].insert_one(new_user)
        
        # return the id to users_bl in order to craete a record in usersFile
        recrod= self.__db["Users"].find({"userName":username})
        for r in recrod:
            id=str(r["_id"])
        return id

         
    def update_user(self, id,username ):
        self.__db['Users'].update_one({'_id' :ObjectId(id) } , {"$set" :  { "userName": username } } )

        
    def update_user_pswd(self, id,data ):
        self.__db['Users'].update_one({'_id' :ObjectId(id) } , {"$set" :  { "userName": data["userName"], "password": data["password"] } } )
        return ("password was updated")

    def delete_user(self, id ):
        self.__db['Users'].delete_one({'_id' :ObjectId(id) } )
        return ('user was deleted!')

