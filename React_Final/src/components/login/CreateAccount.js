import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './loginStyle.css'
import * as utils from "../../utils/LoginUtils";



const CreateAccount = ()=>
{
    const navigation=useNavigate();

        
    useEffect(() => {
        getUsers();
    },[]); 
        
    let userId=''
    const[user, setUser]=useState({userName: '', password: ''})
    const [allUserNamesfromDB, setAllUserNamesfromDB]=useState([])

    

    const getUsers = async () => {
        const users_list=  await utils.GetUserNames_list();
        setAllUserNamesfromDB(users_list)
};

    const SubmitNewAccount=  async (e)=>
    {
         e.preventDefault();
        const filtered=  allUserNamesfromDB.filter(u=> u.userName===user.userName)
      
        
        //the username was found in the DB
        if (filtered.length>0)
        {
            userId=filtered[0]["userId"]
          
            //update the new password in teh DB - per username
             const status=await updatePass(user, userId )
             alert (status)
             navigation("/")

        }
        else{
            alert("The username '" + user.userName + "' was not found in the database - please contact your Admin")
            navigation("/")
        }
    
        
    }

    
    const updatePass = async(user_data,user_id)=>
    {
        const status= await utils.UpdateUserPassword(user_data,user_id);
        return status;
    }


    return(
       
        <form  className="login_container" onSubmit={SubmitNewAccount} >
            <div>
                <h1>Create an Account</h1>
            </div>
            <div >
                User name: <input type="text" id="usename"  onChange={e=> setUser({...user, userName: e.target.value})} /> <br/>
                Password: <input type="text" id="pswd"  autoComplete="off" onChange={e=> setUser({...user, password: e.target.value})} /> <br/>
                <input type="submit" value= "Create" />
                <br/> <br/>              

            </div>

           
           
        </form>
    )
}

export default CreateAccount;