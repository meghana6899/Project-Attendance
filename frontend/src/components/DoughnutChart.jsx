import React, { useState, useEffect, useMemo } from 'react';
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

    const [hourData, setHourData] = useState({});
    const isCustomRange = startDate !== null && endDate !== null;

    useEffect(() => {
        const fetchHours = async () => {
            if (date && !isCustomRange) {
                try {
                    const response = await workHours(date);
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
        if (!timeStr) return 0;
        const [h, m, s] = timeStr.split(':').map(Number);
        return h + m / 60 + s / 3600;
    };

    const timeToDecimal2 = (timeStr) => {
        if (!timeStr) return 0;
        const hrMatch = timeStr.match(/(\d+)\s*hr/);
        const minMatch = timeStr.match(/(\d+)\s*min/);
        const hours = hrMatch ? parseInt(hrMatch[1], 10) : 0;
        const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;
        return hours + minutes / 60;
    };

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
                    'rgba(174, 223, 247, 0.8)',  // soft blue
                    'rgba(255, 211, 180, 0.8)',  // soft orange
                    'rgba(197, 225, 197, 0.8)',  // soft green
                ],
                borderColor: [
                    '#5DADE2',  // border blue
                    '#F5B041',  // border orange
                    '#58D68D',  // border green
                ],
                borderWidth: 2,
                borderRadius: 8,
                barThickness: 65,
                hoverBackgroundColor: [
                    'rgba(174, 223, 247, 1)',
                    'rgba(255, 211, 180, 1)',
                    'rgba(197, 225, 197, 1)',
                ],
            },
        ],
    }), [avgactiveHours, avgbreakHours, avgtotalHours, hourData, isCustomRange, startDate, endDate]);

    const tooltipLabels = useMemo(() => (
        isCustomRange
            ? [avgactiveHours, avgbreakHours, avgtotalHours]
            : [hourData.active_hours, hourData.break_hours, hourData.total_hours].map(timeStr =>
                timeStr ? formatTimeLabel(timeToDecimal(timeStr)) : '0h 0min'
            )
    ), [avgactiveHours, avgbreakHours, avgtotalHours, hourData, isCustomRange, date]);

    const chartOptions = {
        maintainAspectRatio: false,
        animation: {
            duration: 500,
        },
        plugins: {
            title: {
                display: true,
                text: isCustomRange ? "Average Working Hours" : `${date}`,
                font: {
                    size: 16,
                    weight: 'bold',
                },
                color: '#333',
                padding: { top: 10, bottom: 20 },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const index = context.dataIndex;
                        return tooltipLabels[index];
                    },
                },
                backgroundColor: '#fff',
                titleColor: '#333',
                bodyColor: '#666',
                borderColor: '#ccc',
                borderWidth: 1,
            },
            legend: {
                display: false,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#f0f0f0',
                },
                title: {
                    display: true,
                    text: 'Average Time (Hours)',
                    font: {
                        size: 14,
                        weight: 'bold',
                    }
                },
                ticks: {
                    stepSize: 1,
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 13,
                    }
                }
            }
        }
    };

    return (
        <div className="border w-100 rounded p-3 shadow-sm bg-white">
            <Bar
                key={JSON.stringify([avgactiveHours, avgbreakHours, avgtotalHours, startDate, endDate])}
                data={chartData}
                options={chartOptions}
                height={400}
            />
        </div>
    );
}

export default DashboardEmployee;
