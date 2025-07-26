import { useState } from 'react';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import menuData from './menu.json';

function Menu() {
  const [activeSection, setActiveSection] = useState('Indo-Chineese-Starters');

  const showSection = (sectionId) => {
    setActiveSection(sectionId);
    // Scroll to the section
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
      .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letter of each word
  };

  return (
    <Layout pageType="menu">
      <div className="menu-container">
        <div className="menu-image">
          <Navbar variant="overlay" />
          <img src="/media/menu_main.png" alt="Main Dish" />
          <div className='menu-heading-container'>
            <h1 className="menu-heading" style={{fontWeight: "lighter", fontSize: "60px",}}>MENU</h1>
          </div>
        </div>

        <div className="menu-content">
          <div className="menu-tabs" id="menu-tabs">
            {sections.map((sectionId) => (
              <button 
                key={sectionId}
                className={`tab-button ${activeSection === sectionId ? 'zoomed' : ''}`}
                data-section={sectionId}
                onClick={() => showSection(sectionId)}
              >
                {formatSectionName(sectionId)}
              </button>
            ))}
          </div>

          <div className="top-btn" id="up_btn">
            <a href="#menu-tabs">
              <button>
                <i className="fa-solid fa-arrow-up" aria-hidden="true"></i>
              </button>
            </a>
          </div>

          {/* Render all menu sections dynamically */}
          {sections.map((sectionId) => (
            <div 
              key={sectionId}
              id={sectionId} 
              className="menu-section"
            >
              <h2 className="menu-category">{sectionId.replace(/-/g, ' ')}</h2>
              
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
                        <span className="price">{item.price}</span>
                      </div>
                      <p>{item.description}</p>
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