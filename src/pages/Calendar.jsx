import { useState } from "react";

import CalendarDays from "../partials/calendar/CalendarDays";
import CalendarDaysHeader from "../partials/calendar/CalendarDaysHeader";
import CalendarHeader from "../partials/calendar/CalendarHeader";

function Calendar() {
    let today = new Date();
    const [month, setMonth] = useState(today.getMonth());
    const year = today.getFullYear();

    const decreaseMonthHandler = () => {
        setMonth((prevMonth) => prevMonth - 1);
    }

    const increaseMonthHandler = () => {
        setMonth((prevMonth) => prevMonth + 1);
    }

    return (
    <section>
        <div className="antialiased sans-serif bg-gray-100">
            <div className="container mx-auto px-4 py-2 md:py-24">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <CalendarHeader month={month%12} year={year + Math.floor(month/12)} onNextMonth={increaseMonthHandler} onPrevMonth={decreaseMonthHandler} />
                    <CalendarDaysHeader />
                    <CalendarDays month={month} year={year} />
                </div>
            </div>
        </div>
    </section>);
}

export default Calendar;