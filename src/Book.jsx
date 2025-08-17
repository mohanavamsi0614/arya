import Navbar from "./components/Navbar";
import Reservation from "./reservation";
import "./App.css";

function Book() {
  return (
    <div className="book-container">
      <Navbar />

      {/* Left Image */}
      <div className="book-left">
        <img
          src="/media/ARYA-22-2.jpg"
          alt="Main Dish"
          className="book-image"
        />
        <div className="book-image-overlay" />
        <div className="book-heading-container">
          <h1 className="book-heading">
            BOOK<br />A TABLE
          </h1>
        </div>

      </div>

      {/* Right Form */}
      <div className="book-right">
        <div className="reservation-container">
          {/* <div className="reservation-header">
            <div className="reservation-decor">
              <span className="diamond-line left">
                <span className="diamond-shape" />
                <span className="line-shape" />
              </span>
              <h1 className="reservation-title">RESERVATION</h1>
              <span className="diamond-line left">
                <span className="diamond-shape" />
                <span className="line-shape" />
              </span>
            </div>
            <p className="reservation-text">
              Secure your spot at Arya, where exceptional sushi and a
              <br className="hide-on-mobile" />
              remarkable dining experience await.
            </p>
          </div> */}

          {/* Form */}
          <Reservation/>
          {/* <div className="reservation-form">
            <input placeholder="Your Name" className="form-input" />
            <input placeholder="Phone Number" type="tel" className="form-input" />
            <input placeholder="Email" type="email" className="form-input" />
            <div className="form-row">
              <input
                type="number"
                placeholder="1-10"
                min={1}
                max={10}
                className="form-input"
              />
              <input type="date" className="form-input" />
              <input type="time" className="form-input" />
            </div>
            <button
              className="form-button"
              onMouseOver={(e) => (e.target.style.opacity = "0.9")}
              onMouseOut={(e) => (e.target.style.opacity = "1")}
            >
              SUBMIT
            </button>
          </div> */}
        </div>
        <div className="reservation-footer">
            <p className="reservation-footer-text">
              By submitting, you agree to our Terms of Service and  Privacy Policy
            </p>
        </div>
      </div>
    </div>
  );
}

export default Book;
