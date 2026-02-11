import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { productApiSlices } from "./productApiSlice";
import { store } from "../../app/store";

const PrefetchAllProduct = () => {
  useEffect(() => {
    const specificProducts = store.dispatch(
      productApiSlices.endpoints.getAllProducts.initiate(undefined),
    );

    return () => {
      specificProducts.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default PrefetchAllProduct;
