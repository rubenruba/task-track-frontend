import { FC, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { FormInput } from "../../components/formInput/formInput";
import { UserService } from "../../services/UserService";

export const Login: FC = () => {
  const userService = new UserService();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const updateValue = (prop: string, value: string) => {
    setValue((prevState) => ({
      ...prevState,
      [prop]: value,
    }));
  };

  const loginAction = (e: FormEvent) => {
    e.preventDefault();
    userService.login({ email: value.email, password: value.password });
  }

  return (
    <div className="register-login-container">
      <form>
        <h1>Login</h1>
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
        <Link to="/login">Forget password?</Link>
        <Link to="/register">Don't have an account? Register now</Link>
        <button onClick={(e) => loginAction(e)}>Login</button>
      </form>
    </div>
  );
};
