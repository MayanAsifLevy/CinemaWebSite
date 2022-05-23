import datetime
from DAL.usersDB_dal import UsersDB
from DAL.usersFile_dal import UserFile
from DAL.permissionsFile_dal import PermissionsFile
import re

class Users:
    def __init__(self):
        self.userDB_dal=UsersDB()
        self.userFile_dal=UserFile()
        self.permissions_dal=PermissionsFile()

#-------------- for login ---------------------
    def get_usernames(self):
         users_DB=self.userDB_dal.get_all_users()
         username_list=[]
         
         for ud in users_DB:
             u={}
             u["userId"]=ud["userId"]
             u["userName"]=ud["userName"]
             username_list.append(u)
         return username_list

    
    def update_password(self, data, id):
        status=self.userDB_dal.update_user_pswd(id, data)
        return status

    def get_signed_user(self, id):
        all_users=self.get_all_users()
        signed_user=filter(lambda x: x.userId==id, all_users)
        return signed_user

#-------------- for  ---------------------
        



    def get_all_users(self):
        users_DB=self.userDB_dal.get_all_users()
        users_file=self.userFile_dal.get_all_users_data()
        users_permissions=self.permissions_dal.get_permissions()
        user_data={"users":[]}
        for ud in users_DB:
            user={}
            user["userId"]=ud["userId"]
            user["userName"]=ud["userName"]

            for uf in users_file["users"]:
                if ud["userId"]==uf["userId"]:
                    user["First Name"]=uf["First Name"]
                    user["Last Name"]=uf["Last Name"]
                    user["created_date"]=uf["created_date"] #datetime.datetime.strptime(uf["created_date"] , '%Y-%m-%d')
                    user["sessionTimeOut"]=uf["sessionTimeOut"]

            for up in users_permissions["permissions"]:
                if ud["userId"]==up["userId"]:
                    user["permissions"]=up["permissions"]
              
            user_data["users"].append(user)
        return user_data


    def add_user(self, data):
        users_arr=self.get_all_users()
        username=data["userName"]
        id=self.userDB_dal.add_user(username)

        new_user={}
        new_user["userId"]=id
        new_user["userName"]=username
        new_user["First Name"]=data["fname"]
        new_user["Last Name"]=data["lname"]
        new_user["created_date"]= data["created_date"] # mayan
        new_user["sessionTimeOut"]=int(data["sessionTO"])
      
        users_arr["users"].append(new_user)
        self.userFile_dal.add_update_user(users_arr)

        users_permissions=self.permissions_dal.get_permissions()
        nUser={}
        nUser["userId"]=id
        nUser["permissions"]=data["permissions"]

        users_permissions["permissions"].append(nUser)
        self.permissions_dal.add_update_permissions(users_permissions)


    def update_user(self, id, data):
        users_arr=self.get_all_users()
        username=data["userName"]
        self.userDB_dal.update_user(id, username)

        for u in users_arr["users"]: #check userId
            del u['permissions']
            if u["userId"]==str(id):
                u["userName"]=data["userName"]
                u["First Name"]=data["fname"]
                u["Last Name"]=data["lname"]
                u["created_date"]= data["created_date"] # mayan
                u["sessionTimeOut"]=int(data["sessionTO"])
              
        self.userFile_dal.add_update_user(users_arr)

        users_permissions=self.permissions_dal.get_permissions()
        for u in users_permissions["permissions"]:
            if (u["userId"]==id):
                # list_permissions=data["permissions"]
                u["permissions"]=data["permissions"]
        self.permissions_dal.add_update_permissions(users_permissions)
        
    
    def delete_user(self, id):
        users_arr=self.get_all_users()
        for a in range(len(users_arr["users"])): #check userId
             del users_arr["users"][a]['permissions']

        for a in range(len(users_arr["users"])): #check userId       
            if users_arr["users"][a]["userId"]==str(id):
                del users_arr["users"][a]
                break
        self.userFile_dal.add_update_user(users_arr)

        users_permissions=self.permissions_dal.get_permissions()
        for i in range(len(users_permissions["permissions"])):
            if (users_permissions["permissions"][i]["userId"]==id):
                del users_permissions["permissions"][i]
                break
        self.permissions_dal.add_update_permissions(users_permissions)

        

        self.userDB_dal.delete_user(id)





















               
                 


