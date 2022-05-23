import * as types from "./movies_action_Types";
import * as MoviesUtils  from "../../../utils/MoviesUtils";
import * as SubUtils  from "../../../utils/SubscriptionsUtils";
import * as MemberUtils  from "../../../utils/MembersUtils";



const setPageLocation = (pagename)=>(
  {
    type: types.PAGE_LOCATION,
    payload:pagename
})


const saveFindString = (findStr)=>(
{
  type: types.KEEP_FIND_STRING,
  payload: findStr,
})

const saveSearchList= (search_str) =>(
  {
    type: types.SEARCH_MOVIES,
    payload:search_str,
  
  })

export const getMovies = (movies) => ({
  type: types.GET_MOVIES,
  payload: movies,
});

const getMovie = (movie) => ({
  type: types.GET_MOVIE,
  payload: movie,
});

const updatePagesState=(status)=>(
{
  type: types.PAGE_STATE,
  payload: status
});

//----------------------------------------------------

  export const savePageLocation = (pagename)=>{
    return function (dispatch){
      dispatch(setPageLocation(pagename))
    }
  }


export const keepFindString = (str) =>{
  return function (dispatch) {
    dispatch(saveFindString(str))
  };
};


export const updateSearchList = (list) =>{
  return function (dispatch) {
    dispatch(saveSearchList(list))
  };
};


//bring movies and for each movie add the users_list_per_movie
export const loadMovies = (_token) => {
  return  async function (dispatch) {
    const movies=await (MoviesUtils.GetMovies_list(_token)) ;
    // console.log("movies in load",movies)
    const members=await (MemberUtils.GetMembers_list(_token));
    const subscriptions=await (SubUtils.GetSubscription_list(_token));

    movies.forEach(movie => {
     
            let users_list_per_movie=[]
            let movie_apper=0
            let movie_watched_date=''

            movie["Premiered"]= movie.Premiered.substring(0,10)
           
            // console.log("movie", movie)
            subscriptions.forEach(sub=>
              {
                // console.log("sub", sub)
                let member_subscription_data={}
                sub["movies"].forEach(m=>
                  {
                    // console.log("movies list in sub",m)

                    if(movie.id===m.movieID){
                      movie_apper=1
                      // console.log('movie found', m)
                      movie_watched_date=m.date
                    }
                    if (movie_apper===1) // the specific movie we are checking, appears in the subscription - under its movie_list==> movie_apper . therefore we need to provide the memberid from the sub
                    {

                      members.forEach (member=>{  //mayan - put iforEach instead map
                        if (member.id===sub["memberId"])
                        {
                          member_subscription_data["member_name"] = member.Name
                        }

                      })
                      //  console.log('movie found - sub', sub)
                      member_subscription_data["member_id"]= sub["memberId"];
                      member_subscription_data["sub_id"]= sub["subscriptionId"];

                      member_subscription_data["watched_date"]= movie_watched_date;
                      users_list_per_movie.push(member_subscription_data)
                      movie_apper=0
                      // console.log("member_subscription_data", member_subscription_data)
                    } 
                    
                  })
              })
            movie["subscription_user_list"]=users_list_per_movie;
            
    });
 //  console.log('movies after load',movies)
    dispatch(getMovies(movies));
  };
  
 };


 // selected movie
 export const saveSelectMovie = (movie) => {
  return  function (dispatch) {
    dispatch(getMovie(movie));

  }
};

export const movieUpdate = (movie, id, _token) => {
  return  async function (dispatch) {
    await MoviesUtils.Update_Movie(movie, id)
   
    dispatch(loadMovies(_token)); 
   
    
  };
};


export const movieAdd = (movie, _token) => {
  return  async function (dispatch) {
    await MoviesUtils.Add_Movie(movie)
    dispatch(loadMovies(_token)); 
    
      
  };
};


export const movieDelete = (id, _token) => {
  return  async function (dispatch) {
    await MoviesUtils.Delete_Movie(id)
    
    dispatch(loadMovies(_token)); 
      
  };
};



export const updatePagesStatus=(status)=> {
  return function (dispatch) {
    dispatch(updatePagesState(status))

  };

};


