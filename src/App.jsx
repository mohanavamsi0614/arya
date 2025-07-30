import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Menu from './Menu';
import './App.css';
import Book from './Book';
import Auth from './Auth';
import About from './About';
import Contact from './Contact';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("user"));

  // Listen for localStorage changes (e.g., login/logout from another tab)
  useEffect(() => {
    const syncAuth = () => setIsAuthenticated(!!localStorage.getItem("user"));
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/auth" />} />
      <Route path="/menu" element={isAuthenticated ? <Menu /> : <Navigate to="/auth" />} />
      <Route path="/reservation" element={isAuthenticated ? <Book /> : <Navigate to="/auth" />} />
      <Route path='/about' element={isAuthenticated ? <About /> : <Navigate to="/auth" />} />
      <Route path="/contact" element={isAuthenticated ? <Contact /> : <Navigate to="/auth" />} />
      <Route path="/auth" element={<Auth onAuthSuccess={handleAuthSuccess} />} />
    </Routes>
  );
}

export default App;
