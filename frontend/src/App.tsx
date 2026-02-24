import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import EachProduct from "./Pages/ProductDetails/EachProduct";
import Dashboard from "./Pages/Dashboard";
import PrefetchEachProduct from "./Pages/ProductDetails/PrefetchEachProduct";
import PrefetchAllProduct from "./Pages/ProductDetails/PrefetchAllProducts";
import Order from "./Pages/Order/Order";
import Cart from "./Pages/Cart/Cart";
import PrefetchCartProducts from "./Pages/ProductDetails/PrefetchCartProducts";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import Account from "./Pages/Account/Account";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/sign-up" element={<Signup />}></Route>
      <Route element={<Layout />}>
        <Route path="/account" element={<Account />}></Route>
        <Route element={<PrefetchCartProducts />}>
          <Route element={<PrefetchAllProduct />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/cart-products" element={<Cart />}></Route>
          <Route element={<PrefetchEachProduct />}>
            <Route path="/:id" element={<EachProduct />}></Route>
          </Route>
          <Route path="/orders" element={<Order />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
