import Layout from './components/Layout';
import Navbar from './components/Navbar';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter,FaArrowRight  } from "react-icons/fa";
import { useEffect } from 'react';


function Home() {
    const navigate = useNavigate();
    useEffect(()=>{
      window.scrollTo(0, 0);
    },[])

  return (
    <Layout pageType="home">
      <div className="framer-app">
      <Navbar />

      <style>
        {`:root {
          --token-c5c4fdcb-9482-48bb-aedf-353188472aae: rgb(239, 231, 210);
          --token-797a2fb4-2d14-46eb-9fb6-f38c1a9a545e: rgba(245, 242, 234, .7);
          --token-c5446a54-80de-4f79-b24b-55997bf1fe5e: rgb(10, 11, 10);
          --token-4321a524-8651-4268-85f9-e884d8cb6223: rgb(10, 11, 10);
          --token-cd2934a7-4e35-4347-a32c-9650fca4db23: rgba(24, 24, 24, .5);
          --token-c18e5c55-e670-494b-9afe-b018358f3867: rgb(30, 30, 30);
          --token-dca875b7-f855-43c1-bf73-97596e452266: rgb(239, 231, 210);
          --token-ba35ffdc-68bb-41bc-880c-4aa29d4488ec: rgb(207, 190, 145);
          --token-68c05b50-ca7b-4173-82aa-ed42aea1a9b4: rgb(51, 51, 48);
          --token-52eaa3b2-9b53-4c12-9790-fce4171dff3e: rgb(78, 76, 71);
        }`}
      </style>

      {/* Main Content Wrapper */}
      <main className="main-wrapper">
        {/* Left Side - Hero Video Section */}
        <div className="hero-side">
          <div className="hero-container">
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="https://framerusercontent.com/assets/KNjmnFp5kwda6KegO13wieYyI0.mp4" type="video/mp4" />
              <source src="/media/hero-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-gradient"></div>
            <div className="hero-title-container">
              <h1 className="hero-title">
                Sushi<br />Sensation
              </h1>
            </div>
            <div className="social-section">
              <div className="social-links">
                  <a href="https://instagram.com" className="social-icon" target="_blank">
                    <FaInstagram />
                  </a>
                  <a href="https://facebook.com" className="social-icon" target="_blank">
                    <FaFacebookF />
                  </a>
                  <a href="https://twitter.com" className="social-icon" target="_blank">
                    <FaTwitter />
                  </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Navigation Cards */}
        <div className="cards-side">
          <div         
            onClick={() => navigate('/menu')}  
            className="nav-card">
            <div className="card-image">
              <img href='/menu' src="/media/ARYA-15-3.jpg" alt="Menu" />
            </div>
            <div className="card-info">
              <div className="card-title-section">
                <h6 className="card-title">Menu</h6>
                <div className="card-arrow-container">
                  <div className="card-arrow-icon">
                    <FaArrowRight />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
          onClick={() => navigate('/reservation')}
          className="nav-card">
            <div className="card-image">
              <img src="/media/ARYA-24-2.jpg" alt="Reservation" />
            </div>
            <div className="card-info">
              <div className="card-title-section">
                <h6 className="card-title">Reservation</h6>
                              <div className="card-arrow-container">
                  <div className="card-arrow-icon">
                    <FaArrowRight />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div onClick={() => navigate('/about')}
          className="nav-card">
            <div className="card-image">
              <img src="/media/ARYA-66-2.jpg" alt="Our Restaurant" />
            </div>
            <div className="card-info">
              <div className="card-title-section">
                <h6 className="card-title">About</h6>
                <div className="card-arrow-container">
                  <div className="card-arrow-icon">
                    <FaArrowRight />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Background Pattern */}
      <div className="background-pattern">
        <img src="/media/pattern.jpg" alt="Background Pattern" />
      </div>

      {/* Framer Badges */}
   
    </div>
    </Layout>
  );
}

export default Home;