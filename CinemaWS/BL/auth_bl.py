from flask import make_response, request
import jwt

from DAL.usersDB_dal import UsersDB
from BL.users_bl import Users



class AuthBL:
    def __init__(self):
        self.__key = "secretKeyE0DE73DB7F9828A48EAC75CC76E5FD02401A106"
        self.__algorithm = "HS256"
        
        self.usersDB_dal= UsersDB()
        self.users_bl=Users()

    #----------------------------------------------------------------------------------     
    #---2
    #Check existance of that user in data source and if exists - returns a unique value
    def __check_user(self,username, password):
        users_list= self.usersDB_dal.get_all_users()
        for user in users_list:
            if user['userName']== username and user['password']== password:
                return user['userId']
            
        return None

    #---1
    def get_token(self, username, password):
        user_id = self.__check_user(username,password) #verify against user DB
        if user_id is not None:
            token = jwt.encode({"userid" : user_id},self.__key, self.__algorithm )
            return make_response({"token":token},200)
        else:
            return -1

    #----------------------------------------------------------------------------------

    #---4
    def verify_token(self, token):
        data = jwt.decode(token, self.__key, self.__algorithm)
        user_id = data["userid"]
        users_all_data_list=self.users_bl.get_all_users()
        for u in users_all_data_list["users"]:
            if u["userId"]==user_id:  
                return True, u
        return False,[] ,''    

    


    #---3
    def token_verification(self):
        if request.headers and request.headers.get("x-access-token"):
            token=request.headers.get("x-access-token")
            exist, userData=self.verify_token(token)
            if exist:
                 return userData
            else:
                return "not authorized" # in case the client provided a token which is fake one
        else:
            return "not authorized" # in case the client didnt provid any token

     