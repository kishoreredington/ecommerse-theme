import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import EachProduct from "./Pages/ProductDetails/EachProduct";
import Dashboard from "./Pages/Dashboard";
import PrefetchProducts from "./Pages/ProductDetails/PrefetchProducts";
import Order from "./Pages/Order/Order";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PrefetchProducts />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route path="product/:id" element={<EachProduct />}></Route>
        <Route element={<PrefetchProducts />}>
          <Route path="/orders" element={<Order />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
