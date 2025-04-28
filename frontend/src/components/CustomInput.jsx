import React, { useState, useCallback } from 'react';
import { useAdmin } from '../context/AuthContext';
import avgWorkHours from '../api/queries/avgWorkHours';



function CustomInput() {
    const {
        setStartDate, setEndDate, startDate,
        setAvgActiveHours, setAvgBreakHours, setAvgTotalHours, endDate
    } = useAdmin();

    const [tempStartDate, setTempStartDate] = useState(startDate);
    const [tempEndDate, setTempEndDate] = useState(endDate);




    // wait for both


    const handleResetClick = useCallback(async () => {
        setStartDate(tempStartDate);
        setEndDate(tempEndDate);

        try {
            const response = await avgWorkHours(tempStartDate, tempEndDate);
            setAvgActiveHours(response.activehours);
            setAvgBreakHours(response.breakhours);
            setAvgTotalHours(response.totalhours);
            // setStartDate(null)
            // setEndDate(null)
        } catch (error) {
            console.log(error);
        }
    }, [tempStartDate, tempEndDate, setAvgActiveHours, setAvgBreakHours, setAvgTotalHours]);


    const handleStartChange = (event) => {
        setTempStartDate(event.target.value)
        // setStartDate(event.target.value)
    }

    const handleEndChange = (event) => {
        setTempEndDate(event.target.value)
        // setEndDate(event.target.value)
        // console.log("enddate", endDate)
    }

    return (
        <div>

            <input
                className='border rounded text-secondary py-1 px-1'
                type='date'
                value={tempStartDate}
                onChange={handleStartChange}
            />
            <input
                type='date'
                className='border mx-1 rounded text-secondary py-1 px-1'
                value={tempEndDate}
                onChange={handleEndChange}
            />
            <input
                type='button'
                className='bg-primary border rounded text-white mx-1 py-1 px-2'
                value="Set"
                onClick={handleResetClick}
            />
        </div>
    )
}

export default CustomInput;

