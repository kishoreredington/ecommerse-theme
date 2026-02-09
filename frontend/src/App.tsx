import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import EachProduct from "./Pages/ProductDetails/EachProduct";
import Dashboard from "./Pages/Dashboard";
import PrefetchProducts from "./Pages/ProductDetails/PrefetchProducts";
import PrefetchEachProducts from "./Pages/ProductDetails/PrefetchProducts";
import Order from "./Pages/Order/Order";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PrefetchProducts />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
        <Route element={<PrefetchEachProducts />}>
          <Route path="/:id" element={<EachProduct />}></Route>
        </Route>
        <Route path="/orders" element={<Order />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
