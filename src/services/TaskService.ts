import axios, { AxiosError } from "axios";
import { TaskModel } from "../models/task";
import { UserService } from "./UserService";

export class TaskService {
  private userService = new UserService();
  private user;
  private token;
  private baseURL;

  constructor() {
    this.baseURL = `${process.env.REACT_APP_API_URL}/task`;
    this.user = this.userService.getCurrentUser()?.user;
    this.token = this.userService.getUserToken();
  }

  private async getTasks(url: string): Promise<TaskModel[] | void> {
    try {
      if (!this.token || !this.user) return;
      const tasks = await axios.get(url, {
        headers: { Authorization: this.token }
      });
      return tasks.data as TaskModel[];
    } catch (err) {
      this.userService.unauthorized(err as AxiosError);
    }
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
    try {
      if (!this.token || !this.user) return;
      await axios.post(this.baseURL, task, {
        headers: { Authorization: this.token },
      });
    } catch (err) {
      this.userService.unauthorized(err as AxiosError);
    }
  }

  public async deleteTask(task: TaskModel) {
    try {
      if (!this.token || !this.user || !task.users.includes(this.user.id)) return;
      await axios.delete(`${this.baseURL}/${task.id}`, {
        headers: { Authorization: this.token },
      });
    } catch (err) {
      this.userService.unauthorized(err as AxiosError);
    }
  }

  public async update(task: TaskModel) {
    try {
      if (!this.token || !this.user || !task.users.includes(this.user.id)) return;
      await axios.put(this.baseURL, task, {
        headers: { Authorization: this.token },
      });
    } catch (err) {
      this.userService.unauthorized(err as AxiosError);
    }
  }
}
