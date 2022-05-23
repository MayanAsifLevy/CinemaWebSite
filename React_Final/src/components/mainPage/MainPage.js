import { useNavigate, Outlet} from 'react-router-dom'
import './mainPageStyle.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {savePageLocation} from '../../redux/reducers_actions/a_movies/movies_actions'
import {clickLogOut} from '../../redux/reducers_actions/a_users/user_actions'
import * as FirstLoad  from "../../utils/FirstLoad";

function MainPageComp() {
 
  let dispatch = useDispatch();
  const page_location  = useSelector((state) => state.movies.page_location);
  const signed_user= useSelector((state) => state.users.SignedUser);
  const user_permissions_DB=signed_user.permissions
  const is_Admin=  useSelector((state) => state.users.isAdmin);
  const timeOutID=useSelector((state) => state.users.timerID);

  const navigate=useNavigate();

  useEffect(() => {
    
    let dict={}
    try {
    user_permissions_DB.forEach(p=>
      {        
        dict[p]=true
      })
     signed_user["permissions"]=dict
      

     FirstLoad.first_load_check()
    }
    catch{
      alert('the user does not have permissions  - please login')
      navigate('../')

    }
    

  },[])   


  useEffect(() => {
    setSelected(page_location);
    
  }, [page_location]);



  

  const [selected, setSelected] = useState(null);
  const items = ['Movies', 'Subscriptions', 'User Management', 'Logout'];



  const selectedHandler =(itemName)=>{
    setSelected(itemName)
    switch(itemName)
    {
      case "Movies":
        dispatch(savePageLocation("Movies"))
        return (('Admin') in signed_user["permissions"] || ('View Movies') in signed_user["permissions"])?navigate("movies"):navigate("blankPage")

      case "Subscriptions":
        dispatch(savePageLocation("Subscriptions"))
        return (('Admin') in signed_user["permissions"] || ('View Subscriptions') in signed_user["permissions"])?navigate("subscriptions"):navigate("blankPage")
        
      case "User Management":
        dispatch(savePageLocation("User Management"))
        return ('Admin') in signed_user["permissions"]?navigate("userManag"):navigate("blankPage")

      case "Logout":
        clearTimeout(timeOutID);
        dispatch(clickLogOut())
        return navigate("../")

      default:
        return ''
      
     }

  }

    return (
    <div >
      <div className='navContainer'>
            <div className= 'navContainerTitle'>
                Movies WebSite
            </div>
            <div className='navContainerButtons'>
            
             {
               
                items.map(item=>
                {
                  
                  // in case the user is not "Admin" he cant have userManagement button!!
                  return item==='User Management' ?
                  is_Admin && <input type= "button" className="navButton" key= {item} onClick={() =>selectedHandler (item) } style={{ backgroundColor: item === selected ? 'yellow' : '#E0E0E0'}} value={item}/> : 
                      <input type= "button" className="navButton" key= {item} onClick={() =>selectedHandler (item) } style={{ backgroundColor: item === selected ? 'yellow' : '#E0E0E0'}} value={item}/>
                            

                })
                 
             }          
              
            </div>
            <div className='userName'>
              user: {signed_user["First Name"] + " "+ signed_user["Last Name"]}
            </div>

      </div>


      <main>
        <Outlet/>
       
      </main>
     
    </div>
  );
}

export default MainPageComp;
