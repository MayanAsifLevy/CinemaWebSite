from bson import ObjectId
from flask import jsonify
import datetime 

from DAL.moviesDB_dal import MoviesDBDal

class Movies:
    def __init__(self):
        self.movies_dal=MoviesDBDal()

    def get_movies(self):
        movies_list=self.movies_dal.get_all_movies()
        return movies_list

    def convert_data_movie(self, obj):
        prem_date=obj["premiered"]
       
        new_movie={}
        new_movie["Name"]= obj["name"]
        new_movie["Genres"]= obj["genresArr"]
        new_movie["Image"]= obj["image"]
       
        new_movie["Premiered"]=datetime.datetime.strptime(prem_date, '%Y-%m-%d')

        return new_movie
        
    
    def add_movie(self, obj):
        new_movie=self.convert_data_movie(obj)
        movie_id=self.movies_dal.add_movie(new_movie)
        return str(movie_id)

    def update_movie(self, id, obj):
        updated_movie=self.convert_data_movie(obj)
        status=self.movies_dal.update_movie(id, updated_movie)
        return status


    def delete_movie(self, id):
        status=self.movies_dal.delete_movie(id)
        return status

    
       