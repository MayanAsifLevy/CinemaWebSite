import axios from 'axios';

export async function GetSubscription_list(_token) {
    try {
      const result = await axios.get(`${process.env.REACT_APP_SUBSCRIPTIONS_API}`, {headers: {"x-access-token": _token}});
     return result.data
    } catch (error) {
      console.error(error);
    }
  }

  
  
  export async function Delete_Sub(id) {
    try {
      const result = await axios.delete(`${process.env.REACT_APP_SUBSCRIPTIONS_API}/${id}`);
     return result.data
    } catch (error) {
      console.error(error);
    }
  }

  export async function Add_Sub(new_sub) {
    try {
      const result = await axios.post(`${process.env.REACT_APP_SUBSCRIPTIONS_API}`,new_sub);
     return result.data
    } catch (error) {
      console.error(error);
    }
  }
  


  export async function Update_Sub(sub_id, data) {
    try {
      const result = await axios.put(`${process.env.REACT_APP_SUBSCRIPTIONS_API}/${sub_id}`,data);
     return result.data
    } catch (error) {
      console.error(error);
    }
  }
  
  
  