import axios from "axios";

const AvgHours = async (id) => {

    const response = await axios.get(`/api/hours/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `${localStorage.getItem('token')}`,
        }
    });

    return response.data
}
export default AvgHours



