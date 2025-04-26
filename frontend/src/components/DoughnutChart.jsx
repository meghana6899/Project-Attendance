



import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useAdmin } from '../context/AuthContext';
import workHours from '../api/queries/workHours';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);


function DashboardEmployee() {
    const {
        date,
        setDate,
        startDate,
        endDate,
        avgactiveHours,
        avgbreakHours,
        avgtotalHours,
    } = useAdmin();



    console.log('avgactiveHours', avgactiveHours);
    console.log('avgbreakHours', avgbreakHours);
    console.log('avgtotalHours', avgtotalHours);
    console.log('startDate', startDate);
    console.log('endDate', endDate);

    const [hourData, setHourData] = useState({});
    const isCustomRange = startDate !== null && endDate !== null;


    useEffect(() => {
        console.log("Updated avgactiveHours:", avgactiveHours);
        console.log("Updated avgbreakHours:", avgbreakHours);
        console.log("Updated avgtotalHours:", avgtotalHours);
    }, [avgactiveHours, avgbreakHours, avgtotalHours]);


    useEffect(() => {
        const fetchHours = async () => {

            if (!isCustomRange) {


                try {

                    const response = await workHours(date);
                    console.log("Response", response)
                    setHourData(response || {});

                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchHours();
    }, [date, isCustomRange, avgactiveHours, avgbreakHours, avgtotalHours]);

    const formatTimeLabel = (decimalHour = 0) => {
        const hours = Math.floor(decimalHour);
        const minutes = Math.round((decimalHour - hours) * 60);
        return `${hours}h ${minutes}min`;
    };

    const timeToDecimal = (timeStr) => {
        console.log(timeStr)
        if (timeStr == null || timeStr == undefined || timeStr == 0) {
            timeStr = '00:00:00'
        }

        const [h, m, s] = timeStr.split(':').map(Number);
        console.log(h, m, s)
        return h + m / 60 + s / 3600;
    };
    const timeToDecimal2 = (timeStr) => {
        console.log("timeStr inside decimal:", timeStr);
        if (!timeStr) return 0;

        const hrMatch = timeStr.match(/(\d+)hr/);
        const minMatch = timeStr.match(/(\d+)min/);

        const hours = hrMatch ? parseInt(hrMatch[1], 10) : 0;
        const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;

        console.log("hours:", hours, "minutes:", minutes);

        return hours + minutes / 60;
    };

    console.log("Formatted Active Hours:", timeToDecimal(avgactiveHours));


    const chartData = useMemo(() => ({
        labels: ['Active Hours', 'Break Hours', 'Total'],
        datasets: [
            {
                label: 'Working Hours',
                data: isCustomRange
                    ? [
                        avgactiveHours ? timeToDecimal2(avgactiveHours) : 0,
                        avgbreakHours ? timeToDecimal2(avgbreakHours) : 0,
                        avgtotalHours ? timeToDecimal2(avgtotalHours) : 0,
                    ]
                    : [
                        timeToDecimal(hourData.active_hours),
                        timeToDecimal(hourData.break_hours),
                        timeToDecimal(hourData.total_hours),
                    ],
                backgroundColor: [
                    'rgba(43, 63, 229, 0.8)',
                    'rgba(250, 192, 19, 0.8)',
                    'rgba(253, 135, 135, 0.8)',
                ],
                borderColor: '#fff',
                borderWidth: 2,
            },
        ],
    }), [avgactiveHours, avgbreakHours, avgtotalHours, hourData, isCustomRange, startDate, endDate]);



    const tooltipLabels = useMemo(() => (
        isCustomRange
            ? [avgactiveHours, avgbreakHours, avgtotalHours].map(hour => formatTimeLabel(timeToDecimal(hour)))
            : [hourData.active_hours, hourData.break_hours, hourData.total_hours].map(timeStr =>
                timeStr ? formatTimeLabel(timeToDecimal(timeStr)) : '0h 0min'
            )
    ), [avgactiveHours, avgbreakHours, avgtotalHours, hourData, isCustomRange, date]);


    const chartOptions = {
        maintainAspectRatio: false,
        animation: {
            duration: 0,
        },
        plugins: {
            title: {
                display: true,
                text: isCustomRange ? "Average Working Hours" : `${date}`,
                font: {
                    size: 15,
                    weight: 'bold'
                },
                padding: {
                    top: '0px',
                    bottom: '0px'
                },
                color: '#333'
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const index = context.dataIndex;
                        return tooltipLabels[index];
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Average Time'
                },

            }
        }
    };

    return (

        <div className="border w-60 rounded p-3 shadow-sm" style={{ height: '380px' }}>

            <Bar
                key={JSON.stringify([avgactiveHours, avgbreakHours, avgtotalHours, startDate, endDate])}
                data={chartData}
                options={chartOptions}
            />


        </div>


    );
}

export default DashboardEmployee;


