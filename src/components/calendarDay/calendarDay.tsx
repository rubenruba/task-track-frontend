import { FC, useState } from "react";
import { Modal } from "@mui/material";
import "./calendarDay.sass";

interface CalendarDayProps {
  day: number;
  index: number;
  date: Date;
}

export const CalendarDayComponent: FC<{ props: CalendarDayProps }> = ({ props }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="calendar-day" onClick={() => setOpen(true)}>
        <p>{props.day !== 0 && props.day}</p>
      </div>

      <Modal open={open} onClose={handleClose}>
        <div className="calendar-day-modal">
            <h2>{props.date.toString()}</h2>
        </div>
      </Modal>
    </>
  );
};
