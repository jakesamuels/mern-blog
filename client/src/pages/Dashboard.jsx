import { NavLink, Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <nav>
        <NavLink to="/dashboard/addPost">Add Post</NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default Dashboard;
