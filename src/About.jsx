import React, { useState } from 'react';
import styles from './About.module.css'; // Import the CSS module
import Navbar from './components/Navbar'; // Assuming Navbar is in this path

const About = () => {
  const [sliderIndices, setSliderIndices] = useState([0, 0]); // For two sliders
  // const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // const toggleOverlay = () => {
  //   setIsOverlayOpen(!isOverlayOpen);
  // };

  const nextSlide = (sliderIndex) => {
    setSliderIndices(prev => {
      const newIndices = [...prev];
      // Assuming 3 images per slider (indices 0, 1, 2)
      newIndices[sliderIndex] = Math.min(newIndices[sliderIndex] + 1, 2); 
      return newIndices;
    });
  };

  // Function to move to the previous slide for a given slider
  const prevSlide = (sliderIndex) => {
    setSliderIndices(prev => {
      const newIndices = [...prev];
      newIndices[sliderIndex] = Math.max(newIndices[sliderIndex] - 1, 0);
      return newIndices;
    });
  };

  // Image arrays for the sliders
  const sliderImages = [
    "media/slPotYXPFXAfEsa1a4GJhZIk.webp",
    "media/jFLjtiNrSbyMi9cGMowrM7Pc7Bg.webp",
    "media/InB1qO4eodYHQXKOVBszhLURHE.webp",
  ];
  const sliderImagesOur = [
    "media/G4pBdBCgBUC7XWv710nE2LXLUTs.webp",
    "media/CFQGdIzQBxhDDSuVq7NiPP3wI.avif",
    "media/eN3OMUIE7k3yknjR7LKFRc8TlU.avif",
  ];

  return (
    <div className="menu-container">
      <div className="menu-image">
        <Navbar/>
        <img src="./about-left.webp" alt="Main Dish" />
        <div className='about-heading-container'>
        <h1 className="about-heading">ABOUT</h1>
        </div>

        {/* {isOverlayOpen && (
          <div className="overlay" id="fullscreenNav">
            <button className="close-btn" onClick={toggleOverlay}>×</button>
            <a href="./index.html">MENU</a>
            <a href="#">RESERVATION</a>
            <a href="./about.html">ABOUT</a>
            <a href="./gallery.html">GALLERY</a>
            <a href="./contact.html">CONTACT</a>
            <a href="#">Loyalty</a>
          </div>
        )} */}
      </div>

      <div className="right-side-section">
        {/* Row 1: Two Columns */}
        <div className="about-row-1">
          <div className="about-text">
            <div>
            <h2>Where Asia Meets the Isles</h2>
            </div>
            <div>
            <p>Discover a symphony of Asian spices and Western charm, brought together on a single plate. Arya blends tradition with innovation to offer a dining experience that's rooted in culture and crafted for the modern palate.</p>
            </div>
          </div>
          <div className={styles.aboutImageSlider}>
            <button 
              className={`${styles.sliderBtn} ${styles.prev}`} 
              onClick={() => prevSlide(0)}
              style={{ display: sliderIndices[0] === 0 ? 'none' : 'block' }}
            >
              ❮
            </button>
            <div className={styles.sliderWrapper} style={{ transform: `translateX(-${sliderIndices[0] * 100}%)` }}>
              {sliderImages.map((img, index) => (
                <img key={index} src={img} alt={`Dish ${index + 1}`} />
              ))}
            </div>
            <button 
              className={`${styles.sliderBtn} ${styles.next}`} 
              onClick={() => nextSlide(0)}
              style={{ display: sliderIndices[0] === 2 ? 'none' : 'block' }}
            >
              ❯
            </button>
          </div>
        </div>

        {/* Row 2: Three Review Cards */}
        <div className="about-row-2">
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <h3>Insipred Origins</h3>
            <p>A journey shaped by Eastern roots</p>
          </div>
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <h3>Bold Harmony</h3>
            <p>Fusion flavors with a Western soul</p>
          </div>
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <h3>Curated Dining</h3>
            <p>Every detail, thoughtfully plated</p>
          </div>
        </div>

        {/* Row 3: Image + Text */}
        <div className=" about-row-3">
          <div className="about-image-slider">
            <button 
              className={`${styles.sliderBtn} ${styles.prev}`} 
              onClick={() => prevSlide(1)}
              style={{ display: sliderIndices[1] === 0 ? 'none' : 'block' }}
            >
              ❮
            </button>
            <div className={styles.sliderWrapper} style={{ transform: `translateX(-${sliderIndices[1] * 100}%)` }}>
              {sliderImagesOur.map((img, index) => (
                <img key={index} src={img} alt={`Dish ${index + 1}`} />
              ))}
            </div>
            <button 
              className={`${styles.sliderBtn} ${styles.next}`} 
              onClick={() => nextSlide(1)}
              style={{ display: sliderIndices[1] === 2 ? 'none' : 'block' }}
            >
              ❯
            </button>
          </div>
          <div className={styles.aboutText}>
            <h2>Our Story</h2>
            <p>Rooted in the vibrant traditions of Asia and infused with the spirit of modern Britain, Arya is more than just a restaurant - it's a new cultural experience.</p>
            {/* <p>We're on a journey to blend spices, stories, and setting from the East and West into every plate we serve. Though new, our vision is timeless: to serve soulful dishes that bridge worlds.</p> */}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.reservationFooter}>
          <p className={styles.reservationFooterText}>
            By submitting, you agree to our Terms of Service and &nbsp;Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;