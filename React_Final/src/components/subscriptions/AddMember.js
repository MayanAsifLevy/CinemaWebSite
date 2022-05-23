import { useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

import {updatePagesStatus, memberAdd} from '../../redux/reducers_actions/a_subscriptions/sub_actions'


const AddMember =()=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [newMember, setNewMember]=useState({Name: '', City: '', Email: ''})
    const _token= useSelector(state=> state.users.Token.token)
   

    const SubmitCreateMember=(e)=>
    {
        e.preventDefault();
            
        if (newMember.Name==='' || newMember.City===''|| newMember.Email==='' )
        {
            alert ("please add data or leave this page by clicking on 'Cancel'")
        }
        else
        {
            // console.log("newMember", newMember)
            dispatch(memberAdd(newMember, _token))
            dispatch(updatePagesStatus("All"));
            navigate("../allMembers")
            
        }
    }
      

    const CancelCreation=()=>{
        dispatch(updatePagesStatus("All"));
        navigate("../allMembers")
    }

    return(
        <form className="AddMovie_form" onSubmit={e=>SubmitCreateMember(e)}>
           <h1>Add Movie</h1>
            <div >
                Name: <input type="text" id="name" onChange={(e)=>setNewMember({...newMember, Name: e.target.value}) }/> <br/>
                Email: <input type="email" id="name" onChange={(e)=>setNewMember({...newMember, Email: e.target.value}) }/> <br/>
                City: <input type="text" id="name" onChange={(e)=>setNewMember({...newMember, City: e.target.value}) }/> <br/>
               

                <div className="addMovieButtons">
                    <input type="submit" value= "Save" />
                    <input type="button" value= "Cancel"  onClick={CancelCreation}/>
                </div>
                    

            </div>
        </form>
    )
}

export default AddMember;