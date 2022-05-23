import axios from 'axios';

// --------------------create account ---------------------

export async function GetUserNames_list() {
    try {
      const result = await axios.get(`${process.env.REACT_APP_CREATACCOUNT_API}`);
     return result.data
    } catch (error) {
      console.error(error);
    }
  };

  
export async function UpdateUserPassword(userData,id) {
  try {
    const result = await axios.put(`${process.env.REACT_APP_CREATACCOUNT_API}/${id}`,userData);
   return result.data
  } catch (error) {
    console.error(error);
  }
};

// ------------------------ login -----------------
  
  export async function Post_Credentials(credentials) {
    try {
      const result = await axios.post(`${process.env.REACT_APP_LOGIN_API}`,credentials);
     return result.data
    } catch (error) {
      console.error(error);
    }
  }

  export async function Enter_Login(_token) {
    try {
      const result = await axios.get(`${process.env.REACT_APP_LOGIN_API}`,{headers: {"x-access-token": _token}});
     return result.data
    } catch (error) {
      console.error(error);
    }
  }


