import { useState } from "react";
import { useAuth } from "./../../context/AuthContext";
import { NavLink } from "react-router";

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header>
      <span>Logo</span>

      {/* DESKTOP NAV */}
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/#">Latest Blogs</NavLink>
        <NavLink to="/#">Popular Blogs</NavLink>
        <NavLink to="/#">Discover</NavLink>

        <NavLink to={!isAuthenticated ? "/login" : "/"}>
          <button>{isAuthenticated ? "Sign Out" : "Sign In"}</button>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
