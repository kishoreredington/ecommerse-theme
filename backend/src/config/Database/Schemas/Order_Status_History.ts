import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { type Relation } from "typeorm";

import { Order } from "./Orders.js";

export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

@Entity("order_status_history")
export class OrderStatusHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order, (order) => order.statusHistory)
  @JoinColumn({ name: "order_id" })
  order!: Relation<Order>;

  @Column({
    type: "enum",
    enum: OrderStatus,
    enumName: "order_status_enum",
    default: OrderStatus.PENDING,
  })
  status!: OrderStatus;

  @CreateDateColumn()
  changedAt!: Date;
}
