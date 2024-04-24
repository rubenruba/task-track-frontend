import { FC, useState } from "react";
import { CalendarDayModal } from "../../views/calendarDayModal/calendarDayModal";
import "./calendarDay.sass";

interface CalendarDayProps {
  day: number;
  date: Date;
}

export const CalendarDayComponent: FC<CalendarDayProps> = ({ day, date }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="calendar-day" onClick={() => setOpen(true)}>
        <p>{day !== 0 && day}</p>
      </div>

      <CalendarDayModal date={date} open={open} handleClose={handleClose}/>
    </>
  );
};
