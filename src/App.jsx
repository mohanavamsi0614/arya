import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Menu from './Menu';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  );
}

export default App;
