import { FC } from 'react';
import './calendarDay.sass';

interface CalendarDayProps {
    day: number;
    index: number;
}

export const CalendarDayComponent: FC<{props: CalendarDayProps}> = ({ props }) => {
    return (
        <div className="calendar-day">
            <p>{props.day !== 0 && (props.day)}</p>
        </div>
    )
}