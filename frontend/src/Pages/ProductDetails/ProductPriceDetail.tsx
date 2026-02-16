import { Typography } from "@mui/material";
import { Heart } from "lucide-react";
import CommonButton from "../../Components/CustomButton";
import { useRazorpayBuy } from "../../app/hooks/useRazerpayBuy";
import type { ProductVariant, Product } from "../../type";
import { useState } from "react";
import { useAddToCartMutation } from "./productApiSlice";
import { Counter } from "../../Components/Counter";
import { Snackbar, Alert } from "@mui/material";

const ProductPriceDetail = ({
  variant,
  productDetail,
}: {
  variant?: ProductVariant[] | undefined;
  productDetail: Product;
}) => {
  const { handleBuy, isLoading } = useRazorpayBuy();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    variant[0],
  );

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [quantity, setQuantity] = useState(1);

  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = () => {
    if (quantity <= 0) {
      console.log("Please select atleast one quantity to order.");
      return;
    }
    try {
      addToCart({
        userId: 1,
        variantId: selectedVariant.id,
        quantity,
      }).unwrap();

      setSnackbar({
        open: true,
        message: "Item added to cart successfully!",
        severity: "info",
      });
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };

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
      <div className="mt-6 flex gap-5">
        {/* <CommonButton
          onClick={() =>
            handleBuy({
              amount: 500,
            })
          }
          className="w-[90%]"
        >
          Buy
        </CommonButton> */}
        <Counter count={quantity} onChange={setQuantity} min={1} />
        <CommonButton onClick={handleAddToCart} className="w-[90%]">
          Add to cart
        </CommonButton>
        <CommonButton variant="secondary">
          <Heart color="black" />
        </CommonButton>
      </div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductPriceDetail;
