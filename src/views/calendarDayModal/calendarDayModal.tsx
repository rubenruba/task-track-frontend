import AddIcon from "@mui/icons-material/Add";
import { IconButton, Modal } from "@mui/material";
import moment from "moment";
import { nanoid } from "nanoid";
import { FC, useState } from "react";
import { CalendarDayTask } from "../../components/calendarDayTask/calendarDayTask";
import { TaskModel } from "../../models/task";
import { UserMinimal } from "../../models/user";
import { TaskService } from "../../services/TaskService";
import "./calendarDayModal.sass";

interface ModalProps {
  date: string;
  open: boolean;
  handleClose: Function;
  user: UserMinimal;
  tasks: TaskModel[];
  setTasks: Function;
}

export const CalendarDayModal: FC<ModalProps> = ({ date, open, handleClose, user, tasks, setTasks }) => {
  const taskService = new TaskService();
  const [add, setAdd] = useState(false);
  const momentDate = moment(date);

  const addTask = async (inputValue: string) => {
    if (inputValue !== "") {
      const newTask = {
        id: nanoid(),
        date: momentDate.format("YYYY-MM-DD"),
        text: inputValue,
        users: [user.id],
        completed: false,
      };
      tasks.push(newTask);
      setTasks((prev: TaskModel[]) => {
        prev.push(newTask);
        return prev;
      });
      await taskService.createTask(newTask);
    }
    setAdd(false);
  };

  const deleteTask = (task: TaskModel) => {
    setTasks((prev: TaskModel[]) => {
      return prev.filter((t) => t.id !== task.id);
    })
  };

  const editTask = (task: TaskModel) => {
    setTasks((prev: TaskModel[]) => {
      return prev.map((t) => {
        if (t.id === task.id) t = task;
        return t;
      });
    });
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
                editTask={editTask}
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
