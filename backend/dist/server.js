import express from "express";
import { AppDataSource } from "./config/Database/DBconfig.js";
import { cartRouter } from "./route/cart.js";
import { productRouter } from "./route/product.js";
import "reflect-metadata";
import cors from "cors";
import path from "path";
const app = express();
app.use(cors({
    origin: ["http://localhost:5173", "http://192.168.1.10:5173"],
}));
app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/cart/webhook-payment", express.raw({ type: "application/json" }), async (req, res, next) => {
    // Import here to avoid circular dependency issues
    const { webhookPayment } = await import("./controller/cartController.js");
    return webhookPayment(req, res);
});
app.use(express.json());
app.use("/cart", cartRouter);
app.use("/products", productRouter);
AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
//# sourceMappingURL=server.js.map