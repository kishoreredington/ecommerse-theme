import ProductPriceDetail from "./ProductPriceDetail";
import ProductDescription from "./ProductDescription";
import SampleProduct from "../../assets/p1.png";
import CommonButton from "../../Components/CustomButton";
import { Typography } from "@mui/material";
import { Products } from "../../data";
import ProductCard from "../../Components/ProductCard";
import { type Product } from "../../types/productTypes";

const EachProduct = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <ProductPriceDetail />
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
};

export default EachProduct;
