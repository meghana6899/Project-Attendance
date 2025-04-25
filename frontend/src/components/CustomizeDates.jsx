import React, {  useState,useEffect } from 'react'
import { useAdmin } from '../context/AuthContext'
import FetchAverageHours from '../api/queries/FetchAverageHours';

function CustomizeDates() {

    // const { setStartDate, setEndDate, startDate, setDate, date, endDate, activeHours, setAvgActiveHours, breakHours, setAvgBreakHours, totalHours, setAvgTotalHours, employee, setShowcard } = useAdmin();

    const { setStartDate, setEndDate, startDate, setDate, date, endDate, activeHours, setAvgActiveHours, breakHours, setAvgBreakHours, totalHours, 
        setApply, apply, setAvgTotalHours ,employee,setShowcard} = useAdmin();

    const user_id = employee && 'stu_id' in employee ? 'stu_id' : 'emp_id';
    const userValue = employee?.[user_id];
    const [tempStartDate, setTempStartDate] = useState(startDate);
    const [tempEndDate, setTempEndDate] = useState(endDate);

   
    useEffect(() => {
        setTempStartDate(startDate);
        setTempEndDate(endDate);
      }, [startDate, endDate]);

    const handleResetClick = async () => {
        setStartDate(tempStartDate);
        setEndDate(tempEndDate);
      
        
        await FetchAverageHours({
            startDate: tempStartDate,
            endDate: tempEndDate,
            userValue,
            token: localStorage.getItem('token'),
            setAvgActiveHours,
            setAvgBreakHours,
            setAvgTotalHours
        });
    
           
            // console.log("response", response.data) 
            // setAvgActiveHours(response.data.activehours);
            // setAvgBreakHours(response.data.breakhours);
            // setAvgTotalHours(response.data.totalhours);
            // console.log(response);
            // console.log("activehours", response.data.activehours)
         
       
    }   

    /*     ------------Start-------- */

    const handleStartChange = (event) => {
        setTempStartDate(event.target.value)
    
        console.log('here is the start date', event.target.value);
    }

    const handleEndChange = (event) => {
        setTempEndDate(event.target.value)
    
        console.log("enddate", endDate)
    }

    return (
        <div className='d-flex justify-content-center align-items-center gap-3'>
            <div className='d-flex  justify-content-center align-items-center gap-4 mx-3'>
                <input className='mx-3 border rounded text-secondary p-3' type='date' value={tempStartDate } onChange={handleStartChange} style={{ 'width': '200px', 'height': '36px' }} />
                <input type='date' className='border rounded text-secondary p-3' value={tempEndDate} onChange={handleEndChange} style={{ 'width': '200px', 'height': '36px' }} />
            </div>
            <div className='d-flex justify-content-center align-items-center gap-4 mx-3'>
                <input type='button' value="Apply" className='btn btn-outline-secondary'
                    onClick={handleResetClick} disabled={!tempStartDate || !tempEndDate} />
            </div>


            {/* <p>Average Active Hours: {activeHours} </p>
            <p>Average Break Hours: {breakHours}</p>
            <p>Average Total Hours: {totalHours}</p> */}
        </div>
    )
}

export default CustomizeDates
