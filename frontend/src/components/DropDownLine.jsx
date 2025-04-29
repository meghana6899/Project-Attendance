import React, { useEffect } from 'react';
import { useAdmin } from '../context/AuthContext';
import FetchAverageHours from '../api/queries/FetchAverageHours';

const DropDown = () => {
    const {

        setSelectLine
    } = useAdmin();




    // Set today's date in state when component mounts
    // useEffect(() => {
    //     const now = new Date();
    //     const year = now.getFullYear();
    //     const month = String(now.getMonth() + 1).padStart(2, '0');
    //     const day = String(now.getDate()).padStart(2, '0');
    //     const todayDate = `${year}-${month}-${day}`;
    //     setDate(todayDate);

    //     // Trigger fetch for today's data
    //     fetchToday(todayDate);
    // }, [employee]);

    // const fetchToday = async (todayDate) => {
    //     const currentDate = new Date(todayDate);
    //     const startDate = new Date(currentDate);
    //     const endDate = new Date(currentDate);

    //     const start = startDate.toISOString().split('T')[0];
    //     const end = endDate.toISOString().split('T')[0];

    //     setStartDate(start);
    //     setEndDate(end);


    // };

    const handleSelectClick = async (e) => {
        const selectedValue = e.target.value;


        if (selectedValue === 'week') {

            setSelectLine('week')
        } else if (selectedValue === 'month') {

            setSelectLine('month')
        }






    };

    return (
        <div className='px-4' >
            {/* <h4>Select an Option</h4> */}
            <select onChange={handleSelectClick}    >
                <option value=''>Select Range</option>
                <option value="month">Monthly</option>
                <option value="week">Weekly</option>


            </select>
        </div>
    );
};

export default DropDown;

