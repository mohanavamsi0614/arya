import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for navigation
import Layout from './components/Layout';
import DashboardNav from './DashboardNav';
import menuData from './menu.json';
import './MenuDash.css'; 

function MenuDash() {
  const navigate = useNavigate(); // For navigation to edit page
  const tabsRef = useRef(null);
  const [activeSection, setActiveSection] = useState('Indo-Chineese-Starters');
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [menuItems, setMenuData] = useState(menuData);

  // Removed cart functionality since it's not needed for editing
  useEffect(() => {
    const menuContent = document.querySelector('.menu-content');
    const menuTabs = document.querySelector('.menu-tabs');
    if (!menuContent || !menuTabs) return;

    const onScroll = () => {
      if (menuContent.scrollTop > 0) {
        menuTabs.classList.add('scrolled');
      } else {
        menuTabs.classList.remove('scrolled');
      }
    };

    menuContent.addEventListener('scroll', onScroll);
    return () => menuContent.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const tabs = tabsRef.current;
    if (!tabs) return;

    const onMouseDown = (e) => {
      isDragging.current = true;
      setDragging(true);
      startX.current = e.pageX - tabs.offsetLeft;
      scrollLeft.current = tabs.scrollLeft;
      tabs.classList.add('dragging');
    };
    const onMouseLeave = () => {
      isDragging.current = false;
      setDragging(false);
      tabs.classList.remove('dragging');
    };
    const onMouseUp = () => {
      isDragging.current = false;
      setDragging(false);
      tabs.classList.remove('dragging');
    };
    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - tabs.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      tabs.scrollLeft = scrollLeft.current - walk;
    };

    tabs.addEventListener('mousedown', onMouseDown);
    tabs.addEventListener('mouseleave', onMouseLeave);
    tabs.addEventListener('mouseup', onMouseUp);
    tabs.addEventListener('mousemove', onMouseMove);

    // Touch events
    const onTouchStart = (e) => {
      isDragging.current = true;
      setDragging(true);
      startX.current = e.touches[0].pageX - tabs.offsetLeft;
      scrollLeft.current = tabs.scrollLeft;
      tabs.classList.add('dragging');
    };
    const onTouchEnd = () => {
      isDragging.current = false;
      setDragging(false);
      tabs.classList.remove('dragging');
    };
    const onTouchMove = (e) => {
      if (!isDragging.current) return;
      const x = e.touches[0].pageX - tabs.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      tabs.scrollLeft = scrollLeft.current - walk;
    };

    tabs.addEventListener('touchstart', onTouchStart);
    tabs.addEventListener('touchend', onTouchEnd);
    tabs.addEventListener('touchmove', onTouchMove);

    return () => {
      tabs.removeEventListener('mousedown', onMouseDown);
      tabs.removeEventListener('mouseleave', onMouseLeave);
      tabs.removeEventListener('mouseup', onMouseUp);
      tabs.removeEventListener('mousemove', onMouseMove);
      tabs.removeEventListener('touchstart', onTouchStart);
      tabs.removeEventListener('touchend', onTouchEnd);
      tabs.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const showSection = (sectionId) => {
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const formatSectionName = (sectionId) => {
    return sectionId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to handle item editing
  const handleEditItem = (sectionId, itemIndex) => {
    // Navigate to edit page with section and item index as parameters
    navigate(`/edit-item/${sectionId}/${itemIndex}`);
  };

  const sections = Object.keys(menuItems);

  return (
    <Layout pageType="menu">
      <div className='menu-header'>
        <DashboardNav />
      </div>
      <div className="menu-container">
        <div className="menu-image">
          <img src="/media/menu_main.png" alt="Main Dish" />
          <div className='menu-heading-container'>
            <h1 className="menu-heading" style={{ fontWeight: "lighter" }}>MENU</h1>
          </div>
        </div>

        <div className="menu-content">
          <div className={`menu-tabs-container${isMobile ? ' mobile' : ''}`}>
            <div className={`menu-tabs${dragging ? ' dragging' : ''}`} ref={tabsRef} id="menu-tabs">
              {sections.map((sectionId) => (
                <button
                  key={sectionId}
                  className={`tab-button ${activeSection === sectionId ? 'active' : ''}`}
                  onClick={() => showSection(sectionId)}
                >
                  {formatSectionName(sectionId)}
                </button>
              ))}
            </div>
          </div>

          {sections.map((sectionId) => (
            <div key={sectionId} id={sectionId} className="menu-section">
              <div className="menu-category-decor">
                <span className="diamond-line left">
                  <span className="diamond-shape" />
                  <span className="line-shape" />
                </span>
                <h2 className="menu-category">{formatSectionName(sectionId)}</h2>
                <span className="diamond-line right">
                  <span className="line-shape" />
                  <span className="diamond-shape" />
                </span>
              </div>
              {menuItems[sectionId].map((item, index) => {
                const imageName = item.image.split('/').pop();
                const imagePath = `/media/${imageName}`;

                return (
                  <div key={index} className="menu-item">
                    <img
                      src={imagePath}
                      alt={item.name}
                      onError={(e) => { e.target.src = '/media/item1.png'; }}
                    />
                    <div className="item-text">
                      <div className="item-header">
                        <span>{item.name}</span>
                        <div className='ckcjc7'><div className="c1az4bwh"></div></div>
                        <span className="price">{item.price}</span>
                      </div>
                      <p style={{ whiteSpace: 'pre-line' }}>{item.description}</p>
                    </div>
                    {/* Replaced Add to Cart with Edit Item button */}
                    <button 
                      className="edit-item-btn"
                      onClick={() => handleEditItem(sectionId, index)}
                    >
                      Edit Item
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default MenuDash;