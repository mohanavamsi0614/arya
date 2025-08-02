import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState("");
  
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart or increase quantity
  const addToCart = (item) => {
    let eo=[...cartItems]
    eo=eo.map((i)=>{
      if(i.name==item.name){
        if (i.quantity-1>0){
        return {...i,quantity:i.quantity+1}
        }
      }
      else{
        return i
      }
    })
    setCartItems(eo)
    localStorage.setItem("cartItems",cartItems)
  };

  // Decrease item quantity or remove if quantity becomes 0
  const decrementFromCart = (item) => {
    let eo=[...cartItems]
    eo=eo.map((i)=>{
      if(i.name==item.name){
        if (i.quantity-1>0){
        return {...i,quantity:i.quantity-1}
        }
      }
      else{
        return i
      }
    })
    setCartItems(eo)
    localStorage.setItem("cartItems",cartItems)
  };

  // Remove item completely from cart
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.name !== itemId));
  };

  // Calculate subtotal
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price.replace('£', '')) * item.quantity);
    }, 0);
  };

  // Get delivery fee based on selected distance
  const getDeliveryFee = () => {
    switch (selectedDistance) {
      case 'A': return 2;
      case 'B': return 4;
      case 'C': return 7;
      default: return 3; // Default delivery fee
    }
  };

  // Calculate total
  const getTotal = () => {
    const subtotal = getSubtotal();
    const serviceFee = 0.6;
    const deliveryFee = getDeliveryFee();
    return subtotal + serviceFee + deliveryFee;
  };

  // Handle distance selection
  const handleDistanceChange = (distance) => {
    setSelectedDistance(distance);
  };

  // Handle order placement
  const handleOrderOnline = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert(`Order placed online! Total: £${getTotal().toFixed(2)}`);
    // Here you would integrate with your payment/order system
  };

  const handleOrderOnsite = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert(`Order placed for onsite pickup! Total: £${getTotal().toFixed(2)}`);
    // Here you would integrate with your order management system
  };
  return (
    <div className="cart-container">
      <div className="cart-details">
        <Navbar />
        <div className="cart-items-container">
            {cartItems.length === 0 ? (
              <p>Looks Like Your Cart Is Empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={"./"+item.image || "media/Achari Bhindi.png"} alt={item.name} />
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
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 200 200"
                            xmlSpace="preserve"
                          >
                            <path
                              fill="#EFE7D2"
                              d="M119.032 145.698h-37.4c-6.2 0-11.3-5.1-11.3-11.3v-50.7c0-1.1.9-2 2-2h56c1.1 0 2 .9 2 2v50.7c0 6.2-5.1 11.3-11.3 11.3zm-44.7-60v48.7c0 4 3.3 7.3 7.3 7.3h37.3c4 0 7.3-3.3 7.3-7.3v-48.7h-51.9zM138.332 73.598h-76c-1.1 0-2-.9-2-2s.9-2 2-2h76c1.1 0 2 .9 2 2s-.9 2-2 2z"
                            />
                            <path
                              fill="#EFE7D2"
                              d="M138.332 85.598h-76c-1.1 0-2-.9-2-2s.9-2 2-2h76c1.1 0 2 .9 2 2s-.9 2-2 2zM112.332 73.698h-24c-1.1 0-2-.9-2-2v-6c0-6.6 5.4-12 12-12h4c6.6 0 12 5.4 12 12v6c0 1.1-.9 2-2 2zm-22-4h20v-4c0-4.4-3.6-8-8-8h-4c-4.4 0-8 3.6-8 8v4zM88.732 131.698c-1.1 0-2-.9-2-2v-32c0-1.1.9-2 2-2s2 .9 2 2v32c0 1.1-.9 2-2 2zM100.732 131.698c-1.1 0-2-.9-2-2v-32c0-1.1.9-2 2-2s2 .9 2 2v32c0 1.1-.9 2-2 2zM112.732 131.698c-1.1 0-2-.9-2-2v-32c0-1.1.9-2 2-2s2 .9 2 2v32c0 1.1-.9 2-2 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}        </div>
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
        {/* <div className="bill-content-container"> */}
        <div className="bill-content">
          {/* Dynamic cart items in bill */}
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
              <button className="order" onClick={handleOrderOnline}>Order Online</button>
            </div>
            <div className="bill-button">
              <button className="order" onClick={handleOrderOnsite}>Order Onsite</button>
            </div>
          </div>
          {/* </div> */}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Cart;
