import axios from "axios";

const TotalHours = async (id, startDate, endDate) => {
    const user = id.charAt(0) === 'E' ? 'employee' : 'student';

    const response = await axios.post(`/api/details/avgHours/${user}/${id}`, {
        startDate,
        endDate
    })

    return response.data;
}
export default TotalHours




