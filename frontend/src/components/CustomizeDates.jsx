import React, {  useState } from 'react'
import { useAdmin } from '../context/AuthContext'
import axios from 'axios';

function CustomizeDates() {

    // const { setStartDate, setEndDate, startDate, setDate, date, endDate, activeHours, setAvgActiveHours, breakHours, setAvgBreakHours, totalHours, setAvgTotalHours, employee, setShowcard } = useAdmin();

    const { setStartDate, setEndDate, startDate, setDate, date, endDate, activeHours, setAvgActiveHours, breakHours, setAvgBreakHours, totalHours, setAvgTotalHours ,employee,setShowcard} = useAdmin();

    const user_id = employee && 'stu_id' in employee ? 'stu_id' : 'emp_id';
    const userValue = employee?.[user_id];
    const [tempStartDate, setTempStartDate] = useState(startDate);
    const [tempEndDate, setTempEndDate] = useState(endDate);

   


    const handleResetClick = async () => {
        setStartDate(tempStartDate);
        setEndDate(tempEndDate);
        try {
            const response = await axios.post(`http://localhost:3000/api/details/avgHours/info/${userValue}`, {
                startDate: tempStartDate,
                endDate: tempEndDate,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });
           
            console.log("response", response.data) 
            setAvgActiveHours(response.data.activehours);
            setAvgBreakHours(response.data.breakhours);
            setAvgTotalHours(response.data.totalhours);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    /*     ------------Start-------- */

    const handleStartChange = (event) => {
        setTempStartDate(event.target.value)
        setStartDate(event.target.value)
    }

    const handleEndChange = (event) => {
        setTempEndDate(event.target.value)
        setEndDate(event.target.value)
        console.log("enddate", endDate)
    }

    return (
        <div className='d-flex justify-content-center align-items-center gap-3'>
            <div className='d-flex  justify-content-center align-items-center gap-4 mx-3'>
                <input className='mx-3 border rounded text-secondary p-3' type='date' value={startDate || ''} onChange={handleStartChange} style={{ 'width': '200px', 'height': '36px' }} />
                <input type='date' className='border rounded text-secondary p-3' value={endDate || ''} onChange={handleEndChange} style={{ 'width': '200px', 'height': '36px' }} />
            </div>
            <div className='d-flex justify-content-center align-items-center gap-4 mx-3'>
                <input type='button' value="Apply" className='btn btn-outline-secondary'
                    onClick={handleResetClick} />
            </div>


            {/* <p>Average Active Hours: {activeHours} </p>
            <p>Average Break Hours: {breakHours}</p>
            <p>Average Total Hours: {totalHours}</p> */}
        </div>
    )
}

export default CustomizeDates
