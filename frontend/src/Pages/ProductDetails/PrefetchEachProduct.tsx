import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { productApiSlices } from "./productApiSlice";
import { store } from "../../app/store";
import { useParams } from "react-router-dom";

const PrefetchEachProduct = () => {
  const { id } = useParams();

  useEffect(() => {
    const specificProducts = store.dispatch(
      productApiSlices.endpoints.getSpecificProduct.initiate({
        id,
      }),
    );

    return () => {
      specificProducts.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default PrefetchEachProduct;
