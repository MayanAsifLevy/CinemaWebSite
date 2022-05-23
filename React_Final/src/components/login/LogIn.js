import {Link, useNavigate} from 'react-router-dom'
import './loginStyle.css'
import {  useRef } from "react";
import * as LoginUtils  from "../../utils/LoginUtils";
import { useDispatch, useSelector } from "react-redux";
import {saveToken, saveLoginUser,  saveTimerID, checkIsAdmin, clickLogOut} from '../../redux/reducers_actions/a_users/user_actions'
import { useEffect } from 'react';

const Login = ()=>
{
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const timeOut = (t)=>
    {  let timerId= setTimeout(function(){alert("Time is up for this session!"); navigate("/") }, t)    
    return timerId
   
}

    const timeOutID=useSelector((state) => state.users.timerID);

  useEffect (()=>
  {
    clearTimeout(timeOutID);
    dispatch(clickLogOut())
   },[])
  
    const userinputRef=useRef();
    const passwordinputRef=useRef();

    const SubmitLogin=async (e)=>
    {
        e.preventDefault();

        const enteredUser=userinputRef.current.value;
        const EnteredPswd=passwordinputRef.current.value;
       

        //check that the user& password Token is correct - Mayan
        let credentials = { username : enteredUser, password : EnteredPswd};
     
        let ToeknData = await LoginUtils.Post_Credentials(credentials)
        
     
        if (ToeknData===-1)
        {
            dispatch(saveToken(-1))
        }
        else
        {
            dispatch(saveToken(ToeknData))
       
        }
        //console.log ("ToeknData", ToeknData)
       
       
        if (ToeknData!==-1)
        {
             const data = await LoginUtils.Enter_Login(ToeknData["token"]);
           
            if (data==="you are not authorized")
            {
                window.alert("This user is not authorized");
               navigate("/")
            }    
            
            else
            {
                dispatch(saveLoginUser(data))
                if (data.permissions.some(item=> item==='Admin'))
                {
                    dispatch(checkIsAdmin())
                }
                else{
                    let timerID =timeOut(data.sessionTimeOut * 60* 1000)
                    dispatch(saveTimerID(timerID))
                }             
                
                navigate("/mainPage")
                 
            }
        }
        else
        {
            window.alert("There is an issue with the credentials. Please try again");
        navigate ("/")
        }

       
    }

   
    return(
        <form  className="login_container" onSubmit={SubmitLogin} >
            <h1>Login page</h1>
            <div >
                User name: <input type="text" id="usename" ref={userinputRef}/><br/>             
                Password: <input type="password" id="pswd" ref={passwordinputRef}/> <br/>
                <input type="submit" value= "Login" />
                <br/> <br/>              

            </div>

            New User? <Link to='/createAccount'> Create Account</Link>
           
        </form>
    )
}

export default Login