import { type Relation } from "typeorm";
import { OrderStatusHistory } from "./Order_Status_History.js";
import { User } from "./User.js";
import { Address } from "./Adress.js";
import { Payment } from "./Payment.js";
import { OrderItem } from "./Order_Items.js";
export declare enum OrderStatus {
    PENDING = "PENDING",// Order created, payment pending
    PAID = "PAID",// Payment successful
    CONFIRMED = "CONFIRMED",// Order confirmed by admin
    PROCESSING = "PROCESSING",// Order is being prepared
    SHIPPED = "SHIPPED",// Order shipped/dispatched
    OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",// Out for delivery
    DELIVERED = "DELIVERED",// Successfully delivered
    CANCELLED = "CANCELLED",// Order cancelled
    RETURNED = "RETURNED",// Order returned
    REFUNDED = "REFUNDED"
}
export declare class Order {
    id: number;
    user: Relation<User>;
    payment: Relation<Payment>;
    address: Relation<Address>;
    orderItems: Relation<OrderItem[]>;
    status: OrderStatus;
    statusHistory: Relation<OrderStatusHistory[]>;
    inventoryReduced: boolean;
    totalAmount: number;
    createdAt: Date;
}
//# sourceMappingURL=Orders.d.ts.map