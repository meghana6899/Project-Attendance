import axios from "axios";
const DeleteUser=async(id)=>{
    const response= await axios.delete(`http://localhost:3000/api/details/${id}`,{
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
     console.log('repsonse is Deleted')
     return response;
 }

 export default DeleteUser;