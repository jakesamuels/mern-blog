import { Outlet, useLocation, NavLink } from "react-router";
import ScrollToTop from "./../utils/ScrollToTop";

const AuthLayout = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="auth-layout">
      <ScrollToTop />
      <section className="section__auth-form">
        <h1>{isRegisterPage ? "Join Us Today!" : "Welcome Back!"}</h1>

        <Outlet />

        <small>
          {isLoginPage ? "Don't" : "Already"} have an account?{" "}
          <NavLink to={isLoginPage ? "/register" : "/login"}>
            {isLoginPage ? "Register" : "Log in"} here.
          </NavLink>
        </small>
      </section>

      <section className="section__auth-img"></section>
    </div>
  );
};

export default AuthLayout;
