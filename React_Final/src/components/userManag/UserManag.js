import {useNavigate, Outlet} from 'react-router-dom'
import { useEffect} from 'react';
import '../movies/Movies_Style.css'
import { updatePagesStatus } from '../../redux/reducers_actions/a_movies/movies_actions'
import {saveAllUsers} from '../../redux/reducers_actions/a_users/user_actions'
import { useDispatch, useSelector } from 'react-redux';


const UserManag=() =>{
   
    let movies_pages_state =useSelector(state=> state.movies.pages_state)   
    let _token=useSelector(state=> state.users.Token.token)   
    
    const navigate = useNavigate();
    const dispatch=useDispatch();


    useEffect(() => {
        
            dispatch(saveAllUsers(_token))        
        
            dispatch(updatePagesStatus("All"));
    
        
            navigate("allUsers")
     
     
    }, []);

       


    const allUsersHandler=()=>
    {
        dispatch(updatePagesStatus("All"));
        navigate("allUsers")

    }

    const addUsersHandler=()=>
    {
        dispatch(updatePagesStatus("Add"));
        navigate("addUser")
        
    }


        
    //---------------------


    
        return (
            <div className='moviesPage'>
            <h1>Users</h1>
            <div className='moviesContainer'>
                    
                    <div className='moviesNavButtons'>
                    
                  {((movies_pages_state==="All")||(movies_pages_state==="Add"))?  <input type= "button" className="MovieButton" onClick={allUsersHandler} style={{ backgroundColor:  movies_pages_state ==="All" ? 'yellow' : '#E0E0E0'}} value="All Users"/>:''}
                  {((movies_pages_state==="All")||(movies_pages_state==="Add"))?  <input type= "button" className="MovieButton" onClick={addUsersHandler} style={{ backgroundColor: movies_pages_state ==="Add"  ? 'yellow' : '#E0E0E0'}} value="Add User"/>:''}
                                    
                    </div>
        
            </div>
            
        
            <br/><br/>   

            <main>
                <Outlet/>
            </main>
            
            
            
            </div>
        );
}

export default UserManag;