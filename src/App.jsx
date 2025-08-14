import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import Home from "./Home";
import Menu from "./Menu";
import "./App.css";
import Book from "./Book";
import Auth from "./Auth";
import About from "./About";
import Contact from "./contact";
import Blog from "./Blog";
import Cart from "./Cart";
import Dashboard from "./Dashboard";
import Success from "./suc";
import UserDash from "./UserDash";
import Reservation from "./reservation";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("user")
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const syncAuth = () => setIsAuthenticated(!!localStorage.getItem("user"));
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  // 🔁 Watch for auth success and redirect from /auth to /
  useEffect(() => {
    if (isAuthenticated && location.pathname === "/auth") {
      navigate("/");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const user = localStorage.getItem("user");
      setIsAuthenticated(!!user);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={ <Home />}
      />
      <Route
        path="/menu"
        element={ <Menu /> }
      />
      {/* <Route
        path="/reservation"
        element={isAuthenticated ? <Book /> : <Navigate to="/auth" />}
      /> */}
      <Route
        path="/about"
        element={<About /> }
      />
      <Route
        path="/auth"
        element={<Auth onAuthSuccess={() => setIsAuthenticated(true)} />}
      />
      <Route
        path="/contact"
        element={ <Contact />}
      />
      <Route
        path="/blog"
        element={ <Blog /> }
      />
      <Route
        path="/cart"
        element={isAuthenticated ? <Cart /> : <Navigate to="/auth" />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />}
      />
      <Route
        path="/success/:sessionId"
        element={isAuthenticated ? <Success /> : <Navigate to="/auth" />}
      />
      <Route
        path="/profile"
        element={isAuthenticated ? <UserDash /> : <Navigate to="/auth" />}
/>
<Route
        path="/reservation"
        element={isAuthenticated ? <Reservation /> : <Navigate to="/auth" />}
 
      />
    </Routes>
  );
}

export default App;
