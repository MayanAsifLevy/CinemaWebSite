import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {updatePagesStatus} from '../../redux/reducers_actions/a_movies/movies_actions'
import {userAdd} from '../../redux/reducers_actions/a_users/user_actions'


const AddUser =()=>{

            
    let dispatch = useDispatch();
    const navigate = useNavigate();
    
    const _token= useSelector(state=> state.users.Token.token)
    
    let [editUser, setEditUser]=useState({fname: '', lname:'', userName:'' , sessionTO:'', created_date:'',  permissions:[]})
       
  
    
    let [permissionsSettings, setPermissionsSettings] = useState({ "View Subscriptions": false,  "Create Subscriptions": false, "Delete Subscriptions": false, "Update Subscriptions": false,
    "View Movies": false,  "Create Movies": false, "Delete Movies": false, "Update Movies": false})
    
    // list of all permissions possible
     const perSet_keys=Object.keys(permissionsSettings)
     //console.log("perSet_keys", perSet_keys)

    useEffect (()=>
    {
               
        dispatch(updatePagesStatus("Add"));
    },[])

  
  
  //---------------------------------- checkbox  ----------------------------------------------------------------------

    const onChangeA_VS = () => {
        setPermissionsSettings({...permissionsSettings, "View Subscriptions": !permissionsSettings["View Subscriptions"]})
        
    }

    const onChangeA_CS = () => {
            setPermissionsSettings({...permissionsSettings, "Create Subscriptions": !permissionsSettings["Create Subscriptions"],  "View Subscriptions": true})
           
        }

    const onChangeA_DS = () => {
            setPermissionsSettings({...permissionsSettings, "Delete Subscriptions": !permissionsSettings["Delete Subscriptions"],  "View Subscriptions": true})
            
        }

    const onChangeA_US = () => {
            setPermissionsSettings({...permissionsSettings, "Update Subscriptions": !permissionsSettings["Update Subscriptions"],  "View Subscriptions": true})
            
        }

    const  onChangeA_VM = () => {
            setPermissionsSettings({...permissionsSettings, "View Movies": !permissionsSettings["View Movies"]})
           
        }
    
    const  onChangeA_CM = () => {
        setPermissionsSettings({...permissionsSettings, "Create Movies": !permissionsSettings["Create Movies"],  "View Movies": true})
       
    }

    const  onChangeA_DM = () => {
        setPermissionsSettings({...permissionsSettings, "Delete Movies": !permissionsSettings["Delete Movies"],  "View Movies": true})
       
    }

    const  onChangeA_UM = () => {
        setPermissionsSettings({...permissionsSettings, "Update Movies": !permissionsSettings["Update Movies"],  "View Movies": true})
        
    }

   
  //-------------------------------------------------------------------------------------------------------------
  


    const SubmitSaveUser=(e)=>
    {
        e.preventDefault();

        let new_permission_for_user=[]
        perSet_keys.forEach(per=>
            {
                if (permissionsSettings[per]===true)
                {
                    new_permission_for_user.push(per)
                }
            })

           
          const x=({...editUser, permissions:new_permission_for_user})
              
          dispatch(userAdd(x,_token))
          dispatch(updatePagesStatus("All"));
          navigate("../allUsers")

    }


    const CancelCreation=()=>{
        dispatch(updatePagesStatus("All"));
        navigate("../allUsers")
    }

    return(
       <form className="AddMovie_form" onSubmit={e=>SubmitSaveUser(e)}>
       
           <h1>Add New User</h1>
            <div >
                First Name: <input type="text"   onChange={(e)=>setEditUser({...editUser, fname: e.target.value}) }/> <br/>
                Last Name: <input type="text"   onChange={(e)=>setEditUser({...editUser, lname: e.target.value}) }/> <br/>
                User Name: <input type="text" onChange={(e)=>setEditUser({...editUser, userName: e.target.value}) }/> <br/>
                Seassion time out (Minutes): <input type="text"   onChange={(e)=>setEditUser({...editUser, sessionTO: e.target.value}) }/> <br/>
                Created date (mm-dd-yyyy): <input type="date"  onChange={(e)=>setEditUser({...editUser, created_date: e.target.value}) }/> <br/>
                Permissions:
             
                 <div>
                    <div className="form-check">
                        <label className="form-check-label">    
                                 <input type="checkbox" checked={permissionsSettings["View Subscriptions"]}  onChange={onChangeA_VS}   className="form-check-input" />
                            View Subscriptions
                        </label>
                    </div>
                  
                    <div className="form-check">
                        <label className="form-check-label">
                                 <input type="checkbox" checked={permissionsSettings["Create Subscriptions"]}  onChange={onChangeA_CS}   className="form-check-input" />
                            Create Subscriptions
                        </label>
                    </div>

                    <div className="form-check">
                        <label className="form-check-label">
                                 <input type="checkbox" checked={permissionsSettings["Delete Subscriptions"]}  onChange={onChangeA_DS}   className="form-check-input" />
                            Delete Subscriptions
                        </label>
                    </div>

                    <div className="form-check">
                        <label className="form-check-label">
                                 <input type="checkbox" checked={permissionsSettings["Update Subscriptions"]}  onChange={onChangeA_US}   className="form-check-input" />
                             Update Subscriptions
                        </label>
                    </div>

                   
                    <div className="form-check">
                        <label className="form-check-label">
                                 <input type="checkbox" checked={permissionsSettings["View Movies"]}  onChange={onChangeA_VM}   className="form-check-input" />
                            View Movies
                        </label>
                    </div>
                   

                    <div className="form-check">
                        <label className="form-check-label">
                                 <input type="checkbox" checked={permissionsSettings["Create Movies"]}  onChange={onChangeA_CM}   className="form-check-input" />
                            Create Movies
                        </label>
                    </div>

                    <div className="form-check">
                        <label className="form-check-label">
                                 <input type="checkbox" checked={permissionsSettings["Delete Movies"]}  onChange={onChangeA_DM}   className="form-check-input" />
                            Delete Movies
                        </label>
                    </div>

                    <div className="form-check">
                        <label className="form-check-label">
                                 <input type="checkbox" checked={permissionsSettings["Update Movies"]}  onChange={onChangeA_UM}   className="form-check-input" />
                             Update Movies
                        </label>
                    </div>


                 </div>
                      
          

                <div className="addMovieButtons">
                    <input type="submit" value= "Save" />
                    <input type="button" value= "Cancel"  onClick={CancelCreation}/>
                </div>
                    

            </div> 
           
       </form>
    )
}

export default AddUser;