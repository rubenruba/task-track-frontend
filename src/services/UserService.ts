import axios, { AxiosError } from "axios";
import { UserEmail, UserLogin, UserMinimal, UserRegister, UserToken } from "../models/user";

export class UserService {
  private baseURL;

  constructor() {
    this.baseURL = `${process.env.REACT_APP_API_URL}/user`;
  }

  private async authenticate(url: string, data: UserLogin | UserRegister) {
    const userToken = (await axios.post(url, data)).data as UserToken;
    if (!userToken) return;
    this.saveUser(userToken);
    window.location.href = "/calendar";
  }

  private async getUserBy(url: string) {
    try {
      const userToken = this.getCurrentUser();
      if (!userToken) return null;
      const user = await axios.get(url, {
        headers: { Authorization: userToken.token },
      }) as UserMinimal;
      return user;
    } catch (err) {

    }
  }

  public login(user: UserLogin) {
    this.authenticate(`${this.baseURL}/login`, user);
  }

  public register(user: UserRegister) {
    this.authenticate(`${this.baseURL}/register`, user);
  }

  public getUserById(userId: string) {
    return this.getUserBy(`${this.baseURL}/${userId}`);
  }

  public getUserByEmail(email: string) {
    return this.getUserBy(`${this.baseURL}/email/${email}`);
  }

  public async getAllUsers() {
    const userToken = this.getCurrentUser();
    if (!userToken || userToken?.user.admin === false) return null;
    const users = await axios.get(`${this.baseURL}/all`, {
      headers: { Authorization: userToken.token },
    }) as UserMinimal[];
    return users;
  }

  public async getAllEmails() {
    const emails = (await axios.get(`${this.baseURL}/emails`)).data as UserEmail[];
    return emails;
  }

  public async deleteUser(userId: string) {
    const userToken = this.getCurrentUser();
    if (!userToken || userToken?.user.admin === false) return;
    await axios.delete(`${this.baseURL}/${userId}`, {
      headers: { Authorization: userToken.token },
    });
  }

  public async updateUser(user: UserMinimal) {
    const userToken = this.getCurrentUser();
    if (!userToken) return;
    await axios.put(this.baseURL, user, {
      headers: { Authorization: userToken.token },
    });
  }

  private saveUser(user: UserToken) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getCurrentUser(): UserToken | null {
    const user = localStorage.getItem("user");
    if (!user) return null;
    return JSON.parse(user);
  }

  public logout() {
    localStorage.removeItem("user");
    window.location.href = '/login';
  }

  public unauthorized(err: AxiosError) {
    if (err.response?.status === 401) this.logout();
  }
}
