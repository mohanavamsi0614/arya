import { useState } from "react";
import "./Dash.css";
import DashboardNav from "./DashboardNav"; // Import the new component

function Dashboard() {
  const orders = Array(8).fill({
    id: "#ODR109",
    date: "Sat, October 20, 2025",
    time: "02:47 PM",
    customer: "Winston Pitt",
    type: "Dine-In",
    table: "Table 12",
    items: [
      { name: "Paneer Amrit Handi", price: "£12.29", qty: 1 },
      { name: "Paneer Butter Masala", price: "£15.00", qty: 1 },
    ],
    total: "£27.29",
    status: "On Process"
  });

  const [activeTab, setActiveTab] = useState("Orders");
  const [orderStatus, setOrderStatus] = useState("All");
  const [orderType, setOrderType] = useState("All");

  const statusOptions = ["All", "On Process", "Completed", "Shipped", "Delivered", "Cancelled"];
  const typeOptions = ["All", "Dine In", "Takeaway", "Online"];

  return (
    <div className="dashboard-app">
      <div className="dashboard-container">
        
        {/* Separate Navbar Component */}
        <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Order Filter Navigation */}
        <div className="order-filter-header">
          <h3 className="filter-title">Orders</h3>
        </div>
        <div className="order-filter-nav">
          <div className="filter-section-status">
            <div className="filter-buttons">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  className={`filter-btn ${orderStatus === status ? "active" : ""}`}
                  onClick={() => setOrderStatus(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          
          <div className="filter-section">
            <div className="filter-buttons">
              {typeOptions.map((type) => (
                <button
                  key={type}
                  className={`filter-btn ${orderType === type ? "active" : ""}`}
                  onClick={() => setOrderType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Orders Grid */}
        <div className="orders-grid">
          {orders.map((order, idx) => (
            <div key={idx} className="order-card">
              <div className="order-header">
                <span>{order.date}</span>
                <span>{order.time}</span>
              </div>
              <h3 className="order-customer">{order.customer}</h3>
              <div className="order-details">
                <p className="order-id">{order.id}</p>
                <div className="order-meta">
                  <p>{order.type}</p>
                  <p>{order.table}</p>
                </div>
              </div>
              <div className="order-items-header">
                <p>Items</p>
              </div>
              <div className="order-items">
                {order.items.map((item, i) => (
                  <div key={i} className="order-item">
                    <img src="/media/corn-palak.png" alt={item.name} />
                    <div className="order-item-info">
                      <span>{item.name}</span>
                      <div className="order-item-details">
                        <span>×{item.qty}</span>
                        <span>{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <span>Total</span>
                <span>{order.total}</span>
              </div>
              <div className="order-actions">
                <button className="accept-btn">Accept</button>
                <button className="completed-btn">Completed</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
