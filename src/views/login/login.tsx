import { FC, useState } from "react";
import { FormInput } from "../../components/formInput/formInput";
import { Link } from "react-router-dom";

export const Login: FC = () => {
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
        <button>Login</button>
      </form>
    </div>
  );
};
