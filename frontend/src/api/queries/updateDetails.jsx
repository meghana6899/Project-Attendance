import axios from "axios";
const updateDetails = async (id, { user_id, first_name, last_name, role, email }) => {
    const response = await axios.post(`/api/details/${id}`, {
        user_id,
        first_name,
        last_name,
        role,
        email,
    },
        {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })


    return response.data;

}

export default updateDetails;