import moment, { Moment } from "moment";
import { FC, useEffect, useState } from "react";
import { TaskModel } from "../../models/task";
import { UserMinimal } from "../../models/user";
import { CalendarDayModal } from "../../views/calendarDayModal/calendarDayModal";
import "./calendarDay.sass";

interface CalendarDayProps {
  date: string;
  user: UserMinimal;
  tasks: TaskModel[];
  setTasks: Function;
}

export const CalendarDayComponent: FC<CalendarDayProps> = ({ date, user, tasks, setTasks }) => {
  const [momentDate, setMomentDate] = useState<Moment | null>(moment(date));
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (date === 'Invalid date') setMomentDate(null); // To not see NaN in screnn
    else setMomentDate(moment(date));
  }, [date]);

  const handleOpen = () => {
    if (momentDate !== null) setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="calendar-day" onClick={handleOpen}>
        <p>{momentDate?.date()}</p>
        {tasks.map((task, index) => {
          if (index < 3) return <p className="calendar-day-task">{task.text}</p>
          else if (index === tasks.length - 1) return <p style={{ textAlign: 'center' }}>...</p>;
          return '';
        })}
      </div>

      <CalendarDayModal 
        user={user} 
        date={date} 
        open={open} 
        handleClose={handleClose} 
        tasks={tasks}
        setTasks={setTasks} 
      />
    </>
  );
};
