import { type Relation } from "typeorm";
import { Order } from "./Orders.js";
import { ProductVariant } from "./Product_varient.js";
export declare class OrderItem {
    id: number;
    order: Relation<Order>;
    variant: Relation<ProductVariant>;
    quantity: number;
    price: number;
}
//# sourceMappingURL=Order_Items.d.ts.map