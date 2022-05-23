import {useNavigate, Outlet} from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import '../movies/Movies_Style.css'
import './sub_style.css'
import {loadMembers, updatePagesStatus} from '../../redux/reducers_actions/a_subscriptions/sub_actions.js'


const Subsciptions=() =>{

    let sub_pages_state =useSelector(state=> state.sub.pages_state)  
    let _token=useSelector(state=> state.users.Token.token)  
    const navigate = useNavigate();

    
    const signed_user= useSelector((state) => state.users.SignedUser);

    const dispatch=useDispatch();

    useEffect(() => {
      dispatch(loadMembers(_token));

      dispatch(updatePagesStatus("All"));
   
     navigate("allMembers")
     
     
    }, []);




  const allMembersHandler=()=>
  {
    dispatch(updatePagesStatus("All"));
    navigate("allMembers")

  }

  const addmemberHandler=()=>
  {
    dispatch(updatePagesStatus("Add"));
    (('Admin') in signed_user["permissions"] || ('Create Subscriptions') in signed_user["permissions"])?navigate("addMember"):navigate("blankPage")
  }
  
    return (
        <div className='moviesPage'>
        <h1>Subscriptions</h1>
          <div className='moviesContainer'>
                
                <div className='moviesNavButtons'>
                

                 { ((sub_pages_state==="All")||(sub_pages_state==="Add"))? <input type= "button" className="MovieButton" onClick={allMembersHandler} style={{ backgroundColor:  sub_pages_state ==="All" ? 'yellow' : '#E0E0E0'}} value="All Members"/>:''}
                 { ((sub_pages_state==="All")||(sub_pages_state==="Add"))? <input type= "button" className="MovieButton" onClick={addmemberHandler} style={{ backgroundColor: sub_pages_state ==="Add"  ? 'yellow' : '#E0E0E0'}} value="Add Member"/>:''}
               
                    
                </div>
    
          </div>
      <br/><br/>

          <main>
            <Outlet/>
          </main>
         
         
         
        </div>
      );
}

export default Subsciptions;

