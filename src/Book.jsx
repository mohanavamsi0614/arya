import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

function Book() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        width: "100%",
        minHeight: "100vh",
        fontFamily: "'Forum', serif",
        color: "#EFE7D2",
        padding: isMobile ? "10px" : "20px",
        boxSizing: "border-box"
      }}
    >
    <Navbar />
      {/* Left Image */}
      <div style={{ 
        width: isMobile ? "100%" : "50%", 
        position: "relative",
        height: isMobile ? "40vh" : "calc(100vh - 40px)",
        marginBottom: isMobile ? "20px" : "0"
      }}>
        <img
          src="./apLVZGAMneXESKaZkziIssg86a8.webp"
          alt="Main Dish"
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover", 
            borderRadius: "10px" 
          }}
        />
        <h1
          style={{
            position: "absolute",
            bottom: isMobile ? "15px" : "20px",
            left: isMobile ? "15px" : "20px",
            fontWeight: "lighter",
            color: "rgb(239, 231, 210)",
            fontSize: isMobile ? "48px" : isTablet ? "72px" : "106px",
            lineHeight: "1",
            margin: "0",
            textShadow: "2px 2px 4px rgba(0,0,0,0.8)"
          }}
        >
BOOK<br />A TABLE        </h1>
      </div>

      {/* Right Form */}
      <div
        style={{
          width: isMobile ? "100%" : "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #444",
          padding: isMobile ? "20px" : isTablet ? "30px" : "40px",
          borderRadius: "10px",
          marginLeft: isMobile ? "0" : "20px",
          backgroundColor: "rgba(24, 24, 24, 0.5)"
        }}
      >
        <div style={{ 
          textAlign: "center", 
          marginBottom: isMobile ? "20px" : "30px",
          width: "100%",
          maxWidth: "400px"
        }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            marginBottom: "15px"
          }}>
            <div style={{
              width: "30px",
              height: "1px",
              backgroundColor: "#444",
              marginRight: "10px"
            }}></div>
            <div style={{
              width: "6px",
              height: "6px",
              border: "1px solid #444",
              transform: "rotate(45deg)",
              marginRight: "10px"
            }}></div>
            <h1 style={{ 
              margin: "0 10px", 
              fontSize: isMobile ? "24px" : isTablet ? "28px" : "32px", 
              fontWeight: "lighter", 
              color: "rgb(239, 231, 210)" 
            }}>RESERVATION</h1>
            <div style={{
              width: "6px",
              height: "6px",
              border: "1px solid #444",
              transform: "rotate(45deg)",
              marginLeft: "10px"
            }}></div>
            <div style={{
              width: "30px",
              height: "1px",
              backgroundColor: "#444",
              marginLeft: "10px"
            }}></div>
          </div>
          <p style={{ 
            fontSize: isMobile ? "14px" : "16px", 
            color: "#ccc",
            lineHeight: "1.5",
            margin: "0"
          }}>
            Secure your spot at Qitchen, where exceptional sushi and a{" "}
            {!isMobile && <br />}
            remarkable dining experience await.
          </p>
        </div>

        {/* Form */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: isMobile ? "15px" : "18px",
          width: "100%",
          maxWidth: "400px"
        }}>
          <input
            placeholder="Your Name"
            style={{
              padding: isMobile ? "14px 16px" : "12px 16px",
              borderRadius: "8px",
              border: "1px solid #444",
              backgroundColor: "#1c1c1c",
              color: "rgb(239, 231, 210)",
              fontSize: isMobile ? "16px" : "14px",
              outline: "none",
              width: "100%",
              boxSizing: "border-box"
            }}
          />
          <input
            placeholder="Phone Number"
            type="tel"
            style={{
              padding: isMobile ? "14px 16px" : "12px 16px",
              borderRadius: "8px",
              border: "1px solid #444",
              backgroundColor: "#1c1c1c",
              color: "rgb(239, 231, 210)",
              fontSize: isMobile ? "16px" : "14px",
              outline: "none",
              width: "100%",
              boxSizing: "border-box"
            }}
          />
          <input
            placeholder="Email"
            type="email"
            style={{
              padding: isMobile ? "14px 16px" : "12px 16px",
              borderRadius: "8px",
              border: "1px solid #444",
              backgroundColor: "#1c1c1c",
              color: "rgb(239, 231, 210)",
              fontSize: isMobile ? "16px" : "14px",
              outline: "none",
              width: "100%",
              boxSizing: "border-box"
            }}
          />
          <div style={{ 
            display: "flex", 
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "15px" : "10px" 
          }}>
            <input 
              type="number" 
              placeholder="Guests (1-10)" 
              min={1} 
              max={10} 
              style={{
                flex: isMobile ? "none" : 1,
                padding: isMobile ? "14px 16px" : "12px 16px",
                borderRadius: "8px",
                border: "1px solid #444",
                backgroundColor: "#1c1c1c",
                color: "rgb(239, 231, 210)",
                fontSize: isMobile ? "16px" : "14px",
                outline: "none",
                width: "100%",
                boxSizing: "border-box"
              }} 
            />
            <input 
              type="date" 
              style={{
                flex: isMobile ? "none" : 1,
                padding: isMobile ? "14px 16px" : "12px 16px",
                borderRadius: "8px",
                border: "1px solid #444",
                backgroundColor: "#1c1c1c",
                color: "rgb(239, 231, 210)",
                fontSize: isMobile ? "16px" : "14px",
                outline: "none",
                width: "100%",
                boxSizing: "border-box"
              }} 
            />
            <input 
              type="time" 
              style={{
                flex: isMobile ? "none" : 1,
                padding: isMobile ? "14px 16px" : "12px 16px",
                borderRadius: "8px",
                border: "1px solid #444",
                backgroundColor: "#1c1c1c",
                color: "rgb(239, 231, 210)",
                fontSize: isMobile ? "16px" : "14px",
                outline: "none",
                width: "100%",
                boxSizing: "border-box"
              }} 
            />
          </div>
          <button
            style={{
              backgroundColor: "rgb(239, 231, 210)",
              color: "black",
              padding: isMobile ? "16px" : "14px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              fontSize: isMobile ? "16px" : "14px",
              marginTop: "10px",
              cursor: "pointer",
              width: "100%",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              e.target.style.opacity = "0.9";
            }}
            onMouseOut={(e) => {
              e.target.style.opacity = "1";
            }}
          >
            SUBMIT
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default Book;
