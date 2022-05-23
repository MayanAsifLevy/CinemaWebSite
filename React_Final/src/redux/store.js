import { legacy_createStore , applyMiddleware , compose } from "redux";
import logger from "redux-logger";
import reduxThunk from "redux-thunk";
import rootReducer from "./root_reducer";

const middlewares = [reduxThunk];


  middlewares.push(logger);

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = legacy_createStore(rootReducer,  composeEnhancers(  applyMiddleware(...middlewares)
  ));

export default store;
