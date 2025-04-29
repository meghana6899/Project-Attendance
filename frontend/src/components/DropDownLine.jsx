import React, { useEffect } from 'react';
import { useAdmin } from '../context/AuthContext';
import FetchAverageHours from '../api/queries/FetchAverageHours';

const DropDown = () => {
    const {
        date,
        setDate,
        setStartDate,
        setEndDate,
        employee,
        setAvgActiveHours,
        setAvgBreakHours,
        setAvgTotalHours,
        dashBoard,
        setSelection
    } = useAdmin();




    // Set today's date in state when component mounts
    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const todayDate = `${year}-${month}-${day}`;
        setDate(todayDate);

        // Trigger fetch for today's data
        fetchToday(todayDate);
    }, [employee]);

    const fetchToday = async (todayDate) => {
        const currentDate = new Date(todayDate);
        const startDate = new Date(currentDate);
        const endDate = new Date(currentDate);

        const start = startDate.toISOString().split('T')[0];
        const end = endDate.toISOString().split('T')[0];

        setStartDate(start);
        setEndDate(end);


    };

    const handleSelectClick = async (e) => {
        const selectedValue = e.target.value;
        const currentDate = new Date(date);
        const startDate = new Date(currentDate);
        const endDate = new Date(currentDate);

        if (selectedValue === 'day') {
            startDate.setDate(currentDate.getDate() - 1);

        } else if (selectedValue === 'week') {
            startDate.setDate(currentDate.getDate() - 7);
            setSelection('week')
        } else if (selectedValue === 'month') {
            startDate.setMonth(currentDate.getMonth() - 1);
            setSelection('month')
        }

        const start = startDate.toISOString().split('T')[0];
        const end = endDate.toISOString().split('T')[0];

        setStartDate(start);
        setEndDate(end);


    };

    return (
        <div className='px-4' >
            {/* <h4>Select an Option</h4> */}
            <select onChange={handleSelectClick} defaultValue="month">
                <option value="month">Monthly</option>
                <option value="week">Weekly</option>

            </select>
        </div>
    );
};

export default DropDown;

