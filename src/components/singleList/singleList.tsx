import { AddTask, DeleteOutline, MoreVert, People } from "@mui/icons-material";
import { Checkbox, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { FC, useState } from "react";
import { ListModel, TaskListModel } from "../../models/list";
import { AddUserModal } from "../addUserModal/addUserModal";
import "./singleList.sass";

interface ListComponentProps {
    list: ListModel;
    handleDelete: (list: ListModel) => void;
    handleUpdate: (list: ListModel) => void;
}

export const ListComponent: FC<ListComponentProps> = ({ list, handleDelete, handleUpdate }) => {
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const [taskText, setTaskText] = useState("");
    const [visible, setVisible] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const open = Boolean(anchor);
    const darkBlue = { color: "#014B7A" };

    const handleAddTask = () => {
        setVisible(false);
        if (taskText.trim().length <= 0) return;
        const newTask: TaskListModel = { text: taskText.trim(), completed: false };
        list.tasks.push(newTask);
        setTaskText("");
        handleUpdate(list);
    };

    const handleDeleteTask = (taskText: string) => {
        list.tasks = list.tasks.filter((t) => t.text !== taskText);
        handleUpdate(list);
    };

    const handleCompleted = (taskText: string) => {
        list.tasks = list.tasks.map((t) => {
            if (t.text === taskText) t.completed = !t.completed;
            return t;
        });
        handleUpdate(list);
    };

    return (
        <div className="list" key={list.id}>
            <div className="list-title">
                <input type="text" value={list.title} />
                <IconButton
                    onClick={(e) => setAnchor(e.currentTarget)}
                    size="small"
                    sx={{ float: "right" }}
                >
                    <MoreVert />
                </IconButton>
            </div>

            {list.tasks.map((task) => {
                return (
                    <div key={task.text} className="task-list">
                        <div>
                            <Checkbox
                                checked={task.completed}
                                onChange={() => handleCompleted(task.text)}
                                size="medium"
                                style={{ padding: "3px", color: "#0197F6" }}
                            />
                            <p>{task.text}</p>
                        </div>
                        <IconButton
                            onClick={() => handleDeleteTask(task.text)}
                            size="small"
                            sx={{ padding: "3px" }}
                        >
                            <DeleteOutline className="delete-task-icon" sx={{ color: "#d33838" }}
                            />
                        </IconButton>
                    </div>
                );
            })}

            <Menu anchorEl={anchor} open={open} onClose={() => setAnchor(null)}>
                <MenuItem onClick={() => setVisible(true)}>
                    <ListItemIcon>
                        <AddTask sx={darkBlue} />
                    </ListItemIcon>
                    <ListItemText>Add Task</ListItemText>
                    {visible && (
                        <input
                            className="add-task-input"
                            onBlur={handleAddTask}
                            onChange={(e) => setTaskText(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
                            type="text"
                            autoFocus
                        />
                    )}
                </MenuItem>
                <MenuItem onClick={() => setOpenModal(true)}>
                    <ListItemIcon>
                        <People sx={darkBlue} />
                    </ListItemIcon>
                    <ListItemText>Users</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleDelete(list)}>
                    <ListItemIcon>
                        <DeleteOutline sx={{ color: "#d33838" }} />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>

            <AddUserModal
                open={openModal}
                list={list}
                handleEdit={handleUpdate}
                handleClose={() => setOpenModal(false)}
            />
        </div>
    );
};
