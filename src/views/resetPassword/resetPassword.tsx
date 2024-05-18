import { FC, FormEvent, useState } from "react";
import { FormInput } from "../../components/formInput/formInput";
import { UserService } from "../../services/UserService";

export const ResetPassword: FC = () => {
  const userService = new UserService();
  const [value, setValue] = useState("");

  const updateValue = (_: string, value: string) => {
    setValue(value);
  };

  const resetAction = async (e: FormEvent) => {
    e.preventDefault();
    await userService.resetPassword(value);
  };

  return (
    <div className="register-login-container">
      <form>
        <h1>Reset password</h1>
        <p>We will send you an email with the new password.</p>
        <p>Check in spam section if you don't see it.</p>
        <FormInput
          forId="email"
          title=""
          type="email"
          updateValue={updateValue}
        />
        <button onClick={(e) => resetAction(e)}>Reset Password</button>
      </form>
    </div>
  );
};
