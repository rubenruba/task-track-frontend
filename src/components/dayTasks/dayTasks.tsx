import moment from "moment";
import { FC } from "react";
import { TaskModel } from "../../models/task";
import { CalendarDayTask } from "../calendarDayTask/calendarDayTask";
import "./dayTasks.sass";

interface DayTasksProps {
  date: string;
  tasks: TaskModel[];
  editTask: (task: TaskModel) => void;
  deleteTask: (task: TaskModel) => void;
}

export const DayTasks: FC<DayTasksProps> = ({ date, tasks, editTask, deleteTask }) => {
  return (
    <div className="day-tasks-div">
      <h3>{moment(date).format("DD - MMM - YYYY")}</h3>
      {tasks.map((task) => {
        return (
          <CalendarDayTask
            key={task.id}
            task={task}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        );
      })}
    </div>
  );
};
