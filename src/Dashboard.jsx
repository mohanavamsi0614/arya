import { useEffect, useState } from "react";
import "./Dash.css";
import axios from "axios";
import { AiOutlineHome } from "react-icons/ai";
import { BsVolumeUp, BsVolumeMute } from "react-icons/bs";
import { io } from "socket.io-client";
import OwnerDashboard from "./OwnerDashboard";

const socket = io("https://arya-server.onrender.com");

function Dashboard() {
  const [orders, setorders] = useState([]);
  const [activeTab, setActiveTab] = useState("Orders");
  const [orderStatus, setOrderStatus] = useState("All");
  const [orderType, setOrderType] = useState("All");
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    axios.get("https://arya-server.onrender.com/api/orders").then((res) => {
      setorders(res.data.reverse());
    });
  }, []);

  useEffect(() => {
    socket.on("new-order", (orders) => {
      setorders(orders.reverse());
    });
    return () => {
      socket.off("new-order");
    };
  }, []);

  useEffect(() => {
    let intervalId;
    if (soundEnabled && orders.some(order => order.status === "pending")) {
      intervalId = setInterval(() => {
        const audio = new window.Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
        audio.play();
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [orders, soundEnabled]);
  const statusOptions = ["All", "On Process", "Completed", "rejected", "pending"];
  const typeOptions = ["All", "dinein", "collection", "homedelivery"];

  const handleAcceptOrder = (id) => {
    axios.post(`https://arya-server.onrender.com/api/order-status`, { status: "On Process", orderId: id }).then((res) => {
      setorders(orders.map(order => order._id === id ? { ...order, status: "On Process" } : order));
    }).catch((error) => {
      console.error("Error accepting order:", error);
    });
  };

  const handleCompleteOrder = (id) => {
    axios.post(`https://arya-server.onrender.com/api/order-status`, { status: "Completed", orderId: id }).then((res) => {
      setorders(orders.map(order => order._id === id ? { ...order, status: "Completed" } : order));
    }).catch((error) => {
      console.error("Error completing order:", error);
    });
  };

  const handleRejectOrder = (id) => {
    axios.post(`https://arya-server.onrender.com/api/order-status`, { status: "rejected", orderId: id }).then((res) => {
      setorders(orders.map(order => order._id === id ? { ...order, status: "rejected" } : order));
    }).catch((error) => {
      console.error("Error rejecting order:", error);
    });
  };
  if (localStorage.getItem("admin") !== "yes") {
    return (
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "20px"}}>
        <p>You are not authorized to view this page.</p>
      </div>
    );
  }
  return (
    <div className="dashboard-app">
      <div className="dashboard-container">
        <div className="dashboard-header" style={{display: "flex", alignItems: "center", gap: "16px"}}>
          <AiOutlineHome size={32} style={{cursor: "pointer"}} onClick={() => window.location.href = "/"} title="Go Home" />
          <div className="dashboard-nav">
            <button 
              onClick={() => setActiveTab("Orders")}
              className={activeTab === "Orders" ? "active" : ""}
            >Orders</button>
            <button 
              onClick={() => setActiveTab("Reservations")}
              className={activeTab === "Reservations" ? "active" : ""}
            >Reservations</button>
          </div>
          <div>
          {activeTab === "Orders" && (
            <button style={{background: "none", border: "none", cursor: "pointer",padding:"5px",borderRadius:"50%",border:"1px solid #ccc "}} onClick={() => setSoundEnabled(!soundEnabled)} title={soundEnabled ? "Turn sound off" : "Turn sound on"}>
              {soundEnabled ? <BsVolumeUp size={28} color="#D4AF37" /> : <BsVolumeMute size={28} color="#888" />}
            </button>
          )}
            
            </div>

        </div>
        
        {activeTab === "Orders" ? (
          <div>
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
        
        <div className="orders-grid">
          {orders
            .filter(order => order.payment === "paid")
            .filter(order => {
              const statusMatch = orderStatus === "All" || order.status === orderStatus;
              const typeMatch = orderType === "All" || order.type === orderType;
              return statusMatch && typeMatch;
            })
            .map((order, idx) => (
              <div key={idx} className={`order-card-${order.status.split(" ").join("-")}`}>
                <div className="order-header">
                  <span>{order.createdAt}</span>
                  <span>{order.time}</span>
                </div>
                <h3 className="order-customer">{order.additionalInfo.fullName}</h3>
                <div className="order-details">
                  <p className="order-id">orderID: {order.orderId}</p>
                <div className="order-meta">
                  <p>{order.type}</p>
                  {/* <p>{order.table}</p> */}
                </div>
                </div>
                <div className="order-items-header">
                  <p>Items</p>
                </div>
                <div className="order-items">
                  {order.items.map((item, i) => (
                    <div key={i} className="order-item">
                      <img src={item.image || "/media/corn-palak.png"} alt={item.name} />
                      <div className="order-item-info">
                        <span>{item.name}</span>
                        <div className="order-item-details">
                          <span>×{item.quantity}</span>
                          <span>€ {item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-total">
                  <span>Total</span>
                  <span>€ {(order.total+"")}</span>
                </div>
                {order.status == "On Process" &&            <div className="order-actions">
                  <button className="completed-btn"  onClick={() => handleCompleteOrder(order._id)}>Completed</button>
                </div> } { order.status == "pending" &&  <div className="order-actions">
                  <button className="accept-btn" onClick={() => handleAcceptOrder(order._id)}>Accept</button>
                  <button className="reject-btn" onClick={() => handleRejectOrder(order._id)}>Reject</button>
                </div>}
                {order.status == "Completed" &&            <div className="order-actions">
                  <div className="completed-btn" style={{backgroundColor: "#4CAF50",textAlign:"center",fontWeight:"bolder", color: "white",padding:"10px",border:"none",borderRadius:"5px"}}>Done</div>
                </div>}
                {order.status == "rejected" &&            <div className="order-actions">
                  <div className="reject-btn" style={{backgroundColor: "#f4433674",textAlign:"center",fontWeight:"bolder", color: "white",padding:"10px",border:"none",borderRadius:"5px"}}>Rejected</div>
                </div>}
                {order.additionalInfo && (
                  <div className="order-additional-info">
                    {Object.entries(order.additionalInfo).map(([key, value]) => (
                      <p key={key}><strong>{key}:</strong> {value}</p>
                    ))}
                  </div>
                        )
                }
              </div>
            ))}
        </div>
        </div>
                )
                :
                (<OwnerDashboard/>)}

      </div>
    </div>
  );
}
export default Dashboard;