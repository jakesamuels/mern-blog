import { Outlet, useLocation } from "react-router";

const AuthLayout = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      <h1>{isRegisterPage ? "Join Us Today!" : "Welcome Back!"}</h1>

      <Outlet />
    </div>
  );
};

export default AuthLayout;
