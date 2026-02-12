import { Router } from "express";
import { getAllProducts, uploadProduct, getAllUserOrders, getSpecificProduct, makeFavourite, getAddToCart, addToCart, removeFromCart, } from "../controller/productController.js";
import { upload } from "../config/Database/multerConfig.js";
export const productRouter = Router();
productRouter.get("/get-all-products", getAllProducts);
productRouter.post("/upload-product", upload.single("image"), uploadProduct);
productRouter.get("/get-all-orders", getAllUserOrders);
productRouter.get("/get-specific-product", getSpecificProduct);
productRouter.post("/make-favourite", makeFavourite);
productRouter.get("/get-all-cart", getAddToCart);
productRouter.post("/add-to-cart", addToCart);
productRouter.delete("/remove-from-cart", removeFromCart);
//# sourceMappingURL=product.js.map