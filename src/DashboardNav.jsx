import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Dash.css";

function DashboardNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Define custom routes for each tab
  const tabRoutes = {
    Dashboard: "/dashboard",
    Menu: "/menu_dashboard",
    Orders: "/orders",
    Reservations: "/reservations",
    Loyalty: "/loyalty-program" // custom path example
  };

  const tabs = Object.keys(tabRoutes);

  // Determine active tab from URL path
  const activeTab =
    tabs.find((tab) => location.pathname.toLowerCase() === tabRoutes[tab].toLowerCase()) ||
    "Dashboard";

  return (
    <div className="dashboard-header">
      <div className="dashboard-nav">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => navigate(tabRoutes[tab])}
            className={activeTab === tab ? "active" : ""}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DashboardNav;
