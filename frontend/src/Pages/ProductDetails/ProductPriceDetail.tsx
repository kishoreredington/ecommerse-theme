import { Typography } from "@mui/material";
import { Heart } from "lucide-react";
import CommonButton from "../../Components/CustomButton";
import { useRazorpayBuy } from "../../app/hooks/useRazerpayBuy";
import type { ProductVariant, Product } from "../../type";
import { useState } from "react";

const ProductPriceDetail = ({
  variant,
  productDetail,
}: {
  variant?: ProductVariant[] | undefined;
  productDetail: Product;
}) => {
  console.log(variant);
  const { handleBuy, isLoading } = useRazorpayBuy();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    variant[0],
  );

  return (
    <div className="flex-2 p-4 ">
      <Typography variant="h4">{productDetail.name}</Typography>{" "}
      <Typography variant="body2">{productDetail.description}</Typography>{" "}
      <div className="mt-6 flex gap-3 mb-3">
        {variant?.map((eachType: ProductVariant) => {
          return (
            <button
              onClick={() => setSelectedVariant(eachType)}
              className={`border duration-200 px-4 py-2 text-sm hover:border-black cursor-pointer ${selectedVariant?.id === eachType?.id ? "bg-black text-amber-50" : " bg-white"}`}
            >
              {eachType.size}
            </button>
          );
        })}
      </div>
      <Typography variant="h4">INR {selectedVariant.price}</Typography>
      {/* <div className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between">
          <Typography>pick-up point</Typography>
          <Typography>12 Feb</Typography>
        </div>
        <div className="flex justify-between">
          <Typography>courier delivery</Typography>
          <Typography>tomorrow</Typography>
        </div>

        <Typography>More about delivery →</Typography>
      </div> */}
      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <CommonButton
          onClick={() =>
            handleBuy({
              amount: 500,
            })
          }
          className="w-[90%]"
        >
          Buy
        </CommonButton>
        <CommonButton className="w-[90%]">Add to cart</CommonButton>
        <CommonButton variant="secondary">
          <Heart color="black" />
        </CommonButton>
      </div>
    </div>
  );
};

export default ProductPriceDetail;
