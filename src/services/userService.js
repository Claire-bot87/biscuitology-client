import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL

// export const signup = async(formData) =>{
//     try{
//         const res = await axios.post(BASE_URL + '/auth/signup/', formData, {
//         headers: {
//             'Content-Type': 'application/json', // Make sure this is sent
//           },
//         })
        
//         console.log(res)
//         console.log('Form Data:', formData);

//         return res.data
//     } catch(error) {
//         console.log(error)
//         throw error
//     }
//     }

export const signup = async (formData) => {
    try {
      const res = await axios.post(BASE_URL + '/auth/signup/', formData, 
    //     {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   }
    );
      console.log('Response Object:', res);

      // Log the response data (which should include the token)
      console.log('Response Data:', res.data);
      console.log('Response Headers:', res.headers);
      return res.data;
    } catch (error) {
      console.error('Backend Error:', error.response?.data || error);
      throw error;
    }
  };

  export const signin = async (formData) => {
    try {
        const res = await axios.post(BASE_URL + '/auth/signin/', formData)
        return res.data
    } catch (error) {
        throw new error
    }
}