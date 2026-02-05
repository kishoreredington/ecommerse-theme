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

export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

import { User } from "./User.js";
import { Address } from "./Adress.js";
import { Payment } from "./Payment.js";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @OneToOne(() => Payment, (payment) => payment.order)
  payment!: Relation<Payment>;

  @ManyToOne(() => Address)
  @JoinColumn({ name: "address_id" })
  address!: Address;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status!: OrderStatus;

  @OneToMany(() => OrderStatusHistory, (history) => history.order)
  statusHistory!: Relation<OrderStatusHistory[]>;

  @Column("decimal", { precision: 10, scale: 2 })
  totalAmount!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
