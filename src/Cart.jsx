  // Convert camelCase keys to Pascal_Snake (e.g., fullName -> Full_Name)
  const toPascalSnake = (obj) => {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      const pascalSnake = key
        .replace(/([A-Z])/g, '_$1')
        .replace(/^./, (str) => str.toUpperCase());
      newObj[pascalSnake] = obj[key];
    });
    return newObj;
  };
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import coin from "/public/arya_coin.png";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState("");
  const [orderType, setOrderType] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState({});

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
    eo = eo.filter((i) => {
      return i.quantity != 0;
    });
    setCartItems(eo);
    console.log(eo);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.name !== itemId)
    );
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      let price = 0;
      if (typeof item.price === "number") {
        price = item.price;
      } else if (typeof item.price === "string") {
        // Remove currency symbol and parse
        const cleaned = item.price.replace(/[^\d.]/g, "");
        price = parseFloat(cleaned);
        if (isNaN(price)) price = 0;
      }
      return total + price * (item.quantity || 1);
    }, 0);
  };

  const getDeliveryFee = () => {
    if (orderType !== "homedelivery") return 0;
    switch (selectedDistance) {
      case "A":
        return 2;
      case "B":
        return 4;
      case "C":
        return 7;
      default:
        return 3;
    }
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const serviceFee = 0.6;
    const deliveryFee = getDeliveryFee();
    let total = subtotal + serviceFee + deliveryFee;
    // Apply coins discount (1 coin = 1 euro)
    const coins = Number(additionalInfo.coins) || 0;
    total = total - coins;
    if (total < 0) total = 0;
    return total;
  };

  const handleDistanceChange = (distance) => {
    setSelectedDistance(distance);
    setOrderType("homedelivery");
  };
  const handleOrderDineIn = () => {
    // if (cartItems.length === 0) {
    //   alert('Your cart is empty!');
    //   return;
    // }
    setOrderType("dinein");
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

  const [errors, setErrors] = useState([]);
  function validateFields() {
    const errs = [];
    if (cartItems.length === 0) errs.push("Your cart is empty!");
    if (!orderType)
      errs.push(
        "Please select an order type (Dine In, Collection, or Home Delivery)."
      );
    if (orderType === "dinein") {
      if (
        !additionalInfo.tableNumber ||
        additionalInfo.tableNumber.trim() === ""
      ) {
        errs.push("Table number is required for Dine In.");
      }
    }
    if (orderType === "homedelivery") {
      if (!additionalInfo.fullName || additionalInfo.fullName.trim() === "")
        errs.push("Full Name is required.");
      if (
        !additionalInfo.phoneNumber ||
        !/^\d{10,}$/.test(additionalInfo.phoneNumber.trim())
      )
        errs.push("Valid Phone Number is required.");
      if (
        !additionalInfo.streetAddress ||
        additionalInfo.streetAddress.trim() === ""
      )
        errs.push("Street Address is required.");
      if (!additionalInfo.city || additionalInfo.city.trim() === "")
        errs.push("City/Town is required.");
      if (
        !additionalInfo.postalCode ||
        !/^\d{5,}$/.test(additionalInfo.postalCode.trim())
      )
        errs.push("Valid Postal Code is required.");
      if (!additionalInfo.landmark || additionalInfo.landmark.trim() === "")
        errs.push("Landmark is required.");
    }
    return errs;
  }

  const handlePaymentClick = async () => {
    if (orderType == "collection") {
      if (
        !additionalInfo.fullName ||
        additionalInfo.phoneNumber.trim() === ""
      ) {
        setErrors(["Collection Time is required."]);
        return;
      }
    }
    if (orderType == "homedelivery") {
      if (
        !additionalInfo.fullName ||
        additionalInfo.phoneNumber.trim() === "" ||
        additionalInfo.streetAddress.trim() === "" ||
        additionalInfo.city.trim() === "" ||
        additionalInfo.postalCode.trim() === "" ||
        additionalInfo.landmark.trim() === ""
      ) {
        setErrors(["Full Name and Phone Number are required."]);
        return;
      }
      if (!selectedDistance) {
        setErrors(["Delivery distance is required."]);
        return;
      }
    }
    if (orderType === "dinein") {
      if (
        !additionalInfo.tableNumber ||
        additionalInfo.tableNumber.trim() === ""
      ) {
        setErrors(["Table number is required for Dine In."]);
        return;
      }
    }

    const errs = validateFields();
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    const items = cartItems.map((item) => ({
      name: item.name,
      price: Number(item.price.replace("£", "")),
      quantity: item.quantity,
      image: item.image,
      description: item.description || "No description available.",
    }));
    items.push({
      name: "Delivery",
      price: Number(selectedDistance ? selectedDistance.price : 0),
      quantity: 1,
      image:
        "https://res.cloudinary.com/dus9hgplo/image/upload/v1755147493/delivary_x6eyql.jpg",
      description: "Delivery Charge",
    });
    const stripe = await loadStripe(
      "pk_test_51OqSY6SCGNUdxrLKg60mlKkyEXe2C7UByMDn6hIWRvoTBYRGz9W2epYsPgcORaSLiA0KBorgfPrSKVUSaG6ViAj400hmhE8dcL"
    );
    try {
      const res = await axios.post(
        "https://arya-server.onrender.com/api/create-checkout-session",
        {
          products: items,
          data: {
            userId: localStorage.getItem("user"),
            items,
            additionalInfo: toPascalSnake(additionalInfo),
            type: orderType,
            total: getTotal(),
            coins: Number(additionalInfo.coins) || 0,
          },
        }
      );
      await stripe.redirectToCheckout({
        sessionId: res.data.sessionId,
      });
    } catch (error) {
      console.error("Checkout Error:", error);
      setErrors(["Payment failed. Please try again."]);
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
                      <button
                        className="trashbin"
                        onClick={() => removeFromCart(item.name)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 200 200"
                          xmlSpace="preserve"
                        >
                          <path
                            fill="#EFE7D2"
                            d="M119.032 145.698h-37.4c-6.2 0-11.3-5.1-11.3-11.3v-50.7c0-1.1.9-2 2-2h56c1.1 0 2 .9 2 2v50.7c0 6.2-5.1 11.3-11.3 11.3z..."
                          />
                          <path
                            fill="#EFE7D2"
                            d="M138.332 85.598h-76c-1.1 0-2-.9-2-2s.9-2 2-2h76c1.1 0 2 .9 2 2s-.9 2-2 2z..."
                          />
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
        <div style={{ display: "flex", justifyContent: "end" }}>
          <div
            style={{
              border: "1px solid #EFE7D2",
              fontSize: "16px",
              padding: "10px",
              borderRadius: "6px",
              fontWeight: "bolder",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={coin}
              style={{ width: "23px", marginRight: "5px" }}
            />{" "}
            Coins : {localStorage.getItem("coins")}
          </div>
        </div>
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
              <span>
                {item.name} x{item.quantity}
              </span>
              <div className="ckcjc7">
                <div className="c1az4bwh"></div>
              </div>
              <span>
                £
                {(
                  parseFloat(item.price.replace("£", "")) * item.quantity
                ).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="bill-item">
            <span>Small service fee</span>
            <div className="ckcjc7">
              <div className="c1az4bwh"></div>
            </div>
            <span>£0.60</span>
          </div>

          {/* Show delivery fee and options only for homedelivery */}
          {orderType === "homedelivery" && (
            <>
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
                    Up to 3 miles included. Extra charges apply beyond. Call
                    store to confirm.
                  </span>
                </div>
              </div>

              <div className="bill-checkboxes">
                <label>
                  <input
                    type="radio"
                    name="distance"
                    value="A"
                    checked={selectedDistance === "A"}
                    onChange={() => handleDistanceChange("A")}
                  />{" "}
                  A (£2)
                </label>
                <label>
                  <input
                    type="radio"
                    name="distance"
                    value="B"
                    checked={selectedDistance === "B"}
                    onChange={() => handleDistanceChange("B")}
                  />{" "}
                  B (£4)
                </label>
                <label>
                  <input
                    type="radio"
                    name="distance"
                    value="C"
                    checked={selectedDistance === "C"}
                    onChange={() => handleDistanceChange("C")}
                  />{" "}
                  C (£7)
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
            </>
          )}

          {/* Show coins discount if coins are used */}
          {additionalInfo.coins && Number(additionalInfo.coins) > 0 && (
            <div className="bill-item">
              <span>Coins Discount</span>
              <div className="ckcjc7">
                <div className="c1az4bwh"></div>
              </div>
              <span>-£{Number(additionalInfo.coins).toFixed(2)/10}</span>
            </div>
          )}

          <div className="bill-total">
            <span>Total</span>
            <div className="ckcjc7">
              <div className="c1az4bwh"></div>
            </div>
            <span>£{getTotal().toFixed(2)}</span>
          </div>
          <div className="bill-buttons">
            <div className="bill-button">
              <button className="order" onClick={handleOrderDineIn}>Dine In</button>
            </div>
            <div className="bill-button">
              <button className="order" onClick={handleOrderOnsite}>
                Collection
              </button>
            </div>
            <div className="bill-button">
              <button className="order" onClick={handleHomeDelivery}>
                Home Delivery
              </button>
            </div>
          </div>

          {orderType === "dinein" && (
            <div className="dinein-inputs">
              <label>Full Name:</label>
              <input
                type="text"
                placeholder="Enter Full Name"
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    fullName: e.target.value,
                  })
                }
              />
              <label>Phone Number:</label>
              <input
                type="text"
                placeholder="Enter Phone Number"
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    phoneNumber: e.target.value,
                  })
                }
              />
              <label>Table No:</label>
              <input
                type="text"
                placeholder="Enter Table Number"
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    tableNumber: e.target.value,
                  })
                }
              />
            </div>
          )}

          {orderType === "homedelivery" && (
            <div className="dinein-inputs">
              <label>Full Name:</label>
              <input
                type="text"
                placeholder="Enter Full Name"
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    fullName: e.target.value,
                  })
                }
              />
              <label>Phone Number:</label>
              <input
                type="text"
                placeholder="Enter Phone Number"
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    phoneNumber: e.target.value,
                  })
                }
              />
              <label>Street Address:</label>
              <input
                type="text"
                placeholder="Enter Street Address"
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    streetAddress: e.target.value,
                  })
                }
              />
              <label>City/Town:</label>
              <input
                type="text"
                placeholder="Enter City or Town"
                onChange={(e) =>
                  setAdditionalInfo({ ...additionalInfo, city: e.target.value })
                }
              />
              <label>Postal Code:</label>
              <input
                type="text"
                placeholder="Enter Postal Code"
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    postalCode: e.target.value,
                  })
                }
              />
              <label>Landmark:</label>
              <input
                type="text"
                placeholder="Enter Landmark"
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    landmark: e.target.value,
                  })
                }
              />
            </div>
          )}
          {orderType == "collection" && (
            <div className="dinein-inputs">
              <label>Full Name:</label>
              <input
                type="text"
                placeholder="Enter Full Name"
                required
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    fullName: e.target.value,
                  })
                }
              />
              <label>Phone Number:</label>
              <input
                type="text"
                placeholder="Enter Your Number"
                required
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    phoneNumber: e.target.value,
                  })
                }
              />
              <label>Note:</label>
              <textarea
                type="text"
                style={{ height: "100px" }}
                required
                placeholder="Enter Your Comment"
                onChange={(e) =>
                  setAdditionalInfo({
                    ...additionalInfo,
                    comment: e.target.value,
                  })
                }
              />
              <label>
                How many Coins do you want to use? (your balance:{" "}
                {localStorage.getItem("coins")})
              </label>
              <input
                placeholder="Enter Number of Coins"
                value={additionalInfo.coins || ""}
                onChange={(e) => {
                  if (
                    e.target.value <= Number(localStorage.getItem("coins")) &&
                    e.target.value <= getTotal()
                  ) {
                    setAdditionalInfo({
                      ...additionalInfo,
                      coins: e.target.value,
                    });
                  }
                }}
              />
            </div>
          )}
          <div style={{ color: "red", margin: "10px 0" }}>
            {errors.length > 0 &&
              errors.map((err, i) => <div key={i}>{err}</div>)}
          </div>
          <div className="proceed-to-payment" onClick={handlePaymentClick}>
            <button className="proceed-to-payment-button">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;