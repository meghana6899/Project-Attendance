import React, { useEffect } from 'react'
import { useAdmin } from '../context/AuthContext'
import axios from 'axios';  

function CustomizeDates() {
    const { setStartDate, setEndDate, startDate, setDate, date, endDate, activeHours, setActiveHours, breakHours, setBreakHours, totalHours, setTotalHours ,employee,setShowcard} = useAdmin();
    const user_id = employee && 'stu_id' in employee ? 'stu_id' : 'emp_id';
      const userValue = employee?.[user_id];


    // useEffect(() => {
    //     const fetchDetails = async () => {
    //         try {
    //             const response = await avgWorkHours(startDate, endDate);
    //             // console.log(response)
    //             setAvgActiveHours(response.activehours)
    //             setAvgBreakHours(response.breakhours)
    //             setAvgTotalHours(response.totalhours)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchDetails()
    // }, [endDate])

    useEffect(() => {
        if (startDate && endDate) {
            const fetchDetails = async () => {
                try {
                    const response = await axios.post(`http://localhost:3000/api/details/avgHours/${userValue}`, {
                        startDate,
                        endDate
                    });
                    setActiveHours(response.data.activehours);
                    setBreakHours(response.data.breakhours);
                    setTotalHours(response.data.totalhours);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchDetails();
        }
    }, [startDate, endDate,employee]); // wait for both

    const handleResetClick = () => {
        setStartDate(null)
        setEndDate(null)
        setDate(`${new Date().getFullYear}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`)
        console.log(date)
        console.log(startDate)
        console.log(endDate)
    }

    const handleStartChange = (event) => {
        setStartDate(event.target.value)
    }

    const handleEndChange = (event) => {
        setEndDate(event.target.value)
        console.log("enddate", endDate)
    }

    return (
        <div>
            <span>Custom</span>
            <input className='mx-3 border rounded text-secondary' type='date' value={startDate} onChange={handleStartChange} />
            <input type='date' className='border rounded text-secondary' value={endDate} onChange={handleEndChange} />
            <input type='button' value="Reset" onClick={handleResetClick} />
            {/* <p>Average Active Hours: {activeHours} </p>
            <p>Average Break Hours: {breakHours}</p>
            <p>Average Total Hours: {totalHours}</p> */}
        </div>
    )
}

export default CustomizeDates
