import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { productApiSlices } from "./productApiSlice";
import { store } from "../../app/store";

const PrefetchProducts = () => {
  useEffect(() => {
    const products = store.dispatch(
      productApiSlices.endpoints.getAllProducts.initiate({ userId: 1 }),
    );

    return () => {
      products.unsubscribe();
    };
  }, []);
  return <Outlet />;
};

export default PrefetchProducts;
