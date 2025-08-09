import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import Home from "./Home";
import Menu from "./Menu";
import "./App.css";
import Book from "./Book";
import Auth from "./Auth";
import About from "./About";
import Contact from "./Contact";
import Blog from "./Blog";
import Cart from "./Cart";
import Dashboard from "./Dashboard";
import Success from "./suc";

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

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/auth" />}
      />
      <Route
        path="/menu"
        element={isAuthenticated ? <Menu /> : <Navigate to="/auth" />}
      />
      <Route
        path="/reservation"
        element={isAuthenticated ? <Book /> : <Navigate to="/auth" />}
      />
      <Route
        path="/about"
        element={isAuthenticated ? <About /> : <Navigate to="/auth" />}
      />
      <Route
        path="/auth"
        element={<Auth onAuthSuccess={() => setIsAuthenticated(true)} />}
      />
      <Route
        path="/contact"
        element={isAuthenticated ? <Contact /> : <Navigate to="/auth" />}
      />
      <Route
        path="/blog"
        element={isAuthenticated ? <Blog /> : <Navigate to="/auth" />}
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
    </Routes>
  );
}

export default App;
