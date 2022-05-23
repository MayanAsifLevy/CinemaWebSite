import { useNavigate, Outlet, useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react';
import './Movies_Style.css'
import {loadMovies, updatePagesStatus, updateSearchList, keepFindString } from '../../redux/reducers_actions/a_movies/movies_actions'
import { useDispatch, useSelector } from 'react-redux';


const MoviesPage=() =>{

    let movies_pages_state =useSelector(state=> state.movies.pages_state)  
    let movies= useSelector(state=> state.movies.movies) 
    const signed_user= useSelector((state) => state.users.SignedUser);
    let _token=useSelector(state=> state.users.Token.token)   
    
    
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const location = useLocation();

    useEffect(() => {
     
      if (location.state)
      {
        //console.log("location",location.state.movieName);
      dispatch(keepFindString(location.state.movieName))
      setFindWord(location.state.movieName)
      findWord=location.state.movieName
      findHandle(findWord)
      }
      
         dispatch(loadMovies(_token));
      dispatch(updatePagesStatus("All"));
   
      
      navigate("allMovies")
     
     
    }, []);

    let find_string= useSelector(state=> state.movies.find_str) 
    
    let [findWord, setFindWord]=useState(find_string)

     


  const allMoviesHandler=()=>
  {
    dispatch(updatePagesStatus("All"));
    navigate("allMovies")

  }

  const addMoviesHandler=()=>
  {
    dispatch(updatePagesStatus("Add"));
    (('Admin') in signed_user["permissions"] || ('Create Movies') in signed_user["permissions"])?navigate("addMovie"):navigate("blankPage")
    
  }


  const findHandle=()=>
  {
    
    if (findWord.length>0)
    {
      //console.log("findWord", findWord)
      let searched_movie_list=[]  
            
      // search movies list to find the words in the search box (findWord) 
      movies.filter(movie=> 
        movie.Name.toUpperCase().includes(findWord.toUpperCase())
        ).forEach(m=>
          {
            searched_movie_list.push(m);
          })
    

        dispatch(keepFindString(findWord))

          if (searched_movie_list.length>0)
          {      
            
            dispatch (updateSearchList(searched_movie_list))
          }
          else
          {
           
            dispatch (updateSearchList('None'))
          }
    }
    
    else{
      dispatch(keepFindString(''))
      dispatch (updateSearchList(''))
    }
      
 //---------------------


  }
    return (
        <div className='moviesPage'>
        <h1>Movies</h1>
          <div className='moviesContainer'>
                
                <div className='moviesNavButtons'>
                

                 { ((movies_pages_state==="All")||(movies_pages_state==="Add"))? <input type= "button" className="MovieButton" onClick={allMoviesHandler} style={{ backgroundColor:  movies_pages_state ==="All" ? 'yellow' : '#E0E0E0'}} value="All Movies"/>:''}
                 { ((movies_pages_state==="All")||(movies_pages_state==="Add"))? <input type= "button" className="MovieButton" onClick={addMoviesHandler} style={{ backgroundColor: movies_pages_state ==="Add"  ? 'yellow' : '#E0E0E0'}} value="Add Movie"/>:''}
                 {(movies_pages_state==="All")? <h3> Find Movie: </h3> :''}
                 {(movies_pages_state==="All")? <input type= "text" value= {findWord} className="MovieButton"  onChange={e=> setFindWord(e.target.value)}/>:''}
                 {(movies_pages_state==="All")? <input type="button" value="Find" className="MovieButton" onClick= {findHandle}/>:''}
                
                    
                </div>
    
          </div>
        
    

          <main>
            <Outlet/>
          </main>
         
         
         
        </div>
      );
}

export default MoviesPage;

