import axios, { AxiosError } from "axios";
import { ListModel } from "../models/list";
import { UserService } from "./UserService";

export class ListService {
  private userService = new UserService();
  private user;
  private token;
  private baseURL;

  constructor() {
    this.baseURL = `${process.env.REACT_APP_API_URL}/list`;
    this.user = this.userService.getCurrentUser()?.user;
    this.token = this.userService.getCurrentUser()?.token;
  }

  private async getLists(url: string): Promise<ListModel[] | void> {
    try {
      if (!this.token || !this.user) return; 
      const lists = await axios.get(url, {
          headers: { Authorization: this.token }
      });
      return lists.data as ListModel[];
    } catch (err) {
      this.userService.unauthorized(err as AxiosError);
    }
  } 

  public async getListById(listId: string) {
    return this.getLists(`${this.baseURL}/${listId}`);
  }

  public async getListsByUserId(userId: string) {
    return this.getLists(`${this.baseURL}/user/${userId}`);
  }

  public async createList(list: ListModel) {
    try {
      if (!this.token || !this.user) return;
      await axios.post(this.baseURL, list, {
        headers: { Authorization: this.token },
      });
    } catch (err) {
      this.userService.unauthorized(err as AxiosError);
    }
  }

  public async deleteList(list: ListModel) {
    try {
      if (!this.token || !this.user || !list.users.includes(this.user.id)) return;
      await axios.delete(`${this.baseURL}/${list.id}`, {
        headers: { Authorization: this.token },
      });
    } catch (err) {
      this.userService.unauthorized(err as AxiosError);
    }
  }

  public async updateList(list: ListModel) {
    try {
      if (!this.token || !this.user || !list.users.includes(this.user.id)) return;
      await axios.put(this.baseURL, list, {
        headers: { Authorization: this.token },
      });
    } catch (err) {
      this.userService.unauthorized(err as AxiosError);
    }
  }


}
