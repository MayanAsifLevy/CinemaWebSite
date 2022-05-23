import MoviesListWached from './MoviesListWached'
import { useNavigate } from "react-router-dom";
import { useDispatch , useSelector} from "react-redux";
import {saveSelectMember, memberDelete, subscriptionDelete} from '../../redux/reducers_actions/a_subscriptions/sub_actions'

const MemberComp =(member)=>{

  let dispatch = useDispatch();
  
  const navigate = useNavigate();

  const signed_user= useSelector((state) => state.users.SignedUser);
  const _token= useSelector(state=> state.users.Token.token)
    
  //let date = new Date(movie.item.Premiered); 
  
  //console.log(movie.item);
  
  const EditHandler=()=>
  {
     dispatch(saveSelectMember(member))
      

      navigate("../editMember")

  }

  const DeleteHandler=()=>
  {
    
      dispatch(memberDelete(member.item.id, _token))
 

   if (member.item.movies_watched_per_member.length>0)
   {
      const sub_id_to_delete= member.item.movies_watched_per_member[0].sub_id
      dispatch(subscriptionDelete(sub_id_to_delete, _token))

   }
    navigate("../allMembers")
   
  }
  
  
     
    return(
        <div className= "movieComp">
          <h1 classname="memberComp_title">{member.item.Name} </h1> <br/>
          <h3>Email: {member.item.Email}</h3>
          <h3>City: {member.item.City}</h3>
          {/* <h3>id:  {member.item.id}</h3> */}

     
          <div className='footerButtons'>
          

            { (('Admin') in signed_user["permissions"] || ('Update Subscriptions') in signed_user["permissions"])?<input type="button" value="Edit" onClick= {EditHandler}/>:''}
            { (('Admin') in signed_user["permissions"] || ('Delete Subscriptions') in signed_user["permissions"])?<input type="button" value="Delete" onClick= {DeleteHandler}/>:''}  
          </div>

        <MoviesListWached toCompMemberId= {member.item.id} toCompWatched={member.item.movies_watched_per_member}  toCompNotWatched={member.item.NotWatched}/>

        </div>
    )
}



export default MemberComp;