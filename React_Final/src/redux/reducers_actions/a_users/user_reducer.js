import * as types from "../a_users/user_action_Types";
const initialState = {
  allUserNames:[],
  Token:'',
  user:'',
  allUsersData:[],
  SignedUser:[],
  isAdmin:false,
  timerID:0,
  loading: true,
};

const usersReducers = (state = initialState, action) => {
  switch (action.type) {

    case types.SETTIMER:
      return{
        ...state,
        timerID:action.payload
      }
      
    case types.IS_ADMIN:
      return {
        ...state,
        isAdmin:true
      }


      case types.GET_SIGNED_USER:
        return {
          ...state,
          SignedUser:action.payload
        }

      case types.SAVE_TOKEN:
      return {
        ...state,
        Token:action.payload
      }

    case types.GET_USERS:
      return {
        ...state,
        allUsersData: action.payload
      };


    case types.GET_USER:
      return {
        ...state,
        user: action.payload
      };

    // case types.ADD_USER:
    // case types.UPDATE_USER:
    //   return {
    //     ...state,
    //     loading: false,
    //   };
   
    default:
      return state;
  }
};

export default usersReducers;
