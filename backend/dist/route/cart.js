import { raw } from "express";
import { Router } from "express";
import { createOrder, verifyPayment, webhookPayment, downloadInvoice, } from "../controller/cartController.js";
export const cartRouter = Router();
console.log("In Cart Router");
cartRouter.post("/create-order", createOrder);
cartRouter.post("/verify-payment", verifyPayment);
cartRouter.get("/invoice/:orderId", downloadInvoice);
//# sourceMappingURL=cart.js.map