import React, { useState, useEffect, useMemo } from 'react';
import { useAdmin } from '../context/AuthContext';
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
import axios from 'axios';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

function DashboardAdmin() {
  console.log("DashboardAdmin");
  const {
    date,
    startDate,
    endDate,
    avgactiveHours,
    avgbreakHours,
    avgtotalHours,
    employee
  } = useAdmin();

  const [hourData, setHourData] = useState({});
  const user_id = employee && 'stu_id' in employee ? 'stu_id' : 'emp_id';
  const user = user_id === 'stu_id' ? 'student' : 'employee';
  const userValue = employee?.[user_id];
  const isCustomRange = startDate !== null && endDate !== null;

  useEffect(() => {
    const fetchHours = async () => {
      if (!isCustomRange) {
        try {
          setHourData({});
          const response = await axios.post(
            `/api/hours/${user}/${userValue}`,
            { date },
            {
              headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`,
              }
            }
          );
          setHourData(response.data);
        } catch (error) {
          console.log("Error fetching data:", error);
          console.log(error);
        }
      }
    };
    fetchHours();
  }, [date, isCustomRange, userValue]);

  // Convert "Xhr Y minutes" string to total minutes
  const timeToMinutes = (timeStr) => {
    const hoursMatch = timeStr.match(/(\d+)\s*hr/);
    const minutesMatch = timeStr.match(/(\d+)\s*min?/);
    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
    return hours * 60 + minutes;
  };

  // Convert minutes to "Xh Ym" label
  const minutesToHourMinute = (mins) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}h ${minutes}m`;
  };

  const chartData = useMemo(() => ({
    labels: ['Active Hours', 'Break Hours', 'Total'],
    datasets: [
      {
        label: 'Average Hours',
        data: [
          typeof avgactiveHours === 'string' ? timeToMinutes(avgactiveHours) : 0,
          typeof avgbreakHours === 'string' ? timeToMinutes(avgbreakHours) : 0,
          typeof avgtotalHours === 'string' ? timeToMinutes(avgtotalHours) : 0,
        ],
        backgroundColor: [
          'rgba(43, 63, 229, 0.8)',
          'rgba(250, 192, 19, 0.8)',
          'rgba(253, 135, 135, 0.8)',
        ],
        borderWidth: 2,
      }
    ]
  }), [avgactiveHours, avgbreakHours, avgtotalHours]);

  const tooltipLabels = useMemo(() => (
    [
      typeof avgactiveHours === 'string' ? avgactiveHours : '0hr 0minutes',
      typeof avgbreakHours === 'string' ? avgbreakHours : '0hr 0minutes',
      typeof avgtotalHours === 'string' ? avgtotalHours : '0hr 0minutes',
    ]
  ), [avgactiveHours, avgbreakHours, avgtotalHours]);

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Bar chart',
        font: {
          size: 15,
          weight: 'bold'
        },
        color: '#333'
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return tooltipLabels[context.dataIndex] || '0h 0min';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Average Time'
        },
        ticks: {
          callback: function (value) {
            return minutesToHourMinute(value);
          }
        }
      }
    }
  };

  return (
    <div className="border w-100 rounded bg-white p-3 shadow-sm" style={{ height: '391px' }}>
      <Bar
        key={isCustomRange ? `${startDate} - ${endDate}` : date}
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
}

export default DashboardAdmin;
