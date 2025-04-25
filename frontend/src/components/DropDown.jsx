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
    setAvgTotalHours
  } = useAdmin();

  const user_id = 'stu_id' in employee ? 'stu_id' : 'emp_id';
  const userValue = employee?.[user_id];
console.log(employee,'here iss hhhhhhhhhhhhhhhhhhhhhhhhhhhhh');

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

    await FetchAverageHours({
      startDate: start,
      endDate: end,
      userValue,
      token: localStorage.getItem('token'),
      setAvgActiveHours,
      setAvgBreakHours,
      setAvgTotalHours
    });
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
    } else if (selectedValue === 'month') {
      startDate.setMonth(currentDate.getMonth() - 1);
    }

    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];

    setStartDate(start);
    setEndDate(end);

    await FetchAverageHours({
      startDate: start,
      endDate: end,
      userValue,
      token: localStorage.getItem('token'),
      setAvgActiveHours,
      setAvgBreakHours,
      setAvgTotalHours
    });
  };

  return (
    <>
      <h4>Select an Option</h4>
      <select onChange={handleSelectClick} defaultValue="">
        <option value="" disabled>-- Select Range --</option>
        <option value="day">Daily</option>
        <option value="week">Weekly</option>
        <option value="month">Monthly</option>
      </select>
    </>
  );
};

export default DropDown;
