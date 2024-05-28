import { FC, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { UserService } from "./services/UserService";
import { AllTasks } from "./views/allTasks/allTasks";
import { Calendar } from "./views/calendar/calendar";
import { Lists } from "./views/lists/lists";
import { Login } from "./views/login/login";
import { NotFound } from "./views/notFound/notFound";
import { Register } from "./views/register/register";
import { ResetPassword } from "./views/resetPassword/resetPassword";
import { VerifyEmail } from "./views/verifyEmail/verifyEmail";

export const App: FC = () => {
  const [active, setActive] = useState(false);
  const userService = new UserService();
  const userDecoded = userService.getCurrentUser();

  useEffect(() => {
    const active = async () => {
      if (!userDecoded) return;
      setActive(await userService.activeAccount(userDecoded.user.id));
    }
    active();
  }, [userDecoded]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />

      {!userDecoded && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify" element={<VerifyEmail />} />
        </>
      )}

      {userDecoded?.user && active && (
        <>
          <Route path="/calendar" element={<Calendar user={userDecoded.user} />} />
          <Route path="/tasks" element={<AllTasks user={userDecoded.user} />} />
          <Route path="/lists" element={<Lists user={userDecoded.user} />} />
        </>
      )}
    </Routes>
  );
};
