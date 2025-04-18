



import React, { useState, useEffect, useMemo } from 'react';
import { useAdmin } from '../context/AuthContext';
import workHours from '../api/queries/workHours';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

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

    console.log(date)
    const [hourData, setHourData] = useState({});
    const isCustomRange = startDate !== null && endDate !== null;

    useEffect(() => {
        const fetchHours = async () => {
            if (!isCustomRange) {
                try {
                    const response = await workHours(date);
                    setHourData({ ...hourData, ...response });
                    console.log("Rerendered", date)
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchHours();
    }, [date, isCustomRange]);

    const formatTimeLabel = (decimalHour = 0) => {
        const hours = Math.floor(decimalHour);
        const minutes = Math.round((decimalHour - hours) * 60);
        return `${hours}h ${minutes}min`;
    };

    const timeToDecimal = (timeStr = '00:00:00') => {
        const [h, m, s] = timeStr.split(':').map(Number);
        return h + m / 60 + s / 3600;
    };

    const chartData = useMemo(() => ({
        labels: ['Active Hours', 'Break Hours', 'Total'],
        datasets: [
            {
                data: isCustomRange
                    ? [
                        typeof avgbreakHours === 'string' ? timeToDecimal(avgactiveHours) : 0,
                        typeof avgbreakHours === 'string' ? timeToDecimal(avgbreakHours) : 0,
                        typeof avgtotalHours === 'string' ? timeToDecimal(avgtotalHours) : 0,
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
    }), [avgactiveHours, avgbreakHours, avgtotalHours, hourData, isCustomRange, date]);


    const tooltipLabels = useMemo(() => (
        isCustomRange
            ? [avgactiveHours, avgbreakHours, avgtotalHours].map(hour => formatTimeLabel(timeToDecimal(hour)))
            : [hourData.active_hours, hourData.break_hours, hourData.total_hours].map(timeStr =>
                timeStr ? formatTimeLabel(timeToDecimal(timeStr)) : '0h 0min'
            )
    ), [avgactiveHours, avgbreakHours, avgtotalHours, hourData, isCustomRange, date]);


    const chartOptions = {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: `${date}`,
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
    };

    return (

        <div className="border w-60 rounded p-3 shadow-sm" style={{ height: '380px' }}>

            <Doughnut key={isCustomRange ? `${startDate} - ${endDate}` : date} data={chartData} options={chartOptions} />

        </div>


    );
}

export default DashboardEmployee;


