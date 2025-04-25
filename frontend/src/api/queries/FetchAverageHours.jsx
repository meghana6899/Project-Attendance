import axios from 'axios';

const FetchAverageHours = async ({
  startDate,
  endDate,
  userValue,
  token,
  setAvgActiveHours,
  setAvgBreakHours,
  setAvgTotalHours
}) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/details/AvgHours/info/${userValue}`, {
      startDate,
      endDate,
    }, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      }
    });

    const  { activehours, breakhours, totalhours } = response.data;
    console.log(response.data)
  


    setAvgActiveHours(activehours);
    setAvgBreakHours(breakhours);
    setAvgTotalHours(totalhours);
  } catch (error) {
    console.error("Error fetching average hours:", error);
  }
};
export default FetchAverageHours