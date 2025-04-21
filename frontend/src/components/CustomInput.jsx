import React, { useEffect, useState } from 'react'
import { useAdmin } from '../context/AuthContext'
import avgWorkHours from '../api/queries/avgWorkHours';

function CustomInput() {
    const { setStartDate, setEndDate, startDate, setDate, date, endDate, avgactiveHours, setAvgActiveHours, avgbreakHours, setAvgBreakHours, avgtotalHours, setAvgTotalHours } = useAdmin();


    useEffect(() => {
        if (startDate && endDate) {
            const fetchDetails = async () => {
                try {
                    const response = await avgWorkHours(startDate, endDate);
                    setAvgActiveHours(response.activehours);
                    setAvgBreakHours(response.breakhours);
                    setAvgTotalHours(response.totalhours);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchDetails();
        }
    }, [startDate, endDate]); // wait for both

    const handleResetClick = () => {
        setStartDate(null)
        setEndDate(null)
        setDate(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`)
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
            <input type='button' className='bg-primary border rounded text-white mx-3 px-2' value="Reset" onClick={handleResetClick} />
        </div>
    )
}

export default CustomInput
