import MemberComp from "./MemberComp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {savePageLocation} from '../../redux/reducers_actions/a_movies/movies_actions'


const AllMembersPage = ()=>
{ 
    const members =useSelector(state=> state.sub.members)
    
    const dispatch=useDispatch()
    
    useEffect (()=>{
        dispatch(savePageLocation("Subscriptions"))
    },[])

    return(
        <div className='allMoviesComp'>           
                {
                    members.map((member)=>{
                       return <MemberComp key= {member.id} item={member}/>;
                    }
                        
                        )

                }
        
            
        </div>
    )
}

export default AllMembersPage