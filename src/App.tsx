import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserService } from "./services/UserService";
import { Calendar } from "./views/calendar/calendar";
import { Login } from "./views/login/login";
import { Register } from "./views/register/register";
import { NotFound } from "./views/notFound/notFound";

export const App: FC = () => {
  const userService = new UserService();
  const userToken = userService.getCurrentUser();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* TO DO - Not found page */}
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
