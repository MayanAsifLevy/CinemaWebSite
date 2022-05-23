import {  useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import {subscriptionAdd} from '../../redux/reducers_actions/a_subscriptions/sub_actions.js'

const AddSub = (props)=>
{
    const member_id = props.toComp.toCompMemberId;
    const _token= useSelector(state=> state.users.Token.token)

    const dispatch=useDispatch();

      const [newSub, setNewSub]=useState({MemberId: member_id, Date: '', MovieId:'', Movie_name: ''})
    //console.log("addSub", props)
    

    const selectHandler = (e)=>
    {
              
        const selectedIndex = e.target.options.selectedIndex;
        const keySelected=e.target.options[selectedIndex].getAttribute('data-key')
        setNewSub({...newSub, MovieId: keySelected, Movie_name: e.target.value})

    }

    const SubmitSubscription = (e)=>
    {
        e.preventDefault();
        if (newSub.Date ==='' || newSub.Date ==='')
        {
            alert ("Please add data before submiting a new subscrib")
        }
        else{
            dispatch(subscriptionAdd(newSub, _token))
        }

       

    }


    
    
    return(
        <form className="addSubComp" onSubmit={e=>SubmitSubscription(e)}>
            <h4> Add a new movie</h4>
            <br/>
            <div>
                <div>
                    <select onChange= {selectHandler}>
                    <option value="-1">Select Movie</option>
                        {
                          props.toComp.toCompNotWatched.map( (p) => 
                            <option  data-key={p.movieid} key={p.movieid} >{p.name}</option> )
                        }
                    </select>
                </div>
                
             {/* <input type="text" defaultValue={setCurrentDate}/> (YYYY-MM-DD) */}
            <input type="date" onChange={(e)=>setNewSub({...newSub, Date: e.target.value})}/> (YYYY-MM-DD) 
                
            </div>
            
            <input type="submit" value="Subscribe"/>
        </form>
    )
}

export default AddSub;