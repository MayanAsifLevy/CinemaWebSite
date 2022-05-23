import axios from 'axios';


  
export async function Get_All_Users(_token) {
    try {
      const result = await axios.get(`${process.env.REACT_APP_USERS_API}`, {headers: {"x-access-token": _token}});
     return result.data
    } catch (error) {
      console.error(error);
    }
  }


    
export async function Delete_User(id) {
    try {
      const result = await axios.delete(`${process.env.REACT_APP_USERS_API}/${id}`);
     return result.data
    } catch (error) {
      console.error(error);
    }
  }

  export async function Update_User(user, id) {
    try {
      const result = await axios.put(`${process.env.REACT_APP_USERS_API}/${id}`,user);
     return result.data
    } catch (error) {
      console.error(error);
    }
  }
  
  
export async function Add_User(user) {
    try {
      const result = await axios.post(`${process.env.REACT_APP_USERS_API}`,user);
     return result.data
    } catch (error) {
      console.error(error);
    }
  }