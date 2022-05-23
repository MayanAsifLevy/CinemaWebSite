from DAL.membersFile_dal import members_ws_data
from DAL.moviesFile_dal import movies_url_data
from DAL.membersDB_dal import MembersDBDal
from DAL.moviesDB_dal import MoviesDBDal

import datetime 

class FirstUpload:
    def __init__(self):
        self.membersWS=members_ws_data()
        self.moviesWS=movies_url_data()
        self.members_DB=MembersDBDal()
        self.movies_DB=MoviesDBDal()
        

    
    def get_members_WS(self):
        WS_memebers_list=self.membersWS.get_members_data()

        arr_members_2_upload=[]

        for m in WS_memebers_list:
            member={}
            member["Name"]=m["name"]
            member["Email"]=m["email"]
            member["City"]=m["address"]["city"]
        
            arr_members_2_upload.append(member)
        return arr_members_2_upload

    
    def get_movies_WS(self):
        WS_movies_list=self.moviesWS.get_movies_data()
        arr_movies_2_upload=[]

        for mo in WS_movies_list:
            movie={}
            movie["Name"]=mo["name"]
            movie["Genres"]=mo["genres"]
            movie["Image"]=mo["image"]["medium"]
            movie["Premiered"]= datetime.datetime.strptime(mo["premiered"] , '%Y-%m-%d')
        
            arr_movies_2_upload.append(movie)
        return arr_movies_2_upload

    
    def first_load(self):
        membersDB_length=len(self.members_DB.get_all_members())
        moviesDB_length=len(self.movies_DB.get_all_movies())
        
        if membersDB_length==0:
            upload_members=self.get_members_WS()
            for m in upload_members:
                self.members_DB.add_member(m)
        if moviesDB_length==0:
            upload_movies=self.get_movies_WS()
            for mo in upload_movies:
                self.movies_DB.add_movie(mo)

          
        






            



