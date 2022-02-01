import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CartFeature from './features/Cart';
import ProductFeature from './features/Product';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/*" element={<ProductFeature />} />
        <Route path="/cart" element={<CartFeature />} />
      </Routes>
    </div>
  );
}

export default App;
