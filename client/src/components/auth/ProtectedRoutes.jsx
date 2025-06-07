import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./../../context/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated) {
        console.log("Not authorized");

        return navigate("/login");
      }
    };

    checkAuth();
  }, []);

  return children;
};

export default ProtectedRoutes;
