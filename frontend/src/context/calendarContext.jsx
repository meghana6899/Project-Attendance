import { createContext, useState } from "react";


const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {


    return (
        <CalendarContext.Provider value={{ date, setDate, checkIn, setCheckIn, checkOut, setCheckOut }}>
            {children}
        </CalendarContext.Provider>
    )
}

export default CalendarContext