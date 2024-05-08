import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { UserService } from "./services/UserService";
import { Calendar } from "./views/calendar/calendar";
import { Login } from "./views/login/login";
import { NotFound } from "./views/notFound/notFound";
import { Register } from "./views/register/register";

export const App: FC = () => {
  const userService = new UserService();
  const userToken = userService.getCurrentUser();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />

      {!userToken && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}

      {userToken?.user && (
        <>
          <Route path="/calendar" element={<Calendar user={userToken.user} />} />
        </>
      )}
    </Routes>
  );
};
