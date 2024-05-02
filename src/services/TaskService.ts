import axios from "axios";
import { UserService } from "./UserService";
import { TaskModel } from "../models/task";

export class TaskService {
  private userService = new UserService();
  private user;
  private token;
  private baseURL;

  constructor() {
    this.baseURL = `${process.env.REACT_APP_API_URL}/task`;
    this.user = this.userService.getCurrentUser()?.user;
    this.token = this.userService.getCurrentUser()?.token;
  }

  private async getTasks(url: string) {
    if (!this.token || !this.user) return null; 
    const tasks = await axios.get(url, {
        headers: { Authorization: this.token }
    }) as TaskModel[];
    return tasks;
  } 

  public async getTaskById(taskId: string) {
    return this.getTasks(`${this.baseURL}/${taskId}`);
  }

  public async getTaskByUserId(userId: string) {
    return this.getTasks(`${this.baseURL}/user/${userId}`);
  }

  public async getTaskByUserIdAndDate(userId: string, date: string) {
    return this.getTasks(`${this.baseURL}/${userId}/${date}`);
  }

  public async createTask(task: TaskModel) {
    if (!this.token || !this.user) return;
    await axios.post(this.baseURL, task, {
      headers: { Authorization: this.token },
    });
  }

  public async deleteTask(task: TaskModel) {
    if (!this.token || !this.user || !task.users.includes(this.user.id)) return;
    await axios.delete(`${this.baseURL}/${task.id}`, {
      headers: { Authorization: this.token },
    });
  }

  public async update(task: TaskModel) {
    if (!this.token || !this.user || !task.users.includes(this.user.id)) return;
    await axios.put(this.baseURL, task, {
      headers: { Authorization: this.token },
    });
  }
}
