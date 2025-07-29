import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SignUp from "./Firebase";
import "./App.css"; // Import the CSS

function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function login() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://arya-server.onrender.com/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      let data;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text || "No response from server" };
      }

      if (response.ok) {
        setMessage("Login successful!");
        localStorage.setItem("user", JSON.stringify(data.name));
        if (onAuthSuccess) onAuthSuccess(); // Update App state
        nav("/");
      } else {
        setMessage(data.message || `Login failed (${response.status})`);
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function signup() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://arya-server.onrender.com/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          new_user: true,
        }),
      });

      let data;
      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text || "No response from server" };
      }

      if (response.ok) {
        setMessage("Account created successfully!");
        localStorage.setItem("user", JSON.stringify(data.name));
        if (onAuthSuccess) onAuthSuccess(); // Update App state
        nav("/");
      } else {
        setMessage(data.message || `Signup failed (${response.status})`);
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-image">
        <img src="./apLVZGAMneXESKaZkziIssg86a8.webp" alt="Main Dish" />
        <h1 className="auth-heading">
          {isLogin ? "LOGIN" : "SIGN UP"}
          <br />
          TO ARYA
        </h1>
      </div>

      <div className="auth-form">
        <div className="auth-header">
          <span className="diamond-line left">
            <span className="diamond-shape" />
            <span className="line-shape" />
          </span>
          <h1>{isLogin ? "LOGIN" : "SIGN UP"}</h1>
           <span className="diamond-line right">
                  <span className="line-shape" />
                  <span className="diamond-shape" />
                </span>
        </div>
        <p className="auth-subtext">
          {isLogin
            ? "Welcome back! Please login to your account."
            : "Create your account to enjoy our exceptional dining experience."}
        </p>

        <div className="auth-toggle">
          <button
            onClick={() => setIsLogin(true)}
            className={isLogin ? "active" : ""}
          >
            LOGIN
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={!isLogin ? "active" : ""}
          >
            SIGN UP
          </button>
        </div>

        <div className="auth-inputs">
          {!isLogin && (
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />

          {message && (
            <div className={`auth-message ${message.includes("successful") ? "success" : "error"}`}>
              {message}
            </div>
          )}

          <button
            className="auth-submit"
            onClick={isLogin ? login : signup}
            disabled={loading}
          >
            {loading ? "PROCESSING..." : isLogin ? "LOGIN" : "SIGN UP"}
          </button>

          <div className="auth-divider">
            <div />
            <span>OR</span>
            <div />
          </div>

          <SignUp />
        </div>
      </div>
    </div>
  );
}

export default Auth;
