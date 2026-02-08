import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";

import { type Relation } from "typeorm";
import { OrderStatusHistory } from "./Order_Status_History.js";
import { User } from "./User.js";
import { Address } from "./Adress.js";
import { Payment } from "./Payment.js";
import { OrderItem } from "./Order_Items.js";

export enum OrderStatus {
  PENDING = "PENDING", // Order created, payment pending
  PAID = "PAID", // Payment successful
  CONFIRMED = "CONFIRMED", // Order confirmed by admin
  PROCESSING = "PROCESSING", // Order is being prepared
  SHIPPED = "SHIPPED", // Order shipped/dispatched
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY", // Out for delivery
  DELIVERED = "DELIVERED", // Successfully delivered
  CANCELLED = "CANCELLED", // Order cancelled
  RETURNED = "RETURNED", // Order returned
  REFUNDED = "REFUNDED", // Payment refunded
}

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: Relation<User>;

  @OneToOne(() => Payment, (payment) => payment.order)
  payment!: Relation<Payment>;

  @ManyToOne(() => Address)
  @JoinColumn({ name: "address_id" })
  address!: Relation<Address>;

  @OneToMany(() => OrderItem, (item) => item.order)
  orderItems!: Relation<OrderItem[]>;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status!: OrderStatus;

  @OneToMany(() => OrderStatusHistory, (history) => history.order)
  statusHistory!: Relation<OrderStatusHistory[]>;

  @Column({ default: false })
  inventoryReduced!: boolean;

  @Column("decimal", { precision: 10, scale: 2 })
  totalAmount!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
