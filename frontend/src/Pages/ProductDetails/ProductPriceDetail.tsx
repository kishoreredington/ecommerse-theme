import { Typography } from "@mui/material";
import { Heart } from "lucide-react";
import CommonButton from "../../Components/CustomButton";
import { useRazorpayBuy } from "../../app/hooks/useRazerpayBuy";

const ProductPriceDetail = () => {
  const { handleBuy, isLoading } = useRazorpayBuy();

  return (
    <div className="flex-2 p-4 ">
      {/* Title */}
      <Typography variant="h4">Tom Ford</Typography>
      <Typography variant="body2">Lost Cherry eau de parfum</Typography>

      {/* Size selector */}
      <div className="mt-6 flex gap-3">
        <button className="border px-4 py-2 text-sm text-gray-700 hover:border-black cursor-pointer">
          30 ml
        </button>
        <button className="border border-black bg-black px-4 py-2 text-sm text-white cursor-pointer">
          50 ml
        </button>
        <button className="border px-4 py-2 text-sm text-gray-700 hover:border-black cursor-pointer">
          100 ml
        </button>
      </div>

      {/* Price */}
      <div className="mt-6 flex items-end justify-between">
        <Typography variant="h4">$ 255</Typography>
        <Typography variant="body2">$ 200 with card</Typography>
      </div>

      {/* Delivery info */}
      <div className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between">
          <Typography>pick-up point</Typography>
          <Typography>12 Feb</Typography>
        </div>
        <div className="flex justify-between">
          <Typography>courier delivery</Typography>
          <Typography>tomorrow</Typography>
        </div>

        <Typography>More about delivery →</Typography>
      </div>

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
