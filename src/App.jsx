import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './Home';
import Menu from './Menu';
import './App.css';
import Book from './Book';
import Auth from './Auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app load
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, []);

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <Auth onAuthSuccess={() => setIsAuthenticated(true)} />} />
      <Route path="/menu" element={isAuthenticated ? <Menu /> : <Auth onAuthSuccess={() => setIsAuthenticated(true)} />} />
      <Route path='/reservation' element={isAuthenticated ? <Book /> : <Auth onAuthSuccess={() => setIsAuthenticated(true)} />} />
      <Route path="/auth" element={<Auth onAuthSuccess={() => setIsAuthenticated(true)} />} />
    </Routes>
  );
}

export default App;
