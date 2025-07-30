import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar({ variant = 'overlay' }) {
  const nav=useNavigate()
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const handleBookClick = () => {
    if (location.pathname !== '/reservation') {
      nav('/reservation');
    } else {
      setOverlayOpen(!overlayOpen);
    }
  };
  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleOverlay = () => {
    setOverlayOpen(!overlayOpen);
  };

  // Close overlay when clicking outside or on mobile
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && overlayOpen) {
        setOverlayOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [overlayOpen]);

  // Different navbar styles based on variant
  const navbarClass = variant === 'overlay' ? 'navbar navbar-overlay' : 'navbar navbar-fixed';

  return (
    <>
      <nav className={navbarClass}>
        <div className="nav-left">
          <button 
            className={`menu-btn ${overlayOpen ? 'active' : ''}`} 
            onClick={toggleOverlay}
            aria-label="Toggle menu"
          >
            <span></span>
          </button>
          {/* <span className="logo">ARYA</span> */}
          <Link to="/" className="logo no-underline">ARYA</Link>
          
          {/* Desktop Navigation Links - Hidden on Mobile */}
          <ul className="nav-links desktop-only">
            <li><Link to="/menu" className={location.pathname === '/menu' ? 'active' : ''}>MENU</Link></li>
            <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>ABOUT</Link></li>
          </ul>
        </div>
        
        {/* Book Table Button */}
        <a href="#" className="book" onClick={(e) => e.preventDefault()}>
            <span className="book-text-full"  onClick={handleBookClick}>BOOK A TABLE</span>
            <span className="book-text-short" onClick={handleBookClick}>BOOK A TABLE</span>
        </a>
      </nav>

      {/* Fullscreen Navigation Overlay */}
      {/* <div className='overlay-container'> */}
          <div className={`overlay ${overlayOpen ? 'active' : ''}`} id="fullscreenNav">
            <button className="close-btn" onClick={toggleOverlay} aria-label="Close menu">×</button>
            <div className="overlay-content">
              <div class="icon-wrapper">
                <div class="diamond"></div>
                <div class="line"></div>
                <div class="diamond"></div>
              </div>
              <Link to="/menu" onClick={toggleOverlay} className={location.pathname === '/menu' ? 'active' : ''}>
                MENU
              </Link>
              <Link to="/reservation" onClick={toggleOverlay} className={location.pathname === '/reservation' ? 'active' : ''}>
                RESERVATION
              </Link>
              <Link to="/" onClick={toggleOverlay} className={location.pathname === '/about' ? 'active' : ''}>
                ABOUT
              </Link>
             <Link to="/contact" onClick={toggleOverlay}>CONTACT</Link>
             <Link to="/" onClick={toggleOverlay}>BLOG</Link>
              <div class="icon-wrapper">
                <div class="diamond"></div>
                <div class="line"></div>
                <div class="diamond"></div>
              </div>
              {/* <a href="#" onClick={(e) => { e.preventDefault(); toggleOverlay(); }}>RESERVATION</a> */}
              {/* <a href="#" onClick={(e) => { e.preventDefault(); toggleOverlay(); }}>LOYALTY</a> */}
            </div>
          </div>
      {/* </div> */}
    </>
  );
}

export default Navbar;
