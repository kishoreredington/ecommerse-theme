var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, ManyToOne, } from "typeorm";
import { Order } from "./Orders.js";
import {} from "typeorm";
export var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["SUCCESS"] = "SUCCESS";
    PaymentStatus["FAILED"] = "FAILED";
})(PaymentStatus || (PaymentStatus = {}));
let Payment = class Payment {
    id;
    order;
    provider; // Razorpay, Stripe
    transactionId;
    status;
    createdAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Payment.prototype, "id", void 0);
__decorate([
    ManyToOne(() => Order, (order) => order.payment),
    JoinColumn({ name: "order_id" }),
    __metadata("design:type", Object)
], Payment.prototype, "order", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Payment.prototype, "provider", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Payment.prototype, "transactionId", void 0);
__decorate([
    Column({
        type: "enum",
        enum: PaymentStatus,
    }),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Payment.prototype, "createdAt", void 0);
Payment = __decorate([
    Entity("payments")
], Payment);
export { Payment };
//# sourceMappingURL=Payment.js.map