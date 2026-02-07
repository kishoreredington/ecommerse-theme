import { Router } from "express";
import { getAllProducts, uploadProduct, getAllUserOrders, } from "../controller/productController.js";
import { upload } from "../config/Database/multerConfig.js";
export const productRouter = Router();
productRouter.get("/get-all-products", getAllProducts);
productRouter.post("/upload-product", upload.single("image"), uploadProduct);
productRouter.get("/get-all-orders", getAllUserOrders);
//# sourceMappingURL=product.js.map