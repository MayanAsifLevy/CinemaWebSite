import axios from 'axios';

export async function GetMembers_list(_token) {
    try {
      const result = await axios.get(`${process.env.REACT_APP_MEMBERS_API}`, {headers: {"x-access-token": _token}});
     return result.data
    } catch (error) {
      console.error(error);
    }
  };



  export async function Update_Member(member, id) {
    try {
      const result = await axios.put(`${process.env.REACT_APP_MEMBERS_API}/${id}`,member);
     return result.data
    } catch (error) {
      console.error(error);
    }
  }
  
  
  export async function Add_Member(member) {
    try {
      const result = await axios.post(`${process.env.REACT_APP_MEMBERS_API}`,member);
     return result.data
    } catch (error) {
      console.error(error);
    }
  }
  
  export async function Delete_Member(id) {
    try {
      const result = await axios.delete(`${process.env.REACT_APP_MEMBERS_API}/${id}`);
     return result.data
    } catch (error) {
      console.error(error);
    }
  }

  
