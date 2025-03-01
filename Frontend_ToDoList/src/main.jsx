import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import RegisterPage from "./Pages/RegisterPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import DashboardPage from "./Pages/DashboardPage.jsx";
import TaskPage from "./Pages/TaskPage.jsx";
import UpdateProfilePage from "./Pages/UpdateProfilePage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<DashboardPage />} />}
      />
      <Route path="/task" element={<ProtectedRoute element={<TaskPage />} />} />
      <Route
        path="/task/:taskId"
        element={<ProtectedRoute element={<TaskPage />} />}
      />
      <Route
        path="/update-profile"
        element={<ProtectedRoute element={<UpdateProfilePage />} />}
      />

      <Route path="*" element={<App />} />
    </Routes>
  </BrowserRouter>
);
