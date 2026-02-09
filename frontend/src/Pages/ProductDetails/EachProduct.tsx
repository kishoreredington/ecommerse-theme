import ProductPriceDetail from "./ProductPriceDetail";
import ProductDescription from "./ProductDescription";
import SampleProduct from "../../assets/p1.png";
import CommonButton from "../../Components/CustomButton";
import { Typography } from "@mui/material";
import { Products } from "../../data";
import ProductCard from "../../Components/ProductCard";
import { type Product } from "../../types/productTypes";
import { useParams } from "react-router-dom";
import { productApiSlices } from "./productApiSlice";
import { useAppSelector } from "../../app/hooks/stateHook";
import { type GetProductResponse } from "../../type";

const EachProduct = () => {
  const { id } = useParams();

  const {
    data,
    isSuccess,
    isLoading,
    isError,
    error,
  }: {
    data: GetProductResponse;
    isLoading: boolean;
    isError: boolean;
    isSuccess?: boolean;
    error?: string;
  } = useAppSelector((state) =>
    productApiSlices.endpoints.getSpecificProduct.select({
      id,
    })(state),
  );

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  console.log(data);

  if (isSuccess) {
    console.log("SUCCESS");
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <ProductPriceDetail productDetail={data.data} variant={data.data.variants} />
          <div className="w-120">
            <img src={SampleProduct}></img>
          </div>
          <ProductDescription />
        </div>

        <div className="flex justify-between items-start">
          <div className="w-full max-w-xs space-y-4">
            <div className="flex items-center justify-between">
              <Typography variant="h5">Similar products</Typography>

              <div className="flex gap-4 text-xl">
                <button className="hover:opacity-60">←</button>
                <button className="hover:opacity-60">→</button>
              </div>
            </div>

            <CommonButton>View all</CommonButton>
          </div>

          {/* <div className="flex">
          {Products.slice(0, 3).map((product: Product) => (
            <ProductCard
              showPrice={false}
              showProductName={false}
              showVarient={false}
              product={product}
            />
          ))}
        </div> */}
        </div>
      </div>
    );
  }
};

export default EachProduct;
