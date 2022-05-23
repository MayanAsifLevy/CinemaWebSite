import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch } from "react-redux";
import {memberUpdate, updatePagesStatus} from '../../redux/reducers_actions/a_subscriptions/sub_actions'


const EditMember =()=>{

    const member_selected =useSelector(state=> state.sub.member).item 
    const _token= useSelector(state=> state.users.Token.token)
    
    const member_name = member_selected.Name
    const navigate = useNavigate();
    const member_id=member_selected.id
 
 
    const [editMember, setEditMember]=useState({Name: member_selected.Name, City:member_selected.City, Email: member_selected.Email })
    //console.log("editMember", editMember)
   


    
    let dispatch = useDispatch();

    useEffect(()=>
    {
    
        
        //-------------------------------------------------------

        dispatch(updatePagesStatus("Edit"));
        
    },[])



    const SubmitUpdateMember=(e)=>
    {
        e.preventDefault();

     //   console.log(editMovie)

      
        dispatch(memberUpdate(editMember, member_id, _token))
        dispatch(updatePagesStatus("All"));
        navigate("../allMembers")

    }

    const CancelCreation=()=>{
        dispatch(updatePagesStatus("All"));
        navigate("../allMembers")
    }

    return(
        <form className="AddMovie_form" onSubmit={e=>SubmitUpdateMember(e)}>
           <h1>Edit Member: {member_name}</h1>
            <div >
                Name: <input type="text"  value= {editMember.Name} onChange={(e)=>setEditMember({...editMember, Name: e.target.value}) }/> <br/>
                Email: <input type="email"  value= {editMember.Email} onChange={(e)=>setEditMember({...editMember, Email: e.target.value}) }/> <br/>
                City: <input type="text"  value= {editMember.City} onChange={(e)=>setEditMember({...editMember, City: e.target.value}) }/> <br/>
                
                <div className="addMovieButtons">
                    <input type="submit" value= "Update" />
                    <input type="button" value= "Cancel"  onClick={CancelCreation}/>
                </div>
                    

            </div> 
        </form>
    )
}

export default EditMember;