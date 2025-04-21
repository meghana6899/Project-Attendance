import React, { useState, useEffect } from 'react';
import './styles.css';
import workHours from '../api/queries/workHours.jsx';

import { useAdmin } from '../context/AuthContext'


function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const {  setDate, setEndDate, setStartDate } = useAdmin();

  useEffect(() => {
    generateCalendar();
  }, [currentDate]);

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    setDate(currentDate.getFullYear() + "-" + String(currentDate.getMonth() + 1).padStart(2, '0') + "-" + String(currentDate.getDate()).padStart(2, '0'))
    const firstDay = new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();

    let days = [];

    // Padding from previous month
    const startDay = firstDay === 0 ? 6 : firstDay - 1;
    for (let i = startDay; i > 0; i--) {
      days.push({
        date: prevLastDate - i + 1,
        currentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= lastDate; i++) {
      days.push({
        date: i,
        currentMonth: true,
        isToday:
          i === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear(),
      });
    }

    // Padding for next month
    const nextDays = 42 - days.length;
    for (let i = 1; i <= nextDays; i++) {
      days.push({
        date: i,
        currentMonth: false,
      });
    }

    setCalendarDays(days);
  };

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleDateClick = async (day) => {

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    let selectedDate;

    if (day.currentMonth) {
      selectedDate = new Date(year, month, day.date);
    } else {
      // If day is not in current month, determine if it's from previous or next
      if (day.date > 15) {
        // likely from previous month
        selectedDate = new Date(year, month - 1, day.date);
      } else {
        // likely from next month
        selectedDate = new Date(year, month + 1, day.date);
      }
    }

    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(selectedDate.getDate()).padStart(2, '0');

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    console.log(typeof formattedDate, formattedDate)



    await workHours(formattedDate)
    setDate(formattedDate)
    setStartDate(null)
    setEndDate(null)
  };


  const monthYearString = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="body">
      <div className="calendar">
        <div className="header">
          <button onClick={handlePrev}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div className="monthYear">{monthYearString}</div>
          <button onClick={handleNext}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        <div className="days">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div className="day" key={day}>
              {day}
            </div>
          ))}
        </div>

        <div className="dates">
          {calendarDays.map((day, index) => (
            <div
              onClick={() => {
                handleDateClick(day)
              }}
              key={index}
              className={`date ${day.currentMonth ? '' : 'inactive'
                } ${day.isToday ? 'active' : ''}`}
            >
              {day.date}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
