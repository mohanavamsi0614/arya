import "./UserDash.css";
import Navbar from "./components/Navbar";
import { useState } from "react";

function UserDash() {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Sample past orders data
  const pastOrdersData = [
    {
      id: "#OD67890",
      date: "2024-01-10",
      total: 27.29,
      items: [
        { name: "Paneer Amrit Handi", quantity: 1, price: 12.29 },
        { name: "Paneer Butter Masala", quantity: 1, price: 12.29 },
      ],
    },
    {
      id: "#OD67891",
      date: "2024-01-08",
      total: 32.5,
      items: [
        { name: "Chicken Tikka Masala", quantity: 2, price: 14.99 },
        { name: "Garlic Naan", quantity: 2, price: 3.5 },
      ],
    },
  ];

  const toggleOrder = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="userdash-container">
      {/* Left Side Image and Heading */}
      <div className="userdash-image">
        <Navbar />
        <img src="/media/ARYA-122.jpg" alt="Main Dish" />
        <div className="book-image-overlay" />
        <h1 className="userdash-heading">Profile</h1>
      </div>

      {/* Right Side Content */}
      <div className="userdash-details">
        <div className="userdash-greeting">
          <h2>Hello, Arya 👋🏻</h2>
        </div>

        <div className="orders-section">
          <div className="current-orders-section">
            <div className="current-orders">
              <h3>Current Orders</h3>
              <div className="order-progress">
                <div className="step active">
                  <div className="step-number">1</div>
                  <span>Placed</span>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <span>Preparing</span>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <span>Completed</span>
                </div>
              </div>

              <div className="orders-card">
                <div className="order-header">
                  <span className="order-date">Sat, October 20, 2025</span>
                  <span className="order-time">02:47 PM</span>
                </div>
                <div className="order-customer">
                  <h4>Winston Pitt</h4>
                  <div className="orders-details">
                    <span className="orders-id">#ODR1996</span>
                    <span className="orders-meta">Dine-In • Table 12</span>
                  </div>
                </div>

                <div className="orders-items-header">
                  <p>Items</p>
                </div>
                <div className="orders-items">
                  <div className="orders-item">
                    <img
                      src="./public/media/Panner 65.png"
                      alt="Paneer Amrit Handi"
                    />
                    <div className="orders-item-details">
                      <div className="orders-item-name">
                        <span>Paneer Amrit Handi</span>
                      </div>
                      <div className="orders-item-price">
                        <span>×1</span>
                        <span>£12.29</span>
                      </div>
                    </div>
                  </div>

                  <div className="orders-item">
                    <img
                      src="./public/media/Panner 65.png"
                      alt="Paneer Amrit Handi"
                    />
                    <div className="orders-item-details">
                      <div className="orders-item-name">
                        <span>Paneer Butter Masala</span>
                      </div>
                      <div className="orders-item-price">
                        <span>×1</span>
                        <span>£12.29</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="orders-total">
                  <span>Total</span>
                  <span>£27.29</span>
                </div>
                <div className="orders-actions">
                  <button className="cancel-order">Cancel Order</button>
                </div>
              </div>
            </div>
            <div className="contact-support">
              <div className="support-header">
                <h3>Contact Support</h3>
              </div>
              <div className="support-content">
                <p>
                  Oops, did something go wrong with your order? No worries! Our
                  team is here to help with any questions...
                </p>
              </div>
              <div className="support-contact">
                <p className="support-phone">Call Us: +44 7956 965365</p>
              </div>
            </div>
          </div>

          <div className="past-orders">
            <div className="past-orders-header">
              <h3>Past Orders</h3>
            </div>
            <div className="past-order-list">
              {pastOrdersData.map((order) => (
                <div className="past-order" key={order.id}>
                  <div className="past-order-details">
                    <span className="past-date">{order.date}</span>
                    <span className="past-id">{order.id}</span>
                  </div>
                  <div className="past-order-items">
                    <div>
                      <span className="past-amount">
                        £{order.total.toFixed(2)}
                      </span>
                    </div>
                    <div
                      className="past-order-chevron"
                      onClick={() => toggleOrder(order.id)}
                    >
                      <img
                        src="down.png"
                        alt="Chevron"
                        className={
                          expandedOrderId === order.id ? "expanded" : ""
                        }
                      />
                    </div>
                  </div>

                  {expandedOrderId === order.id && (
                    <div className="past-order-details-content">
                      <div className="orders-items-headers">
                        <p>Items</p>
                      </div>
                      <div className="orders-items">
                        {order.items.map((item, index) => (
                          <div className="orders-item" key={index}>
                            <div className="orders-item-details">
                              <div className="orders-items-name">
                                <span>{item.name}</span>
                              </div>
                              <div className="orders-items-price">
                                <span>×{item.quantity}</span>
                                <span>£{item.price.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="orders-totals">
                        <span>Total</span>
                        <span>£{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDash;
