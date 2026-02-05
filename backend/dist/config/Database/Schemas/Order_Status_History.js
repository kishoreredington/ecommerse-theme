var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, } from "typeorm";
import {} from "typeorm";
import { Order } from "./Orders.js";
export var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["PAID"] = "PAID";
    OrderStatus["SHIPPED"] = "SHIPPED";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELLED"] = "CANCELLED";
})(OrderStatus || (OrderStatus = {}));
let OrderStatusHistory = class OrderStatusHistory {
    id;
    order;
    status;
    changedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], OrderStatusHistory.prototype, "id", void 0);
__decorate([
    ManyToOne(() => Order, (order) => order.statusHistory),
    JoinColumn({ name: "order_id" }),
    __metadata("design:type", Object)
], OrderStatusHistory.prototype, "order", void 0);
__decorate([
    Column({
        type: "enum",
        enum: OrderStatus,
        enumName: "order_status_enum",
        default: OrderStatus.PENDING,
    }),
    __metadata("design:type", String)
], OrderStatusHistory.prototype, "status", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], OrderStatusHistory.prototype, "changedAt", void 0);
OrderStatusHistory = __decorate([
    Entity("order_status_history")
], OrderStatusHistory);
export { OrderStatusHistory };
//# sourceMappingURL=Order_Status_History.js.map