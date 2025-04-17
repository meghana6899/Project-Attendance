import React from 'react'
import { useAdmin } from '../context/AuthContext'
import { useEffect } from 'react';

function DashboardEmployee() {
    const { date } = useAdmin();
    console.log("UseAdmin", useAdmin())
    useEffect(() => {
        console.log("date", date)
    }, [date])
    console.log(date)
    return (
        <div>
            {date}
        </div>
    )
}

export default DashboardEmployee
