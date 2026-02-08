import { Router } from "express";
import {
  getAllProducts,
  uploadProduct,
  getAllUserOrders,
  getSpecificProduct,
} from "../controller/productController.js";
import { upload } from "../config/Database/multerConfig.js";

export const productRouter = Router();

productRouter.get("/get-all-products", getAllProducts);
productRouter.post("/upload-product", upload.single("image"), uploadProduct);
productRouter.get("/get-all-orders", getAllUserOrders);
productRouter.get("/get-specific-product", getSpecificProduct);
