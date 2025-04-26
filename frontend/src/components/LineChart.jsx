import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import avgMonth, { weekPerDay } from '../api/queries/avgMonthWeek';
import DropDown from './DropDown';
import CustomizeDates from './CustomizeDates';
import { useAdmin } from '../context/AuthContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

// const zdate = new Date(date);
//     const newDate = zdate.toLocaleString("en-GB", { timeZone: "Asia/Kolkata" })




const LineChart = () => {
    const [data, setData] = useState(null)
    const { setdashBoard, selection } = useAdmin()
    const user = JSON.parse(localStorage.getItem('user'))
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const getDayName = (dateStr) => {
        const date = new Date(dateStr);
        return weekdays[date.getDay()];
    };
    const formatDate = (dateStr) => {
        const options = { day: '2-digit', month: 'short' }; // like "21 Apr"
        return new Date(dateStr).toLocaleDateString('en-GB', options);
    }

    useEffect(() => {
        setdashBoard(false)

        const fetchHors = async () => {
            if (selection == 'month') {
                try {
                    const monthAvg = await avgMonth(user.id);

                    setData(monthAvg)
                } catch (error) {
                    console.log(error)
                }
            } else {
                try {
                    const weekavg = await weekPerDay(user.id);

                    setData(weekavg)
                } catch (error) {
                    console.log(error)
                }
            }

        }
        fetchHors()
    }, [selection])

    let totalHoursData = []
    let activeHoursData = []
    let breakHoursData = []
    let labels = []

    const timeToDecimal = (timeStr) => {

        if (timeStr == null || timeStr == undefined || timeStr == 0) {
            timeStr = '00:00:00'
        }

        const [h, m, s] = timeStr.split(':').map(Number);
        return h + m / 60;
    };



    if (selection == 'month') {
        labels = months,
            totalHoursData = new Array(12).fill(null);
        activeHoursData = new Array(12).fill(null);
        breakHoursData = new Array(12).fill(null);
        data?.forEach(({ month, avg_total_hours, avg_active_hours, avg_break_hours }) => {
            const monthIndex = parseInt(month?.split("-")[1], 10) - 1; // Extract month index from 'YYYY-MM'
            totalHoursData[monthIndex] = timeToDecimal(avg_total_hours);
            activeHoursData[monthIndex] = timeToDecimal(avg_active_hours);
            breakHoursData[monthIndex] = timeToDecimal(avg_break_hours);
        });

    } else if (selection === "week") {

        labels = weekdays;


        totalHoursData = new Array(6).fill(0);
        activeHoursData = new Array(6).fill(0);
        breakHoursData = new Array(6).fill(0);


        data?.forEach(({ date, total_hours, active_hours, break_hours }) => {
            const dayIndex = new Date(date).getDay();


            totalHoursData[dayIndex] = timeToDecimal(total_hours);
            activeHoursData[dayIndex] = timeToDecimal(active_hours);
            breakHoursData[dayIndex] = timeToDecimal(break_hours);
        });
    }




    const options = {
        responsive: true,


    }




    const lineardata = {
        labels: labels,
        datasets: data ? [
            {
                label: "Total Hours",
                data: totalHoursData,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1
            },
            {
                label: "Active Hours",
                data: activeHoursData,
                borderColor: "rgb(30, 123, 123)",
                tension: 0.1
            },
            {
                label: "Break Hours",
                data: breakHoursData,
                borderColor: "rgb(214, 26, 26)",
                tension: 0.1
            }

        ] : []
    }
    return (
        <div className='w-90 h-70 border rounded text-start p-3'>

            <DropDown className='m-3' />
            <Line className='bg-light m-2' options={options} data={lineardata} />


        </div>
    )
}

export default LineChart

