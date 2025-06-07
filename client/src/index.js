import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthProvider from "./context/AuthContext";
import Layout from "./components/Layout/Layout";

// Protected Routes Component
import ProtectedRoutes from "./components/auth/ProtectedRoutes";

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
          <Route element={<Layout />}>
            <Route index element={<App />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="register" element={<Register />} />

            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
