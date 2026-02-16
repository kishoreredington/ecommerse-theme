import { use, useState } from "react";
import {
  IconButton,
  TextField,
  Divider,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { useAppSelector } from "../../app/hooks/stateHook";
import {
  productApiSlices,
  useSetFavouriteMutation,
} from "../ProductDetails/productApiSlice";
import { type GetCartResponse } from "../../type";
import { useDeleteFromCartMutation } from "../ProductDetails/productApiSlice";
import CommonButton from "../../Components/CustomButton";
import { useNavigate } from "react-router-dom";
import { useRazorpayBuy } from "../../app/hooks/useRazerpayBuy";

const CartPage = () => {
  const {
    data: cartProducts,
    isLoading,
    isError,
    error,
    isSuccess,
  }: {
    cartProducts: GetCartResponse | undefined;
    isLoading: boolean;
    isError: boolean;
    error: any;
    isSuccess: boolean;
  } = useAppSelector((state) =>
    productApiSlices.endpoints.getAllCart.select({ userId: 1 })(state),
  );

  const { handleBuy, isLoading: isPaymentLoading } = useRazorpayBuy();

  const navigate = useNavigate();

  const [deleteFromCart] = useDeleteFromCartMutation();
  const [setFavourite] = useSetFavouriteMutation();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [promoCode, setPromoCode] = useState("");

  // Map API response to cart items format
  const cartItems =
    cartProducts?.data?.map((cartItem) => ({
      id: cartItem.id,
      brand: cartItem.variant.product.brand,
      name: cartItem.variant.product.name,
      size: cartItem.variant.size,
      price: parseFloat(cartItem.variant.price),
      quantity: cartItem.quantity,
      image: cartItem.variant.product.productUrl,
      variantId: cartItem.variant.id,
    })) || [];

  const updateQuantity = (id: any, change: any) => {
    // TODO: Implement API call to update quantity
    console.log(`Update quantity for cart item ${id} by ${change}`);
    setSnackbar({
      open: true,
      message: "Quantity updated",
      severity: "success",
    });
  };

  const removeItem = async (cartId: any) => {
    try {
      await deleteFromCart({ cartId }).unwrap();
      setSnackbar({
        open: true,
        message: "Item removed from cart",
        severity: "info",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Unable to remove item from cart",
        severity: "info",
      });
    }
  };

  const moveToWishlist = async (id: any) => {
    try {
      await setFavourite({ userId: 1, productId: id }).unwrap();
      setSnackbar({
        open: true,
        message: "Item moved to wishlist",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Item moved to wishlist",
        severity: "success",
      });
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="text-neutral-600">Loading cart...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="text-red-600">
          Error loading cart: {error?.message || "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="mx-auto py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-neutral-700 hover:text-black transition-colors cursor-pointer"
            >
              <ArrowBackIcon />
              <Typography>CONTINUE SHOPPING</Typography>
            </button>
            <Typography>CART ({cartItems.length})</Typography>
            <div className="w-40"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Free Shipping Banner */}
            {subtotal < 150 && cartItems.length > 0 && (
              <div className="bg-neutral-100 border border-neutral-200 px-6 py-4 flex items-center gap-3">
                <LocalShippingOutlinedIcon className="text-neutral-600" />
                <p className="text-sm text-neutral-700">
                  Add{" "}
                  <span className="font-medium">
                    ${(150 - subtotal).toFixed(2)}
                  </span>{" "}
                  more to get <span className="font-medium">FREE SHIPPING</span>
                </p>
              </div>
            )}

            {console.log(cartItems)}

            {cartItems.length === 0 ? (
              <div className="bg-white border border-neutral-200 p-12 text-center">
                <Typography variant="body1">Your cart is empty</Typography>
                <Typography variant="h4">Continue Shopping</Typography>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-neutral-200 p-6"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="w-32 h-32 flex-shrink-0 bg-neutral-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <Typography className="text-xs tracking-widest text-neutral-500 mb-1">
                            {item.brand}
                          </Typography>
                          <Typography
                            variant="h5"
                            className="text-lg font-light tracking-wide mb-1"
                          >
                            {item.name}
                          </Typography>
                          <Typography className="text-sm text-neutral-600">
                            {item.size}
                          </Typography>
                        </div>
                        <Typography variant="h4" className="text-lg font-light">
                          $ {item.price}
                        </Typography>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex items-center justify-between mt-4">
                        <Typography variant="h5">
                          Quantity: {item.quantity}
                        </Typography>

                        <div className="flex gap-2">
                          <IconButton
                            size="small"
                            onClick={() => removeItem(item.id)}
                            className="hover:bg-neutral-100"
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="mt-3 text-right flex ">
                        <CommonButton
                          onClick={() =>
                            handleBuy({
                              amount: total,
                              addressId: 1,
                              items: [
                                {
                                  variantId: item.variantId,
                                  quantity: item.quantity,
                                },
                              ],
                            })
                          }
                          disabled={cartItems.length === 0}
                        >
                          PROCEED FOT SINGLE ITEM
                        </CommonButton>
                        <Typography className="text-sm text-neutral-600">
                          Subtotal:{"   "}
                          <span className="font-medium text-neutral-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-neutral-200 p-6 sticky top-6">
              <Typography variant="h5">ORDER SUMMARY</Typography>

              {/* Promo Code */}
              <div className="mb-6">
                <Typography variant="body2">PROMO CODE</Typography>
                <div className="flex gap-2">
                  <TextField
                    size="small"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-grow"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        fontFamily: "inherit",
                        fontSize: "0.875rem",
                      },
                    }}
                  />
                  <CommonButton
                    disabled={true}
                    onClick={() => {
                      setSnackbar({
                        open: true,
                        message: "Item moved to wishlist",
                        severity: "success",
                      });
                    }}
                    variant="outlined"
                    className="border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
                    sx={{
                      borderColor: "#171717",
                      color: "#171717",
                      "&:hover": {
                        borderColor: "#171717",
                        backgroundColor: "#171717",
                        color: "white",
                      },
                      textTransform: "none",
                      fontWeight: 300,
                      letterSpacing: "0.05em",
                    }}
                  >
                    Apply
                  </CommonButton>
                </div>
              </div>

              <Divider className="my-4" />

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <Typography>Subtotal</Typography>
                  <Typography className="text-neutral-900">
                    ${subtotal.toFixed(2)}
                  </Typography>
                </div>
                <div className="flex justify-between text-sm">
                  <Typography className="text-neutral-600">Shipping</Typography>
                  <Typography className="text-neutral-900">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </Typography>
                </div>
              </div>

              <Divider className="my-4" />

              <div className="flex justify-between items-baseline mb-6">
                <Typography className="text-lg tracking-wide">Total</Typography>
                <Typography className="text-2xl font-light">
                  ${total.toFixed(2)}
                </Typography>
              </div>

              <CommonButton
                onClick={() =>
                  handleBuy({
                    amount: total,
                    addressId: 1,
                    items: cartProducts.data.map((item: any) => ({
                      variantId: item.variant?.id,
                      quantity: item.quantity,
                    })),
                  })
                }
                disabled={cartItems.length === 0}
              >
                PROCEED TO CHECKOUT
              </CommonButton>

              <button className="w-full text-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors py-2">
                Continue Shopping
              </button>

              {/* Security Badges */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="flex items-center justify-center gap-4 text-xs text-neutral-500">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Secure Checkout</span>
                  </div>
                  <span>•</span>
                  <span>Free Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Snackbar for notifications */}
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

export default CartPage;
