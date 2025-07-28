import { useState, useEffect } from "react";
import SignUp from "./Firebase";
import { useNavigate } from "react-router";

function Auth(){
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const nav= useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  async function login(){
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('https://arya-server.onrender.com/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text || 'No response from server' };
      }
      
      if (response.ok) {
        setMessage('Login successful!');
        console.log('Login successful:', data);
        localStorage.setItem("user", JSON.stringify(data.name));
        nav("/");
      } else {
        setMessage(data.message || `Login failed (${response.status})`);
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function signup(){
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('https://arya-server.onrender.com/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          new_user: true
        })
      });

      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text || 'No response from server' };
      }
      
      if (response.ok) {
        setMessage('Account created successfully!');
        console.log('Signup successful:', data);
        localStorage.setItem("user", JSON.stringify(data.name));
        nav("/");
      } else {
        setMessage(data.message || `Signup failed (${response.status})`);
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  }


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
    {/* <Navbar /> */}
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
{isLogin ? "LOGIN" : "SIGN UP"}<br />TO ARYA        </h1>
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
              fontFamily: "'Forum', serif",
              color: "rgb(239, 231, 210)" 
            }}>{isLogin ? "LOGIN" : "SIGN UP"}</h1>
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
            {isLogin 
              ? "Welcome back! Please login to your account." 
              : "Create your account to enjoy our exceptional dining experience."
            }
          </p>
        </div>

        {/* Toggle Buttons */}
        <div style={{
          display: "flex",
          gap: "10px",
          marginBottom: isMobile ? "20px" : "30px",
          width: "100%",
          maxWidth: "400px"
        }}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1,
              padding: isMobile ? "12px" : "10px",
              borderRadius: "8px",
              border: "1px solid #444",
              backgroundColor: isLogin ? "rgb(239, 231, 210)" : "transparent",
              color: isLogin ? "black" : "rgb(239, 231, 210)",
              fontSize: isMobile ? "14px" : "12px",
              fontWeight: "600",
              cursor: "pointer",
              textTransform: "uppercase",
              fontFamily: "'Forum', serif",
              letterSpacing: "1px",
              transition: "all 0.3s ease"
            }}
          >
            LOGIN
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1,
              padding: isMobile ? "12px" : "10px",
              borderRadius: "8px",
              border: "1px solid #444",
              backgroundColor: !isLogin ? "rgb(239, 231, 210)" : "transparent",
              color: !isLogin ? "black" : "rgb(239, 231, 210)",
              fontSize: isMobile ? "14px" : "12px",
              fontWeight: "600",
              cursor: "pointer",
              fontFamily: "'Forum', serif",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "all 0.3s ease"
            }}
          >
            SIGN UP
          </button>
        </div>

        {/* Form */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: isMobile ? "15px" : "18px",
          width: "100%",
          maxWidth: "400px"
        }}>
          {/* Username field - only for signup */}
          {!isLogin && (
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
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
          )}
          
          {/* Email field */}
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
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
          
          {/* Password field */}
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
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
          
          {/* Message display */}
          {message && (
            <div style={{
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: message.includes('successful') ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: `1px solid ${message.includes('successful') ? '#22c55e' : '#ef4444'}`,
              color: message.includes('successful') ? '#22c55e' : '#ef4444',
              fontSize: "14px",
              textAlign: "center"
            }}>
              {message}
            </div>
          )}
          <div style={{ 
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: "center",
            width: "100%",
            marginTop: "20px"
          }}>
          
          <button
            onClick={isLogin ? login : signup}
            disabled={loading}
            style={{
              backgroundColor: loading ? "#666" : "rgb(239, 231, 210)",
              color: loading ? "#ccc" : "black",
              padding: isMobile ? "16px" : "14px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              fontSize: isMobile ? "16px" : "14px",
              cursor: loading ? "not-allowed" : "pointer",
              width: "100%",
              fontFamily: "'Forum', serif",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => {
              if (!loading) e.target.style.opacity = "0.9";
            }}
            onMouseOut={(e) => {
              if (!loading) e.target.style.opacity = "1";
            }}
          >
            {loading ? "PROCESSING..." : (isLogin ? "LOGIN" : "SIGN UP")}
          </button>
          
          <div style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            margin: "10px 0"
          }}>
            <div style={{
              flex: 1,
              height: "1px",
              backgroundColor: "#444"
            }}></div>
            <span style={{
              margin: "0 15px",
              fontSize: isMobile ? "12px" : "11px",
              color: "#ccc",
              fontWeight: "400",
              textTransform: "uppercase",
              letterSpacing: "1px"
            }}>OR</span>
            <div style={{
              flex: 1,
              height: "1px",
              backgroundColor: "#444"
            }}></div>
          </div>
          
          <div style={{
            width: "100%"
          }}>
            <SignUp/>
          </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Auth;
