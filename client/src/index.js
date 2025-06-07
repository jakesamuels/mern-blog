import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthProvider from "./context/AuthContext";

// Auth Components
import AuthLayout from "./components/auth/AuthLayout";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<App />} />

          <Route element={<AuthLayout />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>

          {/* <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="settings" element={<Settings />} />
        </Route> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
