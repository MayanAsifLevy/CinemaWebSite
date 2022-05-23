import { combineReducers } from "redux";
import users_Reducer from "./reducers_actions/a_users/user_reducer";
import sub_reducer from "./reducers_actions/a_subscriptions/sub_reducer"
import movies_reducer from "./reducers_actions/a_movies/movies_reducer"


const appReducer  = combineReducers({
    movies: movies_reducer,
    sub: sub_reducer,
    users: users_Reducer
 

});

// reset the store in case the user clicks on logout
const rootReducer = (state, action) => {
    if (action.type === 'RESET_APP') {
      state = undefined;
    }
  
    return appReducer(state, action);
  }
  
  export default rootReducer;



