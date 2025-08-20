import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar({ variant = "overlay" }) {
  const nav = useNavigate();
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  // Check admin status and screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    const checkAdmin = () => setIsAdmin(localStorage.getItem("admin") === "yes");
    
    checkMobile();
    checkAdmin();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleBookClick = () => {
    if (location.pathname !== "/reservation") {
      nav("/reservation");
    } else {
      setOverlayOpen(!overlayOpen);
    }
  };

  const handleDashboardClick = () => {
    nav("/dashboard");
  };

  const toggleOverlay = () => setOverlayOpen(!overlayOpen);

  // Close overlay on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && overlayOpen) setOverlayOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [overlayOpen]);

  const navbarClass = variant === "overlay" 
    ? "navbar navbar-overlay" 
    : "navbar navbar-fixed";

  return (
    <>
      <nav className={navbarClass}>
        <div className="nav-left">
          <button
            className={`menu-btn ${overlayOpen ? "active" : ""}`}
            onClick={toggleOverlay}
            aria-label="Toggle menu"
          >
            <span></span>
          </button>
          <div className="logo-wrapper">
            <Link to="/" className="no-underline">
            <img className="logo" src="Arya-logo-png.png" alt="" />
          </Link>
          </div>

          <ul className="nav-links desktop-only">
            <li>
              <Link
                to="/menu"
                className={location.pathname === "/menu" ? "active" : ""}
              >
                MENU
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={location.pathname === "/about" ? "active" : ""}
              >
                ABOUT
              </Link>
            </li>
          </ul>
        </div>

        {isAdmin ? (
          <a href="#" className="book" onClick={(e) => {
            e.preventDefault();
            handleDashboardClick();
          }}>
            <span className="book-text-full">DASHBOARD</span>
            <span className="book-text-short">DASHBOARD</span>
          </a>
        ) : (
          <a href="#" className="book" onClick={(e) => {
            e.preventDefault();
            handleBookClick();
          }}>
            <span className="book-text-full">BOOK A TABLE</span>
            <span className="book-text-short">BOOK A TABLE</span>
          </a>
        )}
      </nav>

      <div className={`overlay ${overlayOpen ? "active" : ""}`} id="fullscreenNav">
        <button
          className="close-btn"
          onClick={toggleOverlay}
          aria-label="Close menu"
        >
          ×
        </button>
        <div className="overlay-content">
          <div className="icon-wrapper">
            <div className="diamond"></div>
            <div className="line"></div>
            <div className="diamond"></div>
          </div>
          <Link to="/profile" onClick={toggleOverlay}>
            Profile
          </Link>
          <Link to="/menu" onClick={toggleOverlay}>
            MENU
          </Link>
          <Link to="/reservation" onClick={toggleOverlay}>
            RESERVATION
          </Link>
          <Link to="/about" onClick={toggleOverlay}>
            ABOUT
          </Link>
          <Link to="/blog" onClick={toggleOverlay}>
            BLOG
          </Link>
          <Link to="/contact" onClick={toggleOverlay}>
            CONTACT
          </Link>
          <Link to="/cart" onClick={toggleOverlay}>
            CART
          </Link>  
          {localStorage.getItem("user") ?          
          <Link onClick={async() => {

            axios.post("https://arya-server.onrender.com/api/cart",{userId: localStorage.getItem("user"),items:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]});
            localStorage.clear();
            window.location.replace("/");
          }}>
            Log Out
          </Link>
:
<Link to="/auth" onClick={toggleOverlay}>
  Signup/Sigin
</Link> }
          <div className="icon-wrapper">
            <div className="diamond"></div>
            <div className="line"></div>
            <div className="diamond"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;