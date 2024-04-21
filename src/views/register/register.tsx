import { FC, useState } from "react";
import { FormInput } from "../../components/formInput/formInput";
import { Link } from "react-router-dom";

export const Register: FC = () => {
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
          title="Password"
          type="password"
          updateValue={updateValue}
        />
        <Link to="/login">Already have an account? Login now</Link>
        <button>Register</button>
      </form>
    </div>
  );
};
