import axios from "axios";

const TotalHours = async(id,startDate, endDate) => {
    const user=id.charAt(0)==='E'?'employee':'student';

    const response = await axios.post(`http://localhost:3000/api/details/avgHours/${user}/${id}`, {
        startDate,
        endDate
    })
    console.log("response", response.data)
    return response.data;
}
export default TotalHours




