import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { loadStripe } from "@stripe/stripe-js"; 
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState("");
  const [orderType, setOrderType] = useState(""); // dinein, collection, homedelivery
  const [additionalInfo, setAdditionalInfo] = useState({});

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    let eo = [...cartItems];
    eo = eo.map((i) => {
      if (i.name == item.name) {
        return { ...i, quantity: i.quantity + 1 };
      } else {
        return i;
      }
    });
    setCartItems(eo);
    console.log(eo);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const decrementFromCart = (item) => {
    let eo = [...cartItems];
    eo = eo.map((i) => {
      if (i.name == item.name) {
        if (i.quantity - 1 > 0) {
          return { ...i, quantity: i.quantity - 1 };
        } else {
          return { ...i, quantity: 0 };
        }
      } else {
        return i;
      }
    });
    eo = eo.filter((i) => { return i.quantity != 0 });
    setCartItems(eo);
    console.log(eo);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.name !== itemId));
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price.replace('£', '')) * item.quantity);
    }, 0);
  };

  const getDeliveryFee = () => {
    switch (selectedDistance) {
      case 'A': return 2;
      case 'B': return 4;
      case 'C': return 7;
      default: return 3;
    }
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const serviceFee = 0.6;
    const deliveryFee = getDeliveryFee();
    return subtotal + serviceFee + deliveryFee;
  };

  const handleDistanceChange = (distance) => {
    setSelectedDistance(distance);
  };

  const handleOrderOnline = () => {
    // if (cartItems.length === 0) {
    //   alert('Your cart is empty!');
    //   return;
    // }
    setOrderType("dinein");
    // alert(`Order placed online! Total: £${getTotal().toFixed(2)}`);
  };

  const handleOrderOnsite = () => {
    // if (cartItems.length === 0) {
    //   alert('Your cart is empty!');
    //   return;
    // }
    setOrderType("collection");
    // alert(`Order placed for onsite pickup! Total: £${getTotal().toFixed(2)}`);
  };

  const handleHomeDelivery = () => {
    // if (cartItems.length === 0) {
    //   alert('Your cart is empty!');
    //   return;
    // }
    setOrderType("homedelivery");
    // alert(`Order placed for home delivery! Total: £${getTotal().toFixed(2)}`);
  };

  const handlePaymentClick = async () => {
  const items = cartItems.map(item => ({
    name: item.name,
    price: Number(item.price.replace('£', '')),
    quantity: item.quantity,
    image: item.image,
    description: item.description || "No description available."
  }));

  const stripe = await loadStripe("pk_test_51OqSY6SCGNUdxrLKg60mlKkyEXe2C7UByMDn6hIWRvoTBYRGz9W2epYsPgcORaSLiA0KBorgfPrSKVUSaG6ViAj400hmhE8dcL"); // Replace with your publishable key

  try {
    const res = await axios.post("https://arya-server.onrender.com/api/create-checkout-session", {
      products: items
    });
    localStorage.setItem("data", JSON.stringify({userId:localStorage.getItem("user"),items, additionalInfo,type:orderType,total:getTotal()}));
    await stripe.redirectToCheckout({
      sessionId: res.data.sessionId,
    });
  } catch (error) {
    console.error("Checkout Error:", error);
    alert("Payment failed. Please try again.");
  }
};


  return (
    <div className="cart-container">
      <div className="cart-details">
        <Navbar />
        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <p>Looks Like Your Cart Is Empty</p>
          ) : (
            cartItems.map((item, i) => (
              <div key={i} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-text">
                  <div className="cart-item-header">
                    <span className="cart-header">{item.name}</span>
                    <div className="ckcjc7">
                      <div className="c1az4bwh"></div>
                    </div>
                    <span className="cart-price">{item.price}</span>
                  </div>
                  <div className="cart-item-details">
                    <p>{item.description}</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="cart-item-buttons">
                      <button onClick={() => addToCart(item)}>+</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => decrementFromCart(item)}>-</button>
                    </div>
                    <div className="trashbin-button">
                      <button className="trashbin" onClick={() => removeFromCart(item.name)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" xmlSpace="preserve">
                          <path fill="#EFE7D2" d="M119.032 145.698h-37.4c-6.2 0-11.3-5.1-11.3-11.3v-50.7c0-1.1.9-2 2-2h56c1.1 0 2 .9 2 2v50.7c0 6.2-5.1 11.3-11.3 11.3z..." />
                          <path fill="#EFE7D2" d="M138.332 85.598h-76c-1.1 0-2-.9-2-2s.9-2 2-2h76c1.1 0 2 .9 2 2s-.9 2-2 2z..." />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="bill-container">
        <div className="bill-header">
          <span className="diamond-line left">
            <span className="diamond-shape" />
            <span className="line-shape" />
          </span>
          <h1>Bill</h1>
          <span className="diamond-line right">
            <span className="line-shape" />
            <span className="diamond-shape" />
          </span>
        </div>
        <div className="bill-content">
          {cartItems.map((item) => (
            <div key={item.id} className="bill-item">
              <span>{item.name} x{item.quantity}</span>
              <div className="ckcjc7">
                <div className="c1az4bwh"></div>
              </div>
              <span>£{(parseFloat(item.price.replace('£', '')) * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="bill-item">
            <span>Small service fee</span>
            <div className="ckcjc7">
              <div className="c1az4bwh"></div>
            </div>
            <span>£0.60</span>
          </div>
          <div className="bill-delivery-container">
            <div className="bill-item">
              <span>Delivery Services</span>
              <div className="ckcjc7">
                <div className="c1az4bwh"></div>
              </div>
              <span>£{getDeliveryFee().toFixed(2)}</span>
            </div>
            <div className="bill-item-small">
              <span>
                Up to 3 miles included. Extra charges apply beyond. Call store
                to confirm.
              </span>
            </div>
          </div>

          <div className="bill-checkboxes">
            <label>
              <input
                type="radio"
                name="distance"
                value="A"
                checked={selectedDistance === 'A'}
                onChange={() => handleDistanceChange('A')}
              /> A (£2)
            </label>
            <label>
              <input
                type="radio"
                name="distance"
                value="B"
                checked={selectedDistance === 'B'}
                onChange={() => handleDistanceChange('B')}
              /> B (£4)
            </label>
            <label>
              <input
                type="radio"
                name="distance"
                value="C"
                checked={selectedDistance === 'C'}
                onChange={() => handleDistanceChange('C')}
              /> C (£7)
            </label>
          </div>
          <div className="bill-item-note">
            <div className="bill-estimated-time">
              <span>Estimated Delivery: 45 mins</span>
            </div>
            <div className="bill-item-small">
              <span>* Timing may extend during peak hours</span>
            </div>
          </div>
          <div className="bill-total">
            <span>Total</span>
            <div className="ckcjc7">
              <div className="c1az4bwh"></div>
            </div>
            <span>£{getTotal().toFixed(2)}</span>
          </div>
          <div className="bill-buttons">
            <div className="bill-button">
              <button className="order" onClick={handleOrderOnline}>Dine In</button>
            </div>
            <div className="bill-button">
              <button className="order" onClick={handleOrderOnsite}>Collection</button>
            </div>
            <div className="bill-button">
              <button className="order" onClick={handleHomeDelivery}>Home Delivery</button>
            </div>
          </div>

          {orderType === "dinein" && (
            <div className="dinein-inputs">
              <label>Table No:</label>
              <input type="text" placeholder="Enter Table Number" onChange={(e) => setAdditionalInfo({tableNumber: e.target.value })} />
            </div>
          )}

          {orderType === "homedelivery" && (
            <div className="dinein-inputs">
              <label>Full Name:</label>
              <input type="text" placeholder="Enter Full Name"  onChange={(e) => setAdditionalInfo({...additionalInfo, fullName: e.target.value })} />
              <label>Phone Number:</label>
              <input type="text" placeholder="Enter Phone Number" onChange={(e) => setAdditionalInfo({...additionalInfo, phoneNumber: e.target.value })} />
              <label>Street Address:</label>
              <input type="text" placeholder="Enter Street Address" onChange={(e) => setAdditionalInfo({...additionalInfo, streetAddress: e.target.value })} />
              <label>City/Town:</label>
              <input type="text" placeholder="Enter City or Town" onChange={(e) => setAdditionalInfo({...additionalInfo, city: e.target.value })} />
              <label>Postal Code:</label>
              <input type="text" placeholder="Enter Postal Code" onChange={(e) => setAdditionalInfo({...additionalInfo, postalCode: e.target.value })} />
              <label>Landmark:</label>
              <input type="text" placeholder="Enter Landmark" onChange={(e) => setAdditionalInfo({...additionalInfo, landmark: e.target.value })} />
            </div>
          )}

          <div className="proceed-to-payment" onClick={handlePaymentClick}>
            <button className="proceed-to-payment-button">Proceed to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
