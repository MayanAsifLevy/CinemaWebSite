import * as types from "./user_action_Types";
import * as usersUtils  from "../../../utils/UsersUtils";


const savetheToken= (token)=>(
{
  type: types.SAVE_TOKEN,
  payload: token
})


// -------------------------------------------
const logOut = ()=>(
{
  type: types.RESET_APP // more data in root_reducer.js
   
})

const getSignedUser = (userData)=>(
  {
    type: types.GET_SIGNED_USER,
    payload:userData
})

const getAllUsers = (allUsers)=>(
{
  type: types.GET_USERS,
  payload:allUsers
})

const getUser = (user)=>(
  {
    type: types.GET_USER,
    payload:user
  })

  const isAdmin = ()=>(
{
    type: types.IS_ADMIN
})

const setTimer=(id)=>(
{
  type: types.SETTIMER,
  payload: id
})

// -------------------------------------------

export const saveToken = (token)=>{
  return function (dispatch){
    dispatch(savetheToken(token))
  }
}

export const saveLoginUser=(userData)=> {
  return function (dispatch){
    dispatch(getSignedUser(userData))
  }

  }

  export const saveAllUsers = (_token) => {
    return  async function (dispatch) {
      const allUsers=await (usersUtils.Get_All_Users(_token)) 

      
    dispatch(getAllUsers(allUsers))

}
}

export const saveSelectUser = (user) => {
  return  async function (dispatch) {
   dispatch(getUser(user))

}
}

export const checkIsAdmin= ()=>{
  return function (dispatch) {
    dispatch(isAdmin())
  }
}

export const userDelete = (id, _token) => {
  return  async function (dispatch) {
    await usersUtils.Delete_User(id)
    
    dispatch(saveAllUsers(_token)); 
    
      
  };
};

export const userUpdate = (user, id, _token) => {
  return  async function (dispatch) {
    await usersUtils.Update_User(user,id)
    
    dispatch(saveAllUsers(_token)); 
    
      
  };
};


export const userAdd = (user, _token) => {
  return  async function (dispatch) {
    await usersUtils.Add_User(user)
    dispatch(saveAllUsers(_token)); 
    
      
  };
};


export const saveTimerID = (timerID)=>{
  return function(dispatch) {
    dispatch(setTimer(timerID))
  }
}
export const clickLogOut = () => {
  return  function (dispatch) {     
   dispatch(logOut())

}
}

