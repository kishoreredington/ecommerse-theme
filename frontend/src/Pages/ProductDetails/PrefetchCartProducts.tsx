import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { productApiSlices } from "./productApiSlice";
import { store } from "../../app/store";

const PrefetchCartProducts = () => {
  useEffect(() => {
    const cartProducts = store.dispatch(
      productApiSlices.endpoints.getAllCart.initiate({ userId: 1 }),
    );

    return () => {
      cartProducts.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default PrefetchCartProducts;
