import { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import menuData from './menu.json';

function Menu() {
  const tabsRef = useRef(null);
  const [activeSection, setActiveSection] = useState('Indo-Chineese-Starters');
  // Drag-to-scroll state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [dragging, setDragging] = useState(false);

  // Add blur background to menu-tabs only when scrolled
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

  // Check scroll position of tabs
  // Drag-to-scroll logic for menu-tabs
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
      const walk = (x - startX.current) * 1.5; // scroll speed
      tabs.scrollLeft = scrollLeft.current - walk;
    };
    tabs.addEventListener('mousedown', onMouseDown);
    tabs.addEventListener('mouseleave', onMouseLeave);
    tabs.addEventListener('mouseup', onMouseUp);
    tabs.addEventListener('mousemove', onMouseMove);
    // Touch events for mobile
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


  // Get all section keys from menuData
  const sections = Object.keys(menuData);

  // Function to format section names properly
  const formatSectionName = (sectionId) => {
    return sectionId
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  // Detect mobile device width
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout pageType="menu">
      <div className="menu-container">
        <div className="menu-image">
          <Navbar variant="overlay" />
          <img src="/media/menu_main.png" alt="Main Dish" />
          <div className='menu-heading-container'>
            <h1 className="menu-heading" style={{fontWeight: "lighter"}}>MENU</h1>
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

          {/* ...existing code... */}
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
              {menuData[sectionId].map((item, index) => {
                const imageName = item.image.split('/').pop();
                const imagePath = `/media/${imageName}`;
                return (
                  <div key={index} className="menu-item">
                    <img 
                      src={imagePath} 
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = '/media/item1.png';
                      }}
                    />
                    <div className="item-text">
                      <div className="item-header">
                        <span>{item.name}</span>
                        {/* <span className="dots" /> */}
                        <div className='ckcjc7'>
                          <div className="c1az4bwh"></div>
                        </div>
                        <span className="price">{item.price}</span>
                      </div>
                      <p style={{ whiteSpace: 'pre-line' }}>{item.description}</p>
                    </div>
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

export default Menu;

// line 1478
  
  // .item-header {
  //   flex-direction: column;
  //   align-items: center;
  //   gap: 8px;
  //   font-size: 1em;
  //   margin-bottom: 4px;
  //   width: 100%;
  //   word-break: break-word;
  // }
  // .item-header .dots {
  //   font-size: 0.95em;
  //   margin: 0 6px;
  //   letter-spacing: 1.2px;
  //   min-width: 30px;
  //   max-width: 60px;
  //   overflow: hidden;
  //   text-align: center;
  //   width: 100%;
  //   display: block;
  // }
  // .item-header .price {
  //   font-size: 1em;
  //   margin-left: 0;
  //   margin-top: 2px;
  //   text-align: center;
  //   width: 100%;
  //   display: block;
  // }