import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Product } from "./Schemas/Product.js";
import { ProductVariant } from "./Schemas/Product_varient.js";
import { User } from "./Schemas/User.js";
import { Address } from "./Schemas/Adress.js";
import { Order } from "./Schemas/Orders.js";
import { OrderStatusHistory } from "./Schemas/Order_Status_History.js";
import { Payment } from "./Schemas/Payment.js";
import { OrderItem } from "./Schemas/Order_Items.js";
dotenv.config(); // ✅ MUST be here (top-level)
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "ecomm",
    synchronize: true, // dev only
    logging: false,
    entities: [
        Product,
        ProductVariant,
        User,
        Address,
        Order,
        OrderStatusHistory,
        Payment,
        OrderItem,
    ],
});
//# sourceMappingURL=DBconfig.js.map