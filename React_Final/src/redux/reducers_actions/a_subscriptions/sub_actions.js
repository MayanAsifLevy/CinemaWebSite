import * as types from "./sub_action_Types";
import * as MoviesUtils  from "../../../utils/MoviesUtils";
import * as SubUtils  from "../../../utils/SubscriptionsUtils";
import * as MemberUtils  from "../../../utils/MembersUtils";


const getMembers = (members) => ({
  type: types.GET_MEMBERS,
  payload: members,
});

const getMember = (member) => ({
  type: types.GET_MEMBER,
  payload: member,
});

const updatePagesState=(status)=>(
{
  type: types.PAGE_STATE,
  payload: status
});


// ---------------------------------------


export const updatePagesStatus=(status)=> {
    return function (dispatch) {
      dispatch(updatePagesState(status))
  
    };
  
  };
  

const findMoviesNotWatched = (watched, allMovies)=>
{

    let notWatchedMovie = []
    
    // find all the movies the memeber didnt watch
    if (watched.length>0)
        {
            let result = allMovies.filter(function (o1) 
            {
                return !watched.some(function (o2) 
                    {
                    return o1.id === o2.movieID; // return the ones with equal id
                    });
            });
            notWatchedMovie=result.map(movieNotWatched=>{return {"name": movieNotWatched.Name, "movieid": movieNotWatched.id}})
           
        }
    
    //if the member didnt watch any movies - we need to provide the list of all memebers
    else {
        notWatchedMovie= allMovies.map(movie=> { return {"name": movie.Name, "movieid": movie.id}})

    }

    return notWatchedMovie
}


//bring members and for each one add the movies_list_per_user
export const loadMembers = (_token) => {
  return  async function (dispatch) {
    const members=await (MemberUtils.GetMembers_list(_token));
    const movies=await (MoviesUtils.GetMovies_list(_token)) ;
    const subscriptions=await (SubUtils.GetSubscription_list(_token));
  
 
    let notwatchedlist =[]
    members.forEach(member => 
    {
        notwatchedlist =[]
        member["movies_watched_per_member"]=[]
        subscriptions.forEach(sub=>
        {
                if(member.id=== sub.memberId) // in case the subscribe has a memeber id that is equal to the memeber ==> we will get its list of watched movies
                {
                    
                    member["movies_watched_per_member"]=sub.movies
                    member["movies_watched_per_member"].forEach(submovie=>
                        {                           
                            submovie["date"]=submovie["date"].substring(0,10) //// datepicker - do we need the 00:00:00
                            submovie["sub_id"]=sub['subscriptionId']
                            
                            let movies_filter= movies.filter(movie=> movie.id===submovie["movieID"])
                            if (movies_filter.length>0)
                            {
                                submovie["name"]=movies_filter[0]["Name"] // attached the movie name to the moive id
                                
                            }
                                                              
                        })                     
                }                       
        })
        // in order to add the list of not watched movies
        notwatchedlist =findMoviesNotWatched (member["movies_watched_per_member"], movies)
            
        member["NotWatched"]=notwatchedlist
              
    });
     
    dispatch(getMembers(members));
  };
  
 };

 export const saveSelectMember = (member) => {
  return  function (dispatch) {
    dispatch(getMember(member));

  }
};


export const memberUpdate = (member, id, _token) => {
  return  async function (dispatch) {
    await MemberUtils.Update_Member(member, id)
   
    dispatch(loadMembers(_token)); 
    
  };
};

export const memberDelete = (id, _token) => {
  return  async function (dispatch) {
    await MemberUtils.Delete_Member(id)
    
    dispatch(loadMembers(_token)); 
   
      
  };
};


export const subscriptionDelete= (sub_id, _token)=>{
    return async function (dispatch) {
        await SubUtils.Delete_Sub(sub_id)

        dispatch(loadMembers(_token)); 
    }
}


export const memberAdd = (member, _token) => {
  return  async function (dispatch) {
    let newuserId=await MemberUtils.Add_Member(member)
    alert("a new user was created withid: "+ newuserId)
    dispatch(loadMembers(_token)); 
    
      
  };
};


export const subscriptionAdd= (newSub, _token)=>{
    return async function (dispatch) {
        const subscriptions=await (SubUtils.GetSubscription_list(_token));

        const member_with_sub = subscriptions.filter(sub=> sub.memberId===newSub.MemberId)
       
        let new_movie_watched={};
     
        // in case there is a sub_id with teh memeber_id and we just need to update teh movies_list_watched in the DB
        if (member_with_sub.length>0)
        {   
            new_movie_watched["date"]=newSub["Date"]+ ' 00:00:00'
            new_movie_watched["movieID"]=newSub.MovieId
            member_with_sub[0]['movies'].push(new_movie_watched)

           //console.log('member_with_sub[0] after',member_with_sub[0])
            let status= await SubUtils.Update_Sub(member_with_sub[0]["subscriptionId"], member_with_sub[0])
            alert("the sub was updated", status)
            dispatch(loadMembers(_token));

        }
        // in case there is no sub_id and we need to add a new sub
        else{
            let new_sub_to_add={}
           
            
            new_sub_to_add["memberId"]=newSub["MemberId"]

            new_movie_watched["movieID"]=newSub.MovieId
            new_movie_watched["date"]=newSub.Date + ' 00:00:00'
            new_sub_to_add["movies"]=[]
            new_sub_to_add["movies"].push(new_movie_watched)
            //console.log("new_sub_to_add",new_sub_to_add)
            let status= await SubUtils.Add_Sub(new_sub_to_add)
            alert("new sub was created",status)
            dispatch(loadMembers(_token));

        }
       

    }
}

export const checkAndDelMoviesFromSub = (deleted_movie, _token)=>{
return async function (dispatch) {
   // console.log("deleted_movie",deleted_movie)
    const subscriptions=await (SubUtils.GetSubscription_list(_token))
   // console.log("subscriptions", subscriptions)
    
    subscriptions.map(async (sub)=>
    {
        //let found_movie_in_sub=[]
        const sub_id=sub.subscriptionId
        const member_id=sub.memberId
       // console.log("sub_id",sub_id)


        let found_movie_in_sub=sub.movies.filter (i=> i.movieID===deleted_movie)
        let sub_without_del_movie=sub.movies.filter (i=> i.movieID!==deleted_movie)
       // console.log("found_movie_in_sub",found_movie_in_sub)
       // console.log("sub_without_del_movie",sub_without_del_movie)
        
        // found a movie in one of the subs - need to update the sub 
        if (found_movie_in_sub.length>0 && sub_without_del_movie.length>0)
        {
            // update Sub
            let updated_sub={}
            updated_sub["memberId"]=member_id
            updated_sub["movies"]=sub_without_del_movie
         //   console.log("updated_sub",updated_sub)

            let status = await SubUtils.Update_Sub(sub_id, updated_sub)
            alert ("sub was updated", status)
            
                  
        } 
        else if (found_movie_in_sub.length>0 && sub_without_del_movie.length===0)
        {
            //del sub - as after the delete of the movie this sub doesnt contain any other movies that the member watched
            let status=dispatch (subscriptionDelete(sub_id))
            alert ("sub ws deleted", status)
           

                
            
        }

        if (found_movie_in_sub.length>0)
        {
            dispatch(loadMembers(_token)); 
        }
        

    })

   
}

}
