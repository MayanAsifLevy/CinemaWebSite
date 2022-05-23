import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePagesStatus, movieAdd} from '../../redux/reducers_actions/a_movies/movies_actions'


const AddMovie =()=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [newMovie, setNewMovie]=useState({name: '', genresStr:'',genresArr:[], image:'', premiered:''})
    const _token= useSelector(state=> state.users.Token.token)

    const genresHandler=(e)=>
    {
        const new_genresStr= e.target.value;
        const update_GenresArr=new_genresStr.split(",")
        setNewMovie({...newMovie, genresStr:new_genresStr ,genresArr: update_GenresArr})
    }

    const SubmitCreateMovie=(e)=>
    {
        e.preventDefault();
            
        if (newMovie.name==='' || newMovie.image===''|| newMovie.premiered==='' )
        {
            alert ("please add data or leave this page by clicking on 'Cancel'")
        }
        else
        {
            // console.log("newMovie", newMovie)
            dispatch(movieAdd(newMovie, _token))
            dispatch(updatePagesStatus("All"))
            navigate("../allMovies")
        }
    }
      

    const CancelCreation=()=>{
        dispatch(updatePagesStatus("All"));
        navigate("../allMovies")
    }

    return(
        <form className="AddMovie_form" onSubmit={e=>SubmitCreateMovie(e)}>
           <h1>Add Movie</h1>
            <div >
                Name: <input type="text" id="name" onChange={(e)=>setNewMovie({...newMovie, name: e.target.value}) }/> <br/>
                Genres:<input type="text" id="genres" onChange={genresHandler} /> (please use , between genres - example: x, y, z) <br/>
                Image url: <input type="url" id="url" onChange={(e)=>setNewMovie({...newMovie, image: e.target.value}) }/> <br/>
                
                  
        
                    Premired: <input type="date" id="premired" onChange={(e)=>setNewMovie({...newMovie, premiered: e.target.value}) }/>  (mm/dd/yyyy) <br/><br/>  
                   

                <div className="addMovieButtons">
                    <input type="submit" value= "Save" />
                    <input type="button" value= "Cancel"  onClick={CancelCreation}/>
                </div>
                    

            </div>
        </form>
    )
}

export default AddMovie;