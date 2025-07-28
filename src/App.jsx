import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Menu from './Menu';
import './App.css';
import Book from './Book';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path='/reservation' element={<Book />} />
    </Routes>
  );
}

export default App;
