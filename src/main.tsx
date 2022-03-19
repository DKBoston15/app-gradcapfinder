import { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/globalPage.styles";
import "./styles/globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css
import "primeicons/primeicons.css"; // icons
import "@fontsource/poppins"; // Defaults to weight 400.
import App from "./App";
import Dashboard from "./routes/Dashboard";
import Learn from "./routes/Learn";
import Profile from "./routes/Profile";
import Projects from "./routes/Projects";
import Settings from "./routes/Settings";
import Tasks from "./routes/Tasks";
import Chat from "./routes/Chat";
import Invited from "./routes/Invited";
import Admin from "./routes/Admin";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="invited"
          element={
            <PrivateRoute>
              <Invited />
            </PrivateRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="learn"
          element={
            <PrivateRoute>
              <Learn />
            </PrivateRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route
          path="settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
        <Route
          path="chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);
