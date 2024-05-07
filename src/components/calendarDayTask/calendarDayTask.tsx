import { FC, useRef, useState } from "react";
import { TaskModel } from "../../models/task";
import { Checkbox, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./calendarDayTask.sass";
import { TaskService } from "../../services/TaskService";

interface DayTaskProps {
  task: TaskModel;
  editTask: Function;
  deleteTask: Function;
}

export const CalendarDayTask: FC<DayTaskProps> = ({ task, editTask, deleteTask }) => {
  const taskService = new TaskService();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [taskText, setTaskText] = useState(task.text);
  const open = Boolean(anchor);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const darkBlue = { color: "#014B7A" };

  const handleDelete = async () => {
    setAnchor(null);
    deleteTask(task);
    await taskService.deleteTask(task);
  };
  
  const handleComplete = async () => {
    task.completed = !task.completed;
    editTask(task);
    await taskService.update(task);
  };

  const handleEdit = async () => {
    if (!inputRef.current) return;
    inputRef.current.disabled = true;
    task.text = taskText;
    editTask(task);
    await taskService.update(task);
  }

  const inputFocus = () => {
    if (!inputRef.current) return;
    setAnchor(null);
    setTimeout(() => {
      inputRef.current!.disabled = false;
      inputRef.current!.focus();
    }, 100);
  }

  return (
    <div className="day-task">
      <div style={{ width: '100%' }}>
        <Checkbox
          onClick={handleComplete}
          checked={task.completed}
          style={{ color: "#0197F6" }}
        />
        <input 
          className="day-task-input" 
          value={taskText} 
          onChange={(e) => setTaskText(e.target.value)}
          onBlur={handleEdit}
          ref={inputRef}
          disabled
        />
      </div>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)} size="small">
        <MoreVertIcon sx={darkBlue} />
      </IconButton>

      <Menu anchorEl={anchor} open={open} onClose={() => setAnchor(null)}>
        <MenuItem onClick={inputFocus}>
          <ModeEditIcon sx={darkBlue} />
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteOutlineIcon sx={darkBlue} />
        </MenuItem>
      </Menu>
    </div>
  );
};
