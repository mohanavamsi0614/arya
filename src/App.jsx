import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Menu from './Menu';
import './App.css';
import Book from './Book';
import Auth from './Auth';

function App() {
  return (
    <Routes>
      <Route path="/" element={localStorage.getItem("user") ? <Home /> : <Auth />} />
      <Route path="/menu" element={localStorage.getItem("user") ? <Menu /> : <Auth />} />
      <Route path='/reservation' element={localStorage.getItem("user") ? <Book /> : <Auth />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
