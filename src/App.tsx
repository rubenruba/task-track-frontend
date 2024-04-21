import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./views/login/login";
import { Register } from "./views/register/register";

export const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={""} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
