import './App.css';
import ProductsList from './Pages/ProductsList';
import Product from './Pages/Product';
import Home from './Pages/Home';
import { Routes, Route } from "react-router-dom";
function App() {
    return (
        <div className="App">
           
            <Routes>
                <Route path="products/:id" element={<Product />} />
                <Route path="products" element={<ProductsList />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
