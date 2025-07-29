import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Menu from './Menu';
import './App.css';
import Book from './Book';
import Auth from './Auth';

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("user");
  return isAuthenticated ? children : <Navigate to="/auth" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
      <Route path="/reservation" element={<ProtectedRoute><Book /></ProtectedRoute>} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
