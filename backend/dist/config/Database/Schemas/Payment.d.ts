import { Order } from "./Orders.js";
import { type Relation } from "typeorm";
export declare enum PaymentStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}
export declare class Payment {
    id: number;
    order: Relation<Order>;
    provider: string;
    transactionId: string;
    status: PaymentStatus;
    createdAt: Date;
}
//# sourceMappingURL=Payment.d.ts.map