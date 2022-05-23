//import Subscriptions from './WhoWatched'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {saveSelectUser, userDelete} from '../../redux/reducers_actions/a_users/user_actions'


const UserComp =(user)=>{

  const _token= useSelector(state=> state.users.Token.token)

  let dispatch = useDispatch();
  const navigate = useNavigate();
  let isAdmin=false

  //console.log("usercomp", user)
  let permissions_str=''
  
  user.item.permissions.forEach(perms=> {
    // make sue the admin is mark as so
    if (perms==='Admin')
    {
      isAdmin=true
    }

    // create teh permissions str for the site
    if (permissions_str.length>0)
    {
      permissions_str= permissions_str+', '+ perms
    }
    else
    {
      permissions_str=  perms
    }
  })


  
  const EditHandler=()=>
  {
      dispatch(saveSelectUser(user))
      

      navigate("../editUser")

  }

  const DeleteHandler=()=>
  {
    
    //console.log("user.id",user.item.userId)
    dispatch(userDelete(user.item.userId, _token)) 
   

    navigate("../allUsers")
   
  }
 

      
    return(
        
        <div className= "movieComp">
          <br/>
          <div className="adminComp">
                {isAdmin?<h1 style= {{color:"red",  float:"right", padding: "50px"}}>ADMIN</h1>  :''}
          </div>

          <h3>Name: {user.item["First Name"]} {user.item["Last Name"]}</h3>
          <h3>User Name:   {user.item.userName}</h3>
          <h3>Session time out (minutes):   {user.item.sessionTimeOut}</h3>
          <h3>Created Date (yyyy-mm-dd):   {user.item.created_date}</h3>
          <h3>Permissions:   {permissions_str}</h3>

        

          <div className='footerButtons'>
            <input type="button" value="Edit" onClick= {EditHandler}/>
           {!isAdmin ?<input type="button" value="Delete" onClick= {DeleteHandler}/> :''}
          </div>

        </div>
    )
}

export default UserComp;
