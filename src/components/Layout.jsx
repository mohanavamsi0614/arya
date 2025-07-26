import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Layout({ children, pageType = 'default' }) {
  const location = useLocation();

  useEffect(() => {
    // Remove all page-specific classes
    document.body.classList.remove('menu-page', 'about-page', 'home-page', 'gallery-page', 'contact-page');
    
    // Add the appropriate page class based on route or pageType
    const currentPath = location.pathname;
    
    if (currentPath === '/menu' || pageType === 'menu') {
      document.body.classList.add('menu-page');
    } else if (currentPath === '/about' || pageType === 'about') {
      document.body.classList.add('about-page');
    } else if (currentPath === '/gallery' || pageType === 'gallery') {
      document.body.classList.add('gallery-page');
    } else if (currentPath === '/contact' || pageType === 'contact') {
      document.body.classList.add('contact-page');
    } else {
      document.body.classList.add('home-page');
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('menu-page', 'about-page', 'home-page', 'gallery-page', 'contact-page');
    };
  }, [location.pathname, pageType]);

  return (
    <div className="page-container">
      {children}
    </div>
  );
}

export default Layout;
