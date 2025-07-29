import React, { useState } from 'react';
import './About.css'; 
import Navbar from './components/Navbar';

const About = () => {
  const [sliderIndices, setSliderIndices] = useState([0, 0]); // For two sliders
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const nextSlide = (sliderIndex) => {
    setSliderIndices(prev => {
      const newIndices = [...prev];
      newIndices[sliderIndex] = Math.min(newIndices[sliderIndex] + 1, 2); // Assuming 3 images per slider
      return newIndices;
    });
  };

  const prevSlide = (sliderIndex) => {
    setSliderIndices(prev => {
      const newIndices = [...prev];
      newIndices[sliderIndex] = Math.max(newIndices[sliderIndex] - 1, 0);
      return newIndices;
    });
  };

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
        <img src="public/about-left.webp" alt="Main Dish" />
        <h1 className="menu-heading">ABOUT</h1>

        {isOverlayOpen && (
          <div className="overlay" id="fullscreenNav">
            <button className="close-btn" onClick={toggleOverlay}>×</button>
            <a href="./index.html">MENU</a>
            <a href="#">RESERVATION</a>
            <a href="./about.html">ABOUT</a>
            <a href="./gallery.html">GALLERY</a>
            <a href="./contact.html">CONTACT</a>
            <a href="#">Loyalty</a>
          </div>
        )}
      </div>

      <div className="right-side-section">
        {/* Row 1: Two Columns */}
        <div className="about-row about-row-1">
          <div className="about-text">
            <div>
            <h2>Sushi Artistry Redefined</h2>
            </div>
            <div>
            <p>Where culinary craftsmanship meets modern elegance. Indulge in the finest sushi, expertly curated to elevate your dining experience.</p>
            </div>
          </div>
          <div className="about-image-slider">
            <button 
              className="slider-btn prev" 
              onClick={() => prevSlide(0)}
              style={{ display: sliderIndices[0] === 0 ? 'none' : 'block' }}
            >
              ❮
            </button>
            <div className="slider-wrapper" style={{ transform: `translateX(-${sliderIndices[0] * 100}%)` }}>
              {sliderImages.map((img, index) => (
                <img key={index} src={img} alt={`Dish ${index + 1}`} />
              ))}
            </div>
            <button 
              className="slider-btn next" 
              onClick={() => nextSlide(0)}
              style={{ display: sliderIndices[0] === 2 ? 'none' : 'block' }}
            >
              ❯
            </button>
          </div>
        </div>

        {/* Row 2: Three Review Cards */}
        <div className="about-row about-row-2">
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <h3>Trip Advisor</h3>
            <p>Best Sushi</p>
          </div>
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <h3>Michelin Guide</h3>
            <p>Quality Food</p>
          </div>
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <h3>Start Dining</h3>
            <p>Cool Vibe</p>
          </div>
        </div>

        {/* Row 3: Image + Text */}
        <div className="about-row about-row-3">
          <div className="about-image-slider">
            <button 
              className="slider-btn prev" 
              onClick={() => prevSlide(1)}
              style={{ display: sliderIndices[1] === 0 ? 'none' : 'block' }}
            >
              ❮
            </button>
            <div className="slider-wrapper" style={{ transform: `translateX(-${sliderIndices[1] * 100}%)` }}>
              {sliderImagesOur.map((img, index) => (
                <img key={index} src={img} alt={`Dish ${index + 1}`} />
              ))}
            </div>
            <button 
              className="slider-btn next" 
              onClick={() => nextSlide(1)}
              style={{ display: sliderIndices[1] === 2 ? 'none' : 'block' }}
            >
              ❯
            </button>
          </div>
          <div className="about-text">
            <h2>Our Story</h2>
            <p>Founded with a passion for culinary excellence, ARYA's journey began in the heart of the city.
              Over years, it evolved into a haven for sushi.</p>
          </div>
        </div>
        <div className="reservation-footer">
            <p className="reservation-footer-text">
              By submitting, you agree to our Terms of Service and  Privacy Policy
            </p>
        </div>
      </div>
    </div>
  );
};

export default About;