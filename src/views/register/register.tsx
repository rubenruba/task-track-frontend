import { FC, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { FormInput } from "../../components/formInput/formInput";
import { UserRegister } from "../../models/user";
import { UserService } from "../../services/UserService";

export const Register: FC = () => {
  const userService = new UserService();
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const updateValue = (prop: string, value: string) => {
    setValue((prevState) => ({
      ...prevState,
      [prop]: value,
    }));
  };

  const registerAction = (e: FormEvent) => {
    e.preventDefault();
    if (value.password !== value.repeatPassword) return;
    const user: UserRegister = {
      username: value.username,
      email: value.email,
      password: value.password,
    }
    userService.register(user);
  }

  return (
    <div className="register-login-container">
      <form>
        <h1>Sign up</h1>
        <FormInput
          forId="username"
          title="Username"
          type="text"
          updateValue={updateValue}
        />
        <FormInput
          forId="email"
          title="Email"
          type="email"
          updateValue={updateValue}
        />
        <FormInput
          forId="password"
          title="Password"
          type="password"
          updateValue={updateValue}
        />
        <FormInput
          forId="repeatPassword"
          title="Repeat password"
          type="password"
          updateValue={updateValue}
        />
        <Link to="/login">Already have an account? Login now</Link>
        <button onClick={(e) => registerAction(e)}>Register</button>
      </form>
    </div>
  );
};
