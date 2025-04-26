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
    const handleResetClick = useCallback(async () => {
        setStartDate(tempStartDate);
        setEndDate(tempEndDate);

        try {
            const response = await avgWorkHours(tempStartDate, tempEndDate);
            console.log("Custom Input", response)

            setAvgActiveHours(response.activehours);
            setAvgBreakHours(response.breakhours);
            setAvgTotalHours(response.totalhours);
        } catch (error) {
            console.log(error);
        }
    }, [tempStartDate, tempEndDate, setAvgActiveHours, setAvgBreakHours, setAvgTotalHours]);


    const handleStartChange = (event) => {
        setTempStartDate(event.target.value);
    };

    const handleEndChange = (event) => {
        setTempEndDate(event.target.value);
    };

    return (
        <div>
            <span>Custom</span>
            <input
                className='mx-3 border rounded text-secondary'
                type='date'
                value={tempStartDate}
                onChange={handleStartChange}
            />
            <input
                type='date'
                className='border rounded text-secondary'
                value={tempEndDate}
                onChange={handleEndChange}
            />
            <input
                type='button'
                className='bg-primary border rounded text-white mx-3 px-2'
                value="Apply"
                onClick={handleResetClick}
            />
        </div>
    );
}

export default CustomInput;

