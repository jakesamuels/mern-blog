import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import AuthProvider from "./context/AuthContext";
import Layout from "./components/Layout/Layout";

// Protected Routes Component
import ProtectedRoutes from "./components/auth/ProtectedRoutes";

// Auth Components
import AuthLayout from "./components/auth/AuthLayout";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

// Post Pages
import DiscoverPage from "./pages/DiscoverPage";

// Dashboard
import Dashboard from "./pages/Dashboard";
import AddPost from "./components/dashboard/AddPost";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<App />} />
            <Route path="/posts">
              <Route index element={<Navigate to="/" replace />} />
              <Route path=":id" element={<p>Post</p>} />
              <Route path="discover" element={<DiscoverPage />} />
            </Route>
          </Route>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          >
            <Route path="addPost" element={<AddPost />} />
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
