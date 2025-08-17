import axios from 'axios';
import './UserDash.css';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';

function UserDash() {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [order, setorders] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('user');
    console.log(userId);
    axios
      .get(`https://arya-server.onrender.com/api/orders/${userId}`)
      .then((response) => {
        setorders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

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
          <h2>Hello, {localStorage.getItem('name')} 👋🏻</h2>
        </div>
        
        <div className="orders-section">
          <div className="current-orders-section">
            <div className="current-orders">
              <h3>Current Orders</h3>
              {order.length === 0 ? (
                <p>No current orders found.</p>
              ) : (
                order
                  .filter(
                    (o) => o.status !== 'Completed' && o.status !== 'rejected'
                  )
                  .slice(0, 1)
                  .map((o, idx) => (
                    <div className="orders-card" key={o._id || idx}>
                      <div className="order-header">
                        <span className="order-date">{o.createdAt}</span>
                        <span className="order-time">{o.time || ''}</span>
                      </div>
                      <div className="order-customer">
                        <h4>{o.additionalInfo.fullName}</h4>
                        <div className="orders-details">
                          <span className="orders-id">#{o.orderId}</span>
                          <span className="orders-meta">
                            {o.type}
                            {o.table ? ` • Table ${o.table}` : ''}
                          </span>
                        </div>
                        <div>
                          <p>
                            Status:{' '}
                            {o.status == 'pending'
                              ? 'Placed'
                              : o.status == 'On Process'
                              ? 'Preparing'
                              : 'Rejected'}
                          </p>
                        </div>
                      </div>
                      <div className="orders-items-header">
                        <p>Items</p>
                      </div>
                      <div className="orders-items">
                        {o.items &&
                          o.items.map((item, i) => (
                            <div className="orders-item" key={i}>
                              <img
                                src={item.image || '/media/corn-palak.png'}
                                alt={item.name}
                              />
                              <div className="orders-item-details">
                                <div className="orders-item-name">
                                  <span>{item.name}</span>
                                </div>
                                <div className="orders-item-price">
                                  <span>×{item.quantity}</span>
                                  <span>£{item.price}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="orders-total">
                        <span>Total</span>
                        <span>£{o.total}</span>
                      </div>
                      {/* <div className="orders-actions">
                      <button className="cancel-order">Cancel Order</button>
                    </div> */}
                    </div>
                  ))
              )}
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
              {order.filter(
                (o) => o.status === 'Completed' || o.status === 'rejected'
              ).length === 0 ? (
                <p>No past orders found.</p>
              ) : (
                order
                  .filter(
                    (o) => o.status === 'Completed' || o.status === 'rejected'
                  )
                  .map((o, idx) => (
                    <div className="past-order" key={o._id || idx}>
                      <div className="past-order-details">
                        <span className="past-date">{o.createdAt}</span>
                        <span className="past-id">{o.orderId}</span>
                      </div>
                      <div className="past-order-items">
                        <div>
                          <span className="past-amount">
                            £
                            {(o.total + '').split('.')[0] +
                              '.' +
                              (o.total + '').split('.')[1].slice(0, 2)}
                          </span>
                        </div>
                        <div
                          className="past-order-chevron"
                          onClick={() => toggleOrder(o._id || idx)}
                        >
                          <img
                            src="down.png"
                            alt="Chevron"
                            className={
                              expandedOrderId === (o._id || idx)
                                ? 'expanded'
                                : ''
                            }
                          />
                        </div>
                      </div>
                      {expandedOrderId === (o._id || idx) && (
                        <div className="past-order-details-content">
                          <div className="orders-items-headers">
                            <p>Items</p>
                          </div>
                          <div className="orders-items">
                            {o.items &&
                              o.items.map((item, index) => (
                                <div className="orders-item" key={index}>
                                  <div className="orders-item-details">
                                    <div className="orders-items-name">
                                      <span>{item.name}</span>
                                    </div>
                                    <div className="orders-items-price">
                                      <span>×{item.quantity}</span>
                                      <span>£{item.price}</span>
                                      <span>{item.status}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                          <div className="orders-totals">
                            <span>Total</span>
                            <span>
                              £
                              {(o.total + '').split('.')[0] +
                                '.' +
                                (o.total + '').split('.')[1].slice(0, 2)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDash;
