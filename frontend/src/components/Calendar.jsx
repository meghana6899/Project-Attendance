import React from 'react';
import './styles.css'
import { useRef, useEffect } from 'react';

function Calendar() {

  const monthYearElement = useRef(null)
  const datesElement = useRef(null)
  const prevBtn = useRef(null)

  let currentDate = new Date();

  const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const firstDay = new Date(currentYear, currentMonth, 0)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDate();

    const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })
    monthYearElement.textContent = monthYearString;

    let datesHTML = '';
    for (let i = firstDayIndex; i > 0; i--) {
      const prevDate = new Date(currentYear, currentMonth, 0 - i + 1)
      datesHTML = `<div className="date inactive" >${prevDate.getDate()}</div>`
    }

    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentYear, currentMonth, i)
      const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
      datesHTML = `<div className="date ${activeClass}" >${i}</div>`
    }

    for (let i = 1; i <= 7 - lastDayIndex; i++) {
      const nextDate = new Date(currentYear, currentMonth + 1, i)
      datesHTML = `<div className="date inactive" >${nextDate.getDate()}</div>`
    }

    datesElement.innerHTML = datesHTML


  }

  const handleprevClick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1)
    updateCalendar()
  }

  const handleNextClick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1)
    updateCalendar()
  }
  updateCalendar()

  return (
    <div className="body">
      <div className='calendar'>
        <div className="header">
          <button id='prevBtn' onClick={handleprevClick}>
            <i className='fa-solid fa-chevron-left'></i>
          </button>
          <div className="monthYear" ref={monthYearElement} id="monthYear"></div>
          <button id="next" onClick={handleNextClick}>
            <i className='fa-solid fa-chevron-right'></i>
          </button>
        </div>
        <div className="days">
          <div className="day">Mon</div>
          <div className="day">Tue</div>
          <div className="day">Wed</div>
          <div className="day">Thu</div>
          <div className="day">Fri</div>
          <div className="day">Sat</div>
          <div className="day">Sun</div>
        </div>
        <div className="dates" ref={datesElement} id="dates"></div>

      </div>
    </div>
  )
}

export default Calendar


