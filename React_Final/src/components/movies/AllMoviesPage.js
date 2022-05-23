import MovieComp from "./MovieComp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {savePageLocation} from '../../redux/reducers_actions/a_movies/movies_actions'

//----------------------------------------------------------------


const AllMovies =()=>{
    let movies =useSelector(state=> state.movies.movies)
    const movies_selected =useSelector(state=> state.movies.search_movies)
   
   const dispatch=useDispatch()

    useEffect (()=>{
        dispatch(savePageLocation("Movies"))
    },[])
 
     if (movies_selected.length>0)
    {
        movies=movies_selected
    }

    return(
        <div className='allMoviesComp'>
             <br/>
                {
                   
                    (movies_selected!=="None") &&
                       movies.map((movie)=>{
                        return <MovieComp key= {movie.id} item={movie}/>;
                        }
                            
                            )
                    
                

                }
        
            
        </div>
    )
}

export default AllMovies;