import { MenuItem, Select } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { DayTasks } from "../../components/dayTasks/dayTasks";
import { MenuComponent } from "../../components/menu/menu";
import { TaskModel } from "../../models/task";
import { UserMinimal } from "../../models/user";
import { TaskService } from "../../services/TaskService";
import "./allTasks.sass";

export const AllTasks: FC<{ user: UserMinimal }> = ({ user }) => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [show, setShow] = useState<number>(2);

  useEffect(() => {
    if (!user) return;
    const taskService = new TaskService();
    const getTasks = async () =>
      setTasks((await taskService.getTaskByUserId(user.id)) ?? []);
    getTasks();
  }, [user]);

  const tasksMap = useMemo(() => {
    const newMap = new Map<string, TaskModel[]>([]);
    tasks.forEach((task) => {
      if (show === 1 && !task.completed) return;
      if (show === 2 && task.completed) return;
      if (!newMap.has(task.date)) newMap.set(task.date, [task]);
      else newMap.get(task.date)?.push(task);
    });
    return new Map([...newMap.entries()].sort());
  }, [show, tasks]);

  const handleEdit = (task: TaskModel) => {
    setTasks((prev) => {
      return prev.map((t) => {
        if (t.id === task.id) return task;
        else return t;
      });
    });
  };

  const handleDelete = (task: TaskModel) => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  return (
    <section className="tasks-section">
      <MenuComponent />
      <div className="all-tasks-container">
        <Select
          value={show}
          onChange={(e) => setShow(e.target.value as number)}
          variant="outlined"
          className="select-tasks"
        >
          <MenuItem value={0}>All Tasks</MenuItem>
          <MenuItem value={1}>Completed Tasks</MenuItem>
          <MenuItem value={2}>Uncompleted Tasks</MenuItem>
        </Select>

        <div className="day-tasks">
          {Array.from(tasksMap).map(([date, value]) => (
            <DayTasks
              key={date}
              date={date}
              tasks={value}
              editTask={handleEdit}
              deleteTask={handleDelete}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
