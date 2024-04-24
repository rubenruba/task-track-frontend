import { IconButton, Modal } from "@mui/material";
import { FC, useState } from "react";
import { TaskModel } from "../../models/task";
import { nanoid } from "nanoid";
import { CalendarDayTask } from "../../components/calendarDayTask/calendarDayTask";
import moment from "moment";
import AddIcon from "@mui/icons-material/Add";
import "./calendarDayModal.sass";

interface ModalProps {
  date: Date;
  open: boolean;
  handleClose: Function;
}

export const CalendarDayModal: FC<ModalProps> = ({ date, open, handleClose }) => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [add, setAdd] = useState(false);
  const momentDate = moment(date);

  const addTask = (inputValue: string) => {
    if (inputValue !== "") {
      const newTask = {
        id: nanoid(),
        date: momentDate.format("DD-MM-YYYY"),
        text: inputValue,
        user: [], // TO DO - Add current user id
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }

    setAdd(false);
  };

  const deleteTask = (task: TaskModel) => {
    const newTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(newTasks);
  };

  const setCompleted = (task: TaskModel) => {
    const newTasks = tasks.map((t) => {
      if (t.id === task.id) task.completed = !task.completed;

      return t;
    });
    setTasks(newTasks);
  };

  return (
    <Modal open={open} onClose={() => handleClose()}>
      <div className="calendar-day-modal">
        <h2>{momentDate.format("D MMMM YYYY")}</h2>
        <div className="day-tasks-container">
          {tasks.map((task) => {
            return (
              <CalendarDayTask
                task={task}
                setCompleted={setCompleted}
                deleteTask={deleteTask}
              />
            );
          })}
        </div>
        <div className="add-button">
          {!add && (
            <IconButton onClick={() => setAdd(true)} size="small">
              <AddIcon style={{ color: "#014B7A" }} />
            </IconButton>
          )}
          {add && (
            <input
              type="text"
              autoFocus
              onBlur={(e) => addTask(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                addTask((e.target as HTMLInputElement).value)
              }
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
