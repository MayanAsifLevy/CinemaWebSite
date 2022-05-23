import Subscriptions from './WhoWatched'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {saveSelectMovie, movieDelete} from '../../redux/reducers_actions/a_movies/movies_actions'
import {checkAndDelMoviesFromSub} from '../../redux/reducers_actions/a_subscriptions/sub_actions'


const MovieComp =(movie)=>{

  let dispatch = useDispatch();
  const navigate = useNavigate();

  const signed_user= useSelector((state) => state.users.SignedUser);
  const _token= useSelector(state=> state.users.Token.token)

  let genres_str=''
  movie.item.Genres.forEach(genre=> {
    if (genres_str.length>0)
    {
      genres_str= genres_str+', '+ genre
    }
    else
    {
      genres_str=  genre
    }
  })

  let date = new Date(movie.item.Premiered); 
  let movie_year=date.getFullYear();
  //console.log(movie.item);
  
  const EditHandler=()=>
  {
      dispatch(saveSelectMovie(movie))
      

      navigate("../editPage")

  }

  const DeleteHandler=()=>
  {
    //console.log("movie.id",movie.item.id)
    dispatch(movieDelete(movie.item.id, _token)) 
    alert ("movie was deleted")

    dispatch(checkAndDelMoviesFromSub(movie.item.id, _token))


    navigate("../allMovies")
   
  }
  let str1=movie.item.Image.slice(-3)

//  console.log("date", date.getFullYear())

      
      // console.log("movie", movie)
    return(
        <div className= "movieComp">
          <h1>{movie.item.Name} , {movie_year}</h1>
          <h3>genres: {genres_str}</h3>
          {/* <h3>movie id: {movie.item.id}</h3>           */}

          <div className="url_and_sub">
              <div className='div_imp'>
              {str1==='jpg'?   <img className='img' alt= {movie.item.Image} src={movie.item.Image}/>: <h1>"Img"</h1>}
              </div>
              <div className= "subscription">
             
                <Subscriptions key={movie.item.sub_id+ movie.item.id} item={movie.item.subscription_user_list}/>

              </div>
          </div>
          <div className='footerButtons'>
            {(('Admin') in signed_user["permissions"] || ('Update Subscriptions') in signed_user["permissions"])?<input type="button" value="Edit" onClick= {EditHandler}/>:''}
            {(('Admin') in signed_user["permissions"] || ('Delete Subscriptions') in signed_user["permissions"])?<input type="button" value="Delete" onClick= {DeleteHandler}/>:''}  
          </div>

        </div>
    )
}

export default MovieComp;
