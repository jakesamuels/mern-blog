import { NavLink, Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <nav>
        <NavLink to="/dashboard/addPost">Add Post</NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default Dashboard;
