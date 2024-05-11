import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoveDownIcon from '@mui/icons-material/MoveDown';
import { Checkbox, IconButton, Menu, MenuItem } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { FC, useRef, useState } from "react";
import { TaskModel } from "../../models/task";
import { TaskService } from "../../services/TaskService";
import "./calendarDayTask.sass";

interface DayTaskProps {
  task: TaskModel;
  editTask: Function;
  deleteTask: Function;
}

export const CalendarDayTask: FC<DayTaskProps> = ({ task, editTask, deleteTask }) => {
  const taskService = new TaskService();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [taskText, setTaskText] = useState(task.text);
  const [openDate, setOpenDate] = useState(false);
  const open = Boolean(anchor);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const darkBlue = { color: "#014B7A" };

  const handleDelete = async () => {
    setAnchor(null);
    setOpenDate(false)
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
    setOpenDate(false)
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

      <Menu anchorEl={anchor} open={open} onClose={() => { setAnchor(null); setOpenDate(false) }} >
        <MenuItem onClick={inputFocus} >
          <ModeEditIcon sx={darkBlue} /> 
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteOutlineIcon sx={darkBlue} />
        </MenuItem>
        <MenuItem onClick={() => setOpenDate(true)}>
          <MoveDownIcon sx={darkBlue} />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              className="date-picker"
              open={openDate}
              value={moment(task.date)}
              onChange={(dat) => {
                if (!dat) return;
                task.date = dat.format('YYYY-MM-DD');
                handleEdit();
              }}
            />
          </LocalizationProvider>
        </MenuItem>
      </Menu>

    </div>
  );
};
