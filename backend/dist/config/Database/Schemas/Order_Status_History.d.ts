import { type Relation } from "typeorm";
import { Order } from "./Orders.js";
export declare enum OrderStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}
export declare class OrderStatusHistory {
    id: number;
    order: Relation<Order>;
    status: OrderStatus;
    changedAt: Date;
}
//# sourceMappingURL=Order_Status_History.d.ts.map