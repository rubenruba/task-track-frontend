import axios, { AxiosError } from "axios";
import { UserDecoded, UserEmail, UserLogin, UserMinimal, UserRegister } from "../models/user";

export class UserService {
  private baseURL;

  constructor() {
    this.baseURL = `${process.env.REACT_APP_API_URL}/user`;
  }

  private async getUserBy(url: string) {
    const userToken = this.getUserToken();
    if (!userToken) return null;
    const user = await axios.get(url, {
      headers: { Authorization: userToken },
    }) as UserMinimal;
    return user;
  }

  public async login(user: UserLogin) {
    const userToken = (await axios.post(`${this.baseURL}/login`, user)).data;
    if (!userToken) return;
    this.saveUser(userToken);
    window.location.href = "/calendar";
  }

  public async verifyEmail(userId: string, verifyToken: string) {
    const userToken = (await axios.get(`${this.baseURL}/verify/${userId}/${verifyToken}`)).data;
    if (!userToken) return;
    this.saveUser(userToken);
    setTimeout(() => { window.location.href = "/calendar" }, 5000);
  }

  public async register(user: UserRegister) {
    await axios.post(`${this.baseURL}/register`, user);
    window.location.href = "/verify";
  }

  public async resetPassword(email: string) {
    await axios.post(`${this.baseURL}/reset-password`, { email: email });
    window.location.href = '/login';
  }

  public getUserById(userId: string) {
    return this.getUserBy(`${this.baseURL}/${userId}`);
  }

  public getUserByEmail(email: string) {
    return this.getUserBy(`${this.baseURL}/email/${email}`);
  }

  public async getAllUsers() {
    const userToken = this.getUserToken();
    if (!userToken || this.decodeToken(userToken)?.user.admin === false) return null;
    const users = await axios.get(`${this.baseURL}/all`, {
      headers: { Authorization: userToken },
    }) as UserMinimal[];
    return users;
  }

  public async getAllEmails() {
    const emails = (await axios.get(`${this.baseURL}/emails`)).data as UserEmail[];
    return emails;
  }

  public async deleteUser(userId: string) {
    const userToken = this.getUserToken();
    if (!userToken || this.decodeToken(userToken)?.user.admin === false) return;
    await axios.delete(`${this.baseURL}/${userId}`, {
      headers: { Authorization: userToken },
    });
  }

  public async updateUser(user: UserMinimal) {
    const userToken = this.getUserToken();
    if (!userToken) return;
    await axios.put(this.baseURL, user, {
      headers: { Authorization: userToken },
    });
  }

  private saveUser(userToken: string) {
    localStorage.setItem("token", JSON.stringify(userToken));
  }

  public logout() {
    localStorage.removeItem("token");
    window.location.href = '/login';
  }

  public unauthorized(err: AxiosError) {
    if (err.response?.status === 401) this.logout();
  }

  public async activeAccount(userId: string) {
    return (await axios.get(`${this.baseURL}/active-account/${userId}`)).data;
  }

  public getUserToken(): string | null {
    const userToken = localStorage.getItem("token");
    if (!userToken) return null;
    return JSON.parse(userToken);
  }

  private decodeToken(token: string | null): UserDecoded | null {
    if (!token) return null;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(atob(base64));
  };

  public getCurrentUser(): UserDecoded | null {
    const userDecoded = this.decodeToken(this.getUserToken());
    if (!userDecoded) return null;
    if (userDecoded && (new Date().getTime() > userDecoded.exp * 1000)) return null;
    else return userDecoded;
  }
}
