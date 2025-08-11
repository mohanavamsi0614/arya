import { useEffect, useState } from "react";
import "./Dash.css";
import axios from "axios";

function Dashboard() {
  const [orders,setorders] = useState([]);
  const [activeTab, setActiveTab] = useState("Orders");
  const [orderStatus, setOrderStatus] = useState("All");
  const [orderType, setOrderType] = useState("All");
  useEffect(() => {
    axios.get("https://arya-server.onrender.com/api/orders").then((res) => {setorders(res.data.reverse())})
  },[])

  // Play sound when there is a pending order, only after user enables sound
  const [soundEnabled, setSoundEnabled] = useState(false);
  useEffect(() => {
    let intervalId;
    if (soundEnabled && orders.some(order => order.status === "pending")) {
      intervalId = setInterval(() => {
        const audio = new window.Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
        audio.play();
      }, 1000); // every 5 seconds
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [orders, soundEnabled]);

  const statusOptions = ["All", "On Process", "Completed", "rejected","pending"];
  const typeOptions = ["All", "dinein", "Collection", "homedelivery"];
const handleAcceptOrder = (id) => {
    axios.post(`https://arya-server.onrender.com/api/order-status`, {status: "On Process",orderId:id}).then((res) => {
      console.log("Order accepted:", res.data);
      setorders(orders.map(order => order._id === id ? {...order, status: "On Process"} : order));
    }).catch((error) => {
      console.error("Error accepting order:", error);
    });
}
const handleCompleteOrder = (id) => {
  axios.post(`https://arya-server.onrender.com/api/order-status`, {status: "Completed",orderId:id}).then((res) => {
    console.log("Order completed:", res.data);
    setorders(orders.map(order => order._id === id ? {...order, status: "Completed"} : order));
  }).catch((error) => {
    console.error("Error completing order:", error);
  });
}
const handleRejectOrder = (id) => {
  axios.post(`https://arya-server.onrender.com/api/order-status`, {status: "rejected",orderId:id}).then((res) => {
    console.log("Order rejected:", res.data);
    setorders(orders.map(order => order._id === id ? {...order, status: "rejected"} : order));
  }).catch((error) => {
    console.error("Error completing order:", error);
  });
}
  return (
    <div className="dashboard-app">
      <div className="dashboard-container">
        <button style={{margin: "10px", padding: "8px 16px"}} onClick={() => setSoundEnabled(true)}>
          Enable Sound
        </button>
        {/* Main Navigation Tabs */}
        <div className="dashboard-header">
          <div className="dashboard-nav">
            <button 
              onClick={() => setActiveTab("Orders")}
              className={activeTab === "Orders" ? "active" : ""}
            >Orders</button>
            <button 
              onClick={() => setActiveTab("Reservations")}
              className={activeTab === "Reservations" ? "active" : ""}
            >Reservations</button>
            <button 
              onClick={() => setActiveTab("Loyalty")}
              className={activeTab === "Loyalty" ? "active" : ""}
            >Loyalty</button>
          </div>
        </div>
        
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
          {orders
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
                <h3 className="order-customer">{order.userId}</h3>
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
                          <span>×{item.quantity}</span>
                          <span>€ {item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-total">
                  <span>Total</span>
                  <span>€ {(order.total+"").slice(0,5)}</span>
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;