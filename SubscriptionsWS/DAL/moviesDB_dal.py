from flask import jsonify
from pymongo import MongoClient
from bson import ObjectId

class MoviesDBDal:
    def __init__(self):
        self.__client = MongoClient(port=27017)
        self.__db = self.__client["FullStack1_Subscriptions"] 
        self.__movies=self.__client["FullStack1_Subscriptions"]['Movies']

    def get_all_movies(self):
        movies=[]
      #  recrods= self.__db['Movies'].find({})
        recrods=self.__movies.find({})
        for r in recrods:
            rec={}
            rec["id"]=str(r["_id"])
            rec["Name"]=r["Name"]
            rec["Genres"]=r["Genres"]
            rec["Image"]=r["Image"]
            rec["Premiered"]=r["Premiered"]      
            
            movies.append(rec)
        return movies

    def add_movie(self,obj):
        new_movie=self.__movies.insert_one(obj)
        return new_movie.inserted_id

    def update_movie(self, id, obj):
        self.__movies.update_one({'_id' :ObjectId(id) } , {"$set" : obj} )
        return ('Movie was updated!')

    def delete_movie(self, id):
        self.__movies.delete_one({'_id' : ObjectId(id) })
        return ('Movie was deleted!')

         