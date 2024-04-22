import { FC, useEffect, useState } from "react";
import { MenuComponent } from "../../components/menu/menu";
import { CalendarDayComponent } from "../../components/calendarDay/calendarDay";
import { getMonthString } from "../../utils/getMonthString";
import { IconButton } from "@mui/material";
import { DatePickerCustom } from "../../components/datePicker/datePicker";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './calendar.sass';

export const Calendar: FC = () => {
    const [date, setDate] = useState<Date>(new Date());
    const [month, setMonth] = useState<number>(date.getMonth());
    const [days, setDays] = useState<Array<number>>([])

    useEffect(() => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const newDays = [];
        let day = firstDay.getDate();

        for(let i = 1; i <= 35; i++) {
            if(firstDay.getDay() > i) newDays.push(0);
            else if(lastDay.getDate() < day) newDays.push(0);
            else newDays.push(day++);
        }

        setDays(newDays);
        setMonth(date.getMonth());
        console.log(date);
    }, [date]);

    const nextMonth = () => {
        setDate(new Date(date.setMonth(date.getMonth() + 1)));
    }

    const previousMonth = () => {
        setDate(new Date(date.setMonth(date.getMonth() - 1)));
    }

    return (
        <section className="calendar-section">
            <MenuComponent />
            <div className="calendar-container">
                <div className="calendar-month">
                    <IconButton onClick={previousMonth} size="small" style={{ color: '#014B7A' }}>
                        <ChevronLeftIcon/>
                    </IconButton>
                    <div>
                        <h1>{getMonthString(date) + ' ' + date.getFullYear()}</h1>
                        <DatePickerCustom></DatePickerCustom>
                    </div>
                    <IconButton onClick={nextMonth} size="small" style={{ color: '#014B7A' }}>
                        <ChevronRightIcon />
                    </IconButton>
                </div>
                <div className="calendar-days">
                    {days.length > 0 && days.map((day, idx) => {
                        return <CalendarDayComponent props={{day: day, index: idx}}/>
                    })}
                </div>
            </div>
        </section>
    );
} 