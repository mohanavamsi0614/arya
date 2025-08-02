import "./App.css";
import Navbar from "./components/Navbar";

function Cart() {
  return (
    <div className="cart-container">
      <div className="cart-details">
        <Navbar />
        <div className="cart-items-container">
          <div className="cart-item">
            {/* <div className="cart-item-image"> */}
            <img src="media/Achari Bhindi.png" alt="" />
            {/* </div> */}
            <div className="cart-item-text">
              <div className="cart-item-header">
                <span className="cart-header">Achari Bhindhi</span>
                <div className="ckcjc7">
                  <div className="c1az4bwh"></div>
                </div>
                <span className="cart-price">£10.99</span>
              </div>
              <div className="cart-item-details">
                <p>
                  Okra cooked with pickling spices—tangy, spicy, and uniquely
                  flavorful with hints of mustard, fennel, and nigella seeds.
                </p>
              </div>
              <div className="cart-item-actions">
                <div className="cart-item-buttons">
                  <button>+</button>
                  <span>1</span>
                  <button>-</button>
                </div>
                <div className="trashbin-button">
                  <button className="trashbin">
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
          <div className="cart-item">
            {/* <div className="cart-item-image"> */}
            <img src="media/Achari Bhindi.png" alt="" />
            {/* </div> */}
            <div className="cart-item-text">
              <div className="cart-item-header">
                <span className="cart-header">Achari Bhindhi</span>
                <div className="ckcjc7">
                  <div className="c1az4bwh"></div>
                </div>
                <span className="cart-price">£10.99</span>
              </div>
              <div className="cart-item-details">
                <p>
                  Okra cooked with pickling spices—tangy, spicy, and uniquely
                  flavorful with hints of mustard, fennel, and nigella seeds.
                </p>
              </div>
              <div className="cart-item-actions">
                <div className="cart-item-buttons">
                  <button>+</button>
                  <span>1</span>
                  <button>-</button>
                </div>
                <div className="trashbin-button">
                  <button className="trashbin">
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
          <div className="cart-item">
            {/* <div className="cart-item-image"> */}
            <img src="media/Achari Bhindi.png" alt="" />
            {/* </div> */}
            <div className="cart-item-text">
              <div className="cart-item-header">
                <span className="cart-header">Achari Bhindi</span>
                <div className="ckcjc7">
                  <div className="c1az4bwh"></div>
                </div>
                <span className="cart-price">£10.99</span>
              </div>
              <div className="cart-item-details">
                <p>
                  Okra cooked with pickling spices—tangy, spicy, and uniquely
                  flavorful with hints of mustard, fennel, and nigella seeds.
                </p>
              </div>
              <div className="cart-item-actions">
                <div className="cart-item-buttons">
                  <button>+</button>
                  <span>1</span>
                  <button>-</button>
                </div>
                <div className="trashbin-button">
                  <button className="trashbin">
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
        {/* <div className="bill-content-container"> */}
        <div className="bill-content">
          <div className="bill-item">
            <span>Achari Bhini</span>
            <div className="ckcjc7">
              <div className="c1az4bwh"></div>
            </div>
            <span>£10.99</span>
          </div>
          {/* <div> */}
          <div className="bill-item">
            <span>Small service fee</span>
            <div className="ckcjc7">
              <div className="c1az4bwh"></div>
            </div>
            <span>£0.6</span>
          </div>
          <div className="bill-delivery-container">
            <div className="bill-item">
              <span>Delivery Services</span>
              <div className="ckcjc7">
                <div className="c1az4bwh"></div>
              </div>
              <span>£3</span>
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
              <input type="checkbox" name="distance" value="A" /> A (£2)
            </label>
            <label>
              <input type="checkbox" name="distance" value="B" /> B (£4)
            </label>
            <label>
              <input type="checkbox" name="distance" value="C" /> C (£7)
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
            <span>£14.59</span>
          </div>
          <div className="bill-buttons">
            <div className="bill-button">
              <button className="order">Order Online</button>
            </div>
            <div className="bill-button">
              <button className="order">Order Onsite</button>
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
