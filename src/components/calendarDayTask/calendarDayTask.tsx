import { FC, useState } from "react";
import { TaskModel } from "../../models/task";
import { Checkbox, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./calendarDayTask.sass";

interface DayTaskProps {
  task: TaskModel;
  setCompleted: Function;
  deleteTask: Function;
}

export const CalendarDayTask: FC<DayTaskProps> = ({ task, setCompleted, deleteTask }) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);
  const darkBlue = { color: "#014B7A" };

  const handleDelete = () => {
    setAnchor(null);
    deleteTask(task);
  };

  const handleComplete = () => {
    setAnchor(null);
    setCompleted(task);
  };

  return (
    <div className="day-task">
      <div>
        <Checkbox
          onClick={handleComplete}
          checked={task.completed}
          style={{ color: "#0197F6" }}
        />
        <p>{task.text}</p>
      </div>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)} size="small">
        <MoreVertIcon sx={darkBlue} />
      </IconButton>

      <Menu anchorEl={anchor} open={open} onClose={() => setAnchor(null)}>
        <MenuItem>
          <ModeEditIcon sx={darkBlue} />
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteOutlineIcon sx={darkBlue} />
        </MenuItem>
      </Menu>
    </div>
  );
};
