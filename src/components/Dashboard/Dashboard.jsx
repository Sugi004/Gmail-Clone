import Navbars from "../Navbar/Navbars";
import Sidebar from "../Side bar/Sidebar";
import { Outlet } from "react-router-dom";
import "./index.css";
import useAuth from "../../Validation/useAuth";

function Dashboard() {
  // Validating cookies,calling it here as it's a nested routes
  useAuth();

  return (
    <>
      <div className="main-wrapper">
        <div>
          <div className="wl"></div>
          <div className="wq"></div>
          <div className="wp"></div>
          <div className="wo"></div>
          <div className="wn"></div>
        </div>
        <div tabIndex={0}></div>
        <div className="custom-layout ">
          <div className="side-wrapper">
            <Navbars />
            <Sidebar />
          </div>

          <div className="section-wrapper section">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
