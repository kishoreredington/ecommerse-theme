// import { useAppSelector } from "../../app/hooks/stateHook";
// import { productApiSlices } from "../ProductDetails/productApiSlice";

// const Cart = () => {
//   const {
//     data: cartProducts,
//     isLoading,
//     isError,
//     error,
//     isSuccess,
//   } = useAppSelector((state) =>
//     productApiSlices.endpoints.getAllCart.select({ userId: 1 })(state),
//   );

//   console.log("CHECKING CART PRODUCTS", cartProducts);
//   return <div>HAIIIIIIII</div>;
// };

// export default Cart;

import { useState } from "react";
import {
  IconButton,
  Button,
  TextField,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

const CartPage = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      brand: "Maison Élégance",
      name: "Bleu de Noir",
      size: "100ml",
      price: 125,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
    },
    {
      id: 2,
      brand: "Royal Scents",
      name: "Velvet Rose Oud",
      size: "50ml",
      price: 89,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400",
    },
    {
      id: 3,
      brand: "Oceanica",
      name: "Aqua Spirit",
      size: "100ml",
      price: 110,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    setSnackbar({
      open: true,
      message: "Item removed from cart",
      severity: "info",
    });
  };

  const moveToWishlist = (id) => {
    removeItem(id);
    setSnackbar({
      open: true,
      message: "Item moved to wishlist",
      severity: "success",
    });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 text-neutral-700 hover:text-black transition-colors">
              <ArrowBackIcon />
              <span className="text-sm font-light tracking-wide">
                CONTINUE SHOPPING
              </span>
            </button>
            <h1 className="text-3xl font-light tracking-widest">
              CART ({cartItems.length})
            </h1>
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
            {subtotal < 150 && (
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

            {cartItems.map((item) => (
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
                        <p className="text-xs tracking-widest text-neutral-500 mb-1">
                          {item.brand}
                        </p>
                        <h3 className="text-lg font-light tracking-wide mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-neutral-600">{item.size}</p>
                      </div>
                      <p className="text-lg font-light">${item.price}</p>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-neutral-300">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-4 py-2 hover:bg-neutral-100 transition-colors text-neutral-700"
                        >
                          −
                        </button>
                        <span className="px-6 py-2 border-x border-neutral-300 min-w-[60px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-4 py-2 hover:bg-neutral-100 transition-colors text-neutral-700"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex gap-2">
                        <IconButton
                          size="small"
                          onClick={() => moveToWishlist(item.id)}
                          className="hover:bg-neutral-100"
                        >
                          <FavoriteBorderIcon fontSize="small" />
                        </IconButton>
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
                    <div className="mt-3 text-right">
                      <p className="text-sm text-neutral-600">
                        Subtotal:{" "}
                        <span className="font-medium text-neutral-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-neutral-200 p-6 sticky top-6">
              <h2 className="text-xl font-light tracking-widest mb-6">
                ORDER SUMMARY
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="text-xs tracking-widest text-neutral-600 mb-2 block">
                  PROMO CODE
                </label>
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
                  <Button
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
                  </Button>
                </div>
              </div>

              <Divider className="my-4" />

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="text-neutral-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="text-neutral-900">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <Divider className="my-4" />

              {/* Total */}
              <div className="flex justify-between items-baseline mb-6">
                <span className="text-lg tracking-wide">Total</span>
                <span className="text-2xl font-light">${total.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                className="bg-neutral-900 text-white hover:bg-neutral-800 py-3 mb-3"
                sx={{
                  backgroundColor: "#171717",
                  "&:hover": {
                    backgroundColor: "#262626",
                  },
                  textTransform: "none",
                  fontSize: "0.875rem",
                  fontWeight: 300,
                  letterSpacing: "0.1em",
                  padding: "12px",
                }}
              >
                PROCEED TO CHECKOUT
              </Button>

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
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
