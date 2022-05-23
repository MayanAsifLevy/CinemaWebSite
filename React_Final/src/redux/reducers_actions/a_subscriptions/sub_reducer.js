import * as types from "./sub_action_Types";
const initialState = {
  members: [],
  member: {},
  pages_state:'',
  loading: true,

};

const subscriptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MEMBERS:
      return {
        ...state,
        members: action.payload,
        loading: false,
       };

    case types.PAGE_STATE:
      return{
        ...state,
        pages_state:action.payload
      }

      case types.GET_MEMBER:
        return {
          ...state,
          member: action.payload,
        };

     
    default:
      return state;
  }
};

export default subscriptionsReducer;
