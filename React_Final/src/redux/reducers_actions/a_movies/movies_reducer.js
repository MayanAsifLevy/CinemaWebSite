import * as types from "./movies_action_Types";
const initialState = {
  movies: [],
  movie: {},
  pages_state:'',
  search_movies:[],
  find_str:'',
  page_location:'',
  loading: true,
};

const moviesReducers = (state = initialState, action) => {
  switch (action.type) {
   
    case types.PAGE_LOCATION:
      return {
        ...state,
        page_location:action.payload

      }

    case types.KEEP_FIND_STRING:
      return {
        ...state,
        find_str:action.payload
      }

    case types.SEARCH_MOVIES:
      return{
          ...state,
          search_movies:action.payload
      }

    case types.GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };

    case types.PAGE_STATE:
      return{
        ...state,
        pages_state:action.payload
      }

    case types.GET_MOVIE:
      return {
        ...state,
        movie: action.payload,
      };


    default:
       return state;
   }
};

export default moviesReducers;
