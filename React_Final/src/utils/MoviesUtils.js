import axios from 'axios';

export async function GetMovies_list(_token) {
    try {
      const result = await axios.get(`${process.env.REACT_APP_MOVIES_API}`, {headers: {"x-access-token": _token}});
     return result.data
    } catch (error) {
      console.error(error);
    }
  }


  
export async function Get_Movie(movie, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_MOVIES_API}/${id}`,movie);
   return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Update_Movie(movie, id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_MOVIES_API}/${id}`,movie);
   return result.data
  } catch (error) {
    console.error(error);
  }
}


export async function Add_Movie(movie) {
  try {
    const result = await axios.post(`${process.env.REACT_APP_MOVIES_API}`,movie);
   return result.data
  } catch (error) {
    console.error(error);
  }
}

export async function Delete_Movie(id) {
  try {
    const result = await axios.delete(`${process.env.REACT_APP_MOVIES_API}/${id}`);
   return result.data
  } catch (error) {
    console.error(error);
  }
}

