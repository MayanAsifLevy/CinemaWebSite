import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch } from "react-redux";
import {movieUpdate, updatePagesStatus} from '../../redux/reducers_actions/a_movies/movies_actions'


const EditMovie =()=>{

    const movie_selected =useSelector(state=> state.movies.movie).item 

    const navigate = useNavigate();
    const movie_id=movie_selected.id
 //   console.log("movie_id",movie_id )
    const [editMovie, setEditMovie]=useState({name: movie_selected.Name, genresStr:'',genresArr:movie_selected.Genres, image:movie_selected.Image, premiered:movie_selected.Premiered})
 //   console.log("editMovie", editMovie)
    const movieName=movie_selected.Name
    const _token= useSelector(state=> state.users.Token.token)

    
    let dispatch = useDispatch();

    useEffect(()=>
    {
    
        let genres_list=movie_selected.Genres
        let genres_str=''
      
        genres_list.forEach(genre=> {
            if (genres_str.length>0)
                {
                genres_str= genres_str+',' + genre
                }
                else
                {
                genres_str=  genre
                }
            })
        setEditMovie({...editMovie, genresStr: genres_str})

        //-------------------------------------------------------

        dispatch(updatePagesStatus("Edit"));
        
    },[])



const genresHandler =(e)=>
{
   const new_genresStr= e.target.value;
   const update_GenresArr=new_genresStr.split(",")
   setEditMovie({...editMovie, genresStr:new_genresStr ,genresArr: update_GenresArr})
  // console.log("genresHendler", editMovie)

 }


    const SubmitUpdateMovie=(e)=>
    {
        e.preventDefault();

     //   console.log(editMovie)

      
        dispatch(movieUpdate(editMovie, movie_id, _token ))
        dispatch(updatePagesStatus("All"));
        navigate("../allMovies")

    }

    const CancelCreation=()=>{
        dispatch(updatePagesStatus("All"));
        navigate("../allMovies")
    }

    return(
        <form className="AddMovie_form" onSubmit={e=>SubmitUpdateMovie(e)}>
           <h1>Edit Movie: {movieName}</h1>
            <div >
                Name: <input type="text"  value= {editMovie.name} onChange={(e)=>setEditMovie({...editMovie, name: e.target.value}) }/> <br/>
                Genres:<input type="text"  value= {editMovie.genresStr} onChange={genresHandler }/> <br/> 
                Image url: <input type="url" value= {editMovie.image} onChange={(e)=>setEditMovie({...editMovie, image: e.target.value}) }/> <br/>
                Premired: <input type="date"value= {editMovie.premiered}  onChange={(e)=>setEditMovie({...editMovie, premiered: e.target.value}) }/>  (mm/dd/yyyy) <br/><br/>  
                   

                <div className="addMovieButtons">
                    <input type="submit" value= "Update" />
                    <input type="button" value= "Cancel"  onClick={CancelCreation}/>
                </div>
                    

            </div> 
        </form>
    )
}

export default EditMovie;