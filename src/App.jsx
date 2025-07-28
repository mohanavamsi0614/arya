import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Menu from './Menu';
import './App.css';
import Book from './Book';
import Auth from './Auth';

function App() {

  const isAuthenticated = !!localStorage.getItem("user");
  
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/auth" />} />
      <Route path="/menu" element={isAuthenticated ? <Menu /> : <Navigate to="/auth" />} />
      <Route path="/reservation" element={isAuthenticated ? <Book /> : <Navigate to="/auth" />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}


export default App;
