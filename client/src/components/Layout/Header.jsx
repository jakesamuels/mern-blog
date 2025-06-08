import { useState, useEffect } from "react";
import { useAuth } from "./../../context/AuthContext";
import { NavLink, useNavigate } from "react-router";

import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const { isAuthenticated, logOut } = useAuth();
  let navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigate = () => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  };

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogOut = () => {
    setMenuOpen(false);
    logOut();
    navigate("/");
  };

  return (
    <header className="header__nav">
      <NavLink to="/">Logo</NavLink>

      {/* DESKTOP NAV */}
      <nav className="nav__desktop">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/#latest">Trending</NavLink>
          </li>
          <li>
            <NavLink to="/#top-picks">Top Picks</NavLink>
          </li>
          <li>
            <NavLink to="/posts/discover">Discover</NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          )}
        </ul>
        <button
          onClick={isAuthenticated ? handleLogOut : handleNavigate}
          className="log-in"
        >
          {isAuthenticated ? "Log Out" : "Log In"}
        </button>
      </nav>

      {/* MOBILE NAV */}
      {!isAuthenticated ? (
        <button onClick={handleNavigate} className="log-in log-in__mobile">
          Log In
        </button>
      ) : (
        <button onClick={handleToggleMenu} className="nav__menu-btn">
          {!menuOpen ? <FaBars /> : <FaTimes />}
        </button>
      )}

      {/* MOBILE DROPDOWN */}
      {isAuthenticated && menuOpen && (
        <nav className="nav__mobile">
          <ul className="nav__dropdown">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/#latest">Trending</NavLink>
            </li>
            <li>
              <NavLink to="/#top-picks">Top Picks</NavLink>
            </li>
            <li>
              <NavLink to="/posts/discover">Discover</NavLink>
            </li>
            {isAuthenticated && (
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            )}
          </ul>

          <button onClick={handleLogOut} className="log-out__mobile">
            Log Out
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
