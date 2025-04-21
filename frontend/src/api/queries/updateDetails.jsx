import axios from "axios";
const updateDetails=async(id,{user_id,first_name,last_name,role,email})=>{
    const response= await axios.post(`http://localhost:3000/api/details/${id}`,{
         user_id,
         first_name,
         last_name,
         role,
         email,
     })
     console.log('repsonse is captured')
     return response;
 }

 export default updateDetails;