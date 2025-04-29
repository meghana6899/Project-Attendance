import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import avgMonth, { weekPerDay } from '../api/queries/avgMonthWeek';
import DropDownLine from './DropDownLine';
import { useAdmin } from '../context/AuthContext';
import dayjs from 'dayjs';

// For UTC handling
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc);

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const LineChart = () => {
    const [data, setData] = useState(null);
    const { setdashBoard, selection, employee } = useAdmin();
    //const user = JSON.parse(localStorage.getItem('user'));

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const user_id = employee && 'stu_id' in employee ? 'stu_id' : 'emp_id';
    const user = user_id === 'stu_id' ? 'student' : 'employee';
    const userValue = employee?.[user_id];
    useEffect(() => {
        setdashBoard(false);

        const fetchHours = async () => {
            try {
                const result = selection === 'month'
                    ? await avgMonth(userValue)
                    : await weekPerDay(userValue);
                setData(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchHours();
    }, [selection]);

    const timeToDecimal = (timeStr) => {
        if (!timeStr) return 0;
        if (timeStr == null || timeStr == undefined) {
            timeStr = "00:00:00"
        }
        const [h, m, s] = timeStr.split(':').map(Number);
        return h + (m / 60) + (s ? s / 3600 : 0);
    };

    const getLast7Days = () => {
        const days = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);

            // ADJUST to UTC because your backend data is in UTC
            const year = d.getUTCFullYear();
            const month = String(d.getUTCMonth() + 1).padStart(2, '0');
            const day = String(d.getUTCDate()).padStart(2, '0');
            days.push(`${year}-${month}-${day}`); // "yyyy-mm-dd"
        }
        return days;
    };



    const formatDateLabel = (dateStr) => {
        if (dateStr == null || dateStr == undefined) {
            dateStr = "00:00:00"
        }
        const [year, month, day] = dateStr.split('-');
        const date = new Date(year, month - 1, day);
        return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
    };

    let labels = [];
    let totalHoursData = [];
    let activeHoursData = [];
    let breakHoursData = [];

    if (selection === 'month') {
        labels = months;
        totalHoursData = new Array(12).fill(0);
        activeHoursData = new Array(12).fill(0);
        breakHoursData = new Array(12).fill(0);

        data?.forEach(({ month, avg_total_hours, avg_active_hours, avg_break_hours }) => {
            if (month == null || month == undefined) {
                month = "0000-00-00"
            }
            const monthIndex = parseInt(month.split("-")[1], 10) - 1;
            if (monthIndex >= 0 && monthIndex <= 11) {
                totalHoursData[monthIndex] = timeToDecimal(avg_total_hours);
                activeHoursData[monthIndex] = timeToDecimal(avg_active_hours);
                breakHoursData[monthIndex] = timeToDecimal(avg_break_hours);
            }
        });
    } else {
        const last7Days = getLast7Days();
        labels = last7Days.map(formatDateLabel);

        totalHoursData = new Array(7).fill(0);
        activeHoursData = new Array(7).fill(0);
        breakHoursData = new Array(7).fill(0);

        last7Days.forEach((day, idx) => {
            const dayData = data?.find(d => {
                if (!d.date) return false;

                // Normalize the backend date to just the date part (without time)
                const backendDate = dayjs(d.date).format('YYYY-MM-DD'); // Get the date without time

                // Get the local date and format it similarly
                const localDate = dayjs(day).format('YYYY-MM-DD'); // Format local date similarly

                console.log(`Backend Date: ${d.date}`);
                console.log(`Formatted Backend Date: ${backendDate}`);
                console.log(`Comparing to: ${localDate}`);

                // Compare the date part only
                return backendDate === localDate;
            });

            if (dayData) {
                totalHoursData[idx] = timeToDecimal(dayData.total_hours || '00:00:00');
                activeHoursData[idx] = timeToDecimal(dayData.active_hours || '00:00:00');
                breakHoursData[idx] = timeToDecimal(dayData.break_hours || '00:00:00');
            }
        });


    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#6b7280',
                    font: {
                        size: 13,
                        family: 'Poppins, sans-serif',
                    },
                    usePointStyle: true,
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.parsed.y || 0;
                        const hours = Math.floor(value);
                        const minutes = Math.round((value - hours) * 60);
                        return `${context.dataset.label}: ${hours}h ${minutes}m`;
                    }
                }
            },
            title: {
                display: false,
            }
        },
        scales: {
            y: {
                ticks: {
                    color: '#9ca3af',
                    font: { size: 12 }
                },
                grid: {
                    color: '#f3f4f6'
                },
                title: {
                    display: true,
                    text: 'Hours',
                    color: '#9ca3af',
                    font: {
                        size: 13,
                        weight: 'bold'
                    }
                }
            },
            x: {
                ticks: {
                    color: '#9ca3af',
                    font: { size: 12 }
                },
                grid: {
                    color: '#f9fafb'
                }
            }
        }
    };

    const lineardata = {
        labels,
        datasets: data ? [
            {
                label: "Total Hours",
                data: totalHoursData,
                backgroundColor: "rgba(5, 150, 105, 0.2)",
                borderColor: "#047857",
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointHoverRadius: 5,
                borderWidth: 2,
                order: 3
            },
            {
                label: "Active Hours",
                data: activeHoursData,
                backgroundColor: "rgba(29, 78, 216, 0.2)",
                borderColor: "#1E40AF",
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointHoverRadius: 5,
                borderWidth: 2,
                order: 2
            },
            {
                label: "Break Hours",
                data: breakHoursData,
                backgroundColor: "rgba(252, 211, 77, 0.2)",
                borderColor: "#FBBF24",
                tension: 0.4,
                fill: true,
                pointRadius: 3,
                pointHoverRadius: 5,
                borderWidth: 2,
                order: 1
            }
        ] : []
    };

    return (
        <div className="bg-white shadow-sm rounded w-100 mt-8">
            <div className="flex flex-col items-center justify-center mb-6">
                <h2 className="text-2xl font-bold text-gray-700 mb-2 text-center p-2">
                    {selection === 'month' ? 'Monthly Work Hours Overview' : 'Weekly Work Hours Overview'}
                </h2>
                {/* <DropDownLine /> */}
            </div>
            <div style={{ height: '335px', padding: '1rem' }}>
                <Line options={options} data={lineardata} />
            </div>
        </div>
    );
};

export default LineChart;


