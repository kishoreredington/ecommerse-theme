var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne, } from "typeorm";
import {} from "typeorm";
import { OrderStatusHistory } from "./Order_Status_History.js";
import { User } from "./User.js";
import { Address } from "./Adress.js";
import { Payment } from "./Payment.js";
import { OrderItem } from "./Order_Items.js";
export var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["PAID"] = "PAID";
    OrderStatus["CONFIRMED"] = "CONFIRMED";
    OrderStatus["PROCESSING"] = "PROCESSING";
    OrderStatus["SHIPPED"] = "SHIPPED";
    OrderStatus["OUT_FOR_DELIVERY"] = "OUT_FOR_DELIVERY";
    OrderStatus["DELIVERED"] = "DELIVERED";
    OrderStatus["CANCELLED"] = "CANCELLED";
    OrderStatus["RETURNED"] = "RETURNED";
    OrderStatus["REFUNDED"] = "REFUNDED";
})(OrderStatus || (OrderStatus = {}));
let Order = class Order {
    id;
    user;
    payment;
    address;
    orderItems;
    status;
    statusHistory;
    inventoryReduced;
    totalAmount;
    createdAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    ManyToOne(() => User),
    JoinColumn({ name: "user_id" }),
    __metadata("design:type", Object)
], Order.prototype, "user", void 0);
__decorate([
    OneToOne(() => Payment, (payment) => payment.order),
    __metadata("design:type", Object)
], Order.prototype, "payment", void 0);
__decorate([
    ManyToOne(() => Address),
    JoinColumn({ name: "address_id" }),
    __metadata("design:type", Object)
], Order.prototype, "address", void 0);
__decorate([
    OneToMany(() => OrderItem, (item) => item.order),
    __metadata("design:type", Object)
], Order.prototype, "orderItems", void 0);
__decorate([
    Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    OneToMany(() => OrderStatusHistory, (history) => history.order),
    __metadata("design:type", Object)
], Order.prototype, "statusHistory", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], Order.prototype, "inventoryReduced", void 0);
__decorate([
    Column("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Order.prototype, "totalAmount", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
Order = __decorate([
    Entity("orders")
], Order);
export { Order };
//# sourceMappingURL=Orders.js.map