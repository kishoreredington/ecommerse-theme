import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { productApiSlices } from "./productApiSlice";
import { store } from "../../app/store";

const PrefetchOrders = () => {
  useEffect(() => {
    const orders = store.dispatch(
      productApiSlices.endpoints.getAllOrders.initiate(undefined),
    );

    return () => {
      orders.unsubscribe();
    };
  }, []);
  return <Outlet />;
};

export default PrefetchOrders;
