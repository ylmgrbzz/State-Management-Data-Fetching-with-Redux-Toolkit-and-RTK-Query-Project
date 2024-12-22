import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Counter from "./components/Counter";
import Products from "./components/Products";
import SpecificProduct from "./components/SpecificProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Counter />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<SpecificProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
