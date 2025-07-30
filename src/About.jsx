import React, { useState } from 'react';
import styles from './About.module.css'; // Import the CSS module
import Navbar from './components/Navbar'; // Assuming Navbar is in this path

const About = () => {
  const [sliderIndices, setSliderIndices] = useState([0, 0]); // For two sliders
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

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
    <div className={styles.menuContainer}>
      {/* Left Side: Image with Heading and Navbar */}
      <div className={styles.menuImage}>
        {/* Navbar component. Assuming it has a way to trigger the overlay or is a dummy component */}
        {/* If Navbar needs to trigger toggleOverlay, you'd pass it as a prop like: 
            <Navbar onToggleOverlay={toggleOverlay} /> 
            and Navbar would have a button that calls props.onToggleOverlay()
        */}
        <Navbar /> 
        <img src="public/about-left.webp" alt="About Us Background" />
        <h1 className={styles.menuHeading}>ABOUT</h1>

        {/* Fullscreen Overlay Navigation (conditionally rendered) */}
        {isOverlayOpen && (
          <div className={styles.overlay} id="fullscreenNav">
            <button className={styles.closeBtn} onClick={toggleOverlay}>×</button>
            <a href="./index.html">MENU</a>
            <a href="#">RESERVATION</a>
            <a href="./about.html">ABOUT</a>
            <a href="./gallery.html">GALLERY</a>
            <a href="./contact.html">CONTACT</a>
            <a href="#">Loyalty</a>
          </div>
        )}
      </div>

      {/* Right Side Section: Content Rows */}
      <div className={styles.rightSideSection}>
        {/* Row 1: Text and Image Slider */}
        <div className={`${styles.aboutRow} ${styles.aboutRow1}`}>
          <div className={styles.aboutText}>
            <div>
              <h2>Sushi Artistry Redefined</h2>
            </div>
            <div>
              <p>Where culinary craftsmanship meets modern elegance. Indulge in the finest sushi, expertly curated to elevate your dining experience.</p>
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
        <div className={`${styles.aboutRow} ${styles.aboutRow2}`}>
          <div className={styles.reviewCard}>
            <div className={styles.stars}>★★★★★</div>
            <h3>Trip Advisor</h3>
            <p>Best Sushi</p>
          </div>
          <div className={styles.reviewCard}>
            <div className={styles.stars}>★★★★★</div>
            <h3>Michelin Guide</h3>
            <p>Quality Food</p>
          </div>
          <div className={styles.reviewCard}>
            <div className={styles.stars}>★★★★★</div>
            <h3>Start Dining</h3>
            <p>Cool Vibe</p>
          </div>
        </div>

        {/* Row 3: Image Slider and Text */}
        <div className={`${styles.aboutRow} ${styles.aboutRow3}`}>
          <div className={styles.aboutImageSlider}>
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
            <p>Founded with a passion for culinary excellence, ARYA's journey began in the heart of the city. Over years, it evolved into a haven for sushi.</p>
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