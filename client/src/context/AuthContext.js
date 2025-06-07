import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Configure axios to send cookies with requests
axios.defaults.withCredentials = true;

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const isAuthenticated = !!user;

  const registerAction = async (data) => {
    try {
      const response = await axios({
        method: "POST",
        data: data,
        url: "http://localhost:4000/api/users/register",
      });

      if (response.data.data && response.data.data.user) {
        setUser(response.data.data.user);
        navigate("/");
        return { success: true };
      } else {
        throw new Error(response.data.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data?.data?.message || error.message
      );
      return {
        success: false,
        message:
          error.response?.data?.data?.message ||
          "An unexpected error occurred during registration.",
      };
    }
  };

  const loginAction = async (data) => {
    try {
      const response = await axios({
        method: "POST",
        data: data,
        url: "http://localhost:4000/api/users/login",
      });

      if (response.data.data && response.data.data.user) {
        setUser(response.data.data.user);
        navigate("/");
        return { success: true };
      } else {
        throw new Error(response.data.data.message || "Login failed.");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.data?.message || "AN unexpected error occured."
      );
    }
  };

  const logOut = () => {
    setUser(null);
    navigate("/");
  };

  const contextValue = {
    user,
    isAuthenticated,
    registerAction,
    loginAction,
    logOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
