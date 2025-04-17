import axios from "axios";

const AvgHours = async(id) => {

    const response = await axios.get(`http://localhost:3000/api/hours/${id}`);
    console.log("Entered 2345axios", response.data)
    return response.data
}

export default AvgHours