import axios from 'axios';

// --------------------create account ---------------------

export async function first_load_check() {
    try {
      const result = await axios.get(`${process.env.REACT_APP_FIRSTLOAD_API}`);
     return result.data
    } catch (error) {
      console.error(error);
    }
  };
