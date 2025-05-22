import axios from "axios";
const DeleteUser = async (id) => {
    const response = await axios.delete(`/api/details/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })

    return response;
}

export default DeleteUser;