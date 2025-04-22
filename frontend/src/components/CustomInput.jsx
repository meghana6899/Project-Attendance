import React, { useState } from 'react'
import { useAdmin } from '../context/AuthContext'
import avgWorkHours from '../api/queries/avgWorkHours';



function CustomInput() {
    const { setStartDate, setEndDate, startDate,
        setAvgActiveHours, endDate, setAvgBreakHours, setAvgTotalHours } = useAdmin();
    const [tempStartDate, setTempStartDate] = useState(startDate);
    const [tempEndDate, setTempEndDate] = useState(endDate);




    // wait for both


    const handleResetClick = async () => {
        // setStartDate(tempStartDate);
        // setEndDate(tempEndDate);

        try {
            const response = await avgWorkHours(tempStartDate, tempEndDate);
            setAvgActiveHours(response.activehours);
            setAvgBreakHours(response.breakhours);
            setAvgTotalHours(response.totalhours);
        } catch (error) {
            console.log(error);
        }
    }

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
        <div>
            <span>Custom</span>
            <input className='mx-3 border rounded text-secondary' type='date' value={startDate} onChange={handleStartChange} />
            <input type='date' className='border rounded text-secondary' value={endDate} onChange={handleEndChange} />
            <input type='button' className='bg-primary border rounded text-white mx-3 px-2' value="Apply" onClick={handleResetClick} />
        </div>
    )
}


export default CustomInput
