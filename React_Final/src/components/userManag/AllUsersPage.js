import UserComp from "./UserComp";
import { useSelector } from "react-redux";



const AllMembersPage = ()=>
{ 
    const users =useSelector(state=> state.users.allUsersData)
    
    return(
        <div className='allMoviesComp'>
            
                {
                    
                    users!== 'The user is not autorized' &&  users.map((user)=>{
                       return <UserComp key= {user.userId} item={user}/>;
                    }
                        
                        )

                }
        
            
        </div>
    )
}

export default AllMembersPage