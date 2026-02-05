import { type Relation } from "typeorm";
import { OrderStatusHistory } from "./Order_Status_History.js";
export declare enum OrderStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}
import { User } from "./User.js";
import { Address } from "./Adress.js";
import { Payment } from "./Payment.js";
export declare class Order {
    id: number;
    user: User;
    payment: Relation<Payment>;
    address: Address;
    status: OrderStatus;
    statusHistory: Relation<OrderStatusHistory[]>;
    totalAmount: number;
    createdAt: Date;
}
//# sourceMappingURL=Orders.d.ts.map