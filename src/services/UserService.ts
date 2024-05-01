import axios from "axios";
import {
  UserLogin,
  UserMinimal,
  UserRegister,
  UserToken,
} from "../models/user";

export class UserService {
  private baseURL;

  constructor() {
    this.baseURL = `${process.env.REACT_APP_API_URL}/user`;
  }

  private async authenticate(url: string, data: UserLogin | UserRegister) {
    const userToken = await axios.post(url, data) as UserToken;
    if (!userToken) return;
    this.saveUser(userToken);
    window.location.href = "/calendar";
  }

  private async getUserBy(url: string) {
    const userToken = this.getUser();
    if (!userToken) return null;
    const user = await axios.get(url, {
      headers: { Authorization: userToken.token },
    }) as UserMinimal;
    return user;
  }

  public login(user: UserLogin) {
    this.authenticate(`${this.baseURL}/login`, user);
  }

  public createUser(user: UserRegister) {
    this.authenticate(`${this.baseURL}/register`, user);
  }

  public getUserById(userId: string) {
    return this.getUserBy(`${this.baseURL}/userId/${userId}`);
  }

  public getUserByEmail(email: string) {
    return this.getUserBy(`${this.baseURL}/email/${email}`);
  }

  public async getAllUsers() {
    const userToken = this.getUser();
    if (!userToken || userToken?.user.admin === false) return null;
    const users = await axios.get(`${this.baseURL}/all`, {
      headers: { Authorization: userToken.token },
    }) as UserMinimal[];
    return users;
  }

  public async getAllEmails() {
    const emails = await axios.get(`${this.baseURL}/emails`) as string[];
    return emails;
  }

  public async deleteUser(userId: string) {
    const userToken = this.getUser();
    if (!userToken || userToken?.user.admin === false) return;
    await axios.delete(`${this.baseURL}/delete/${userId}`, {
      headers: { Authorization: userToken.token },
    });
  }

  public async updateUser(user: UserMinimal) {
    const userToken = this.getUser();
    if (!userToken) return;
    await axios.put(`${this.baseURL}/edit`, user, {
      headers: { Authorization: userToken.token },
    });
  }

  private saveUser(user: UserToken) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getUser(): UserToken | null {
    const user = localStorage.getItem("user");
    if (!user) return null;
    return JSON.parse(user);
  }

  public logout() {
    localStorage.removeItem("user");
  }
}
