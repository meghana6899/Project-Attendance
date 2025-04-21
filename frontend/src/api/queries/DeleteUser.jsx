import axios from "axios";
const DeleteUser=async(id)=>{
    const response= await axios.delete(`http://localhost:3000/api/details/${id}`)
     console.log('repsonse is Deleted')
     return response;
 }

 export default DeleteUser;