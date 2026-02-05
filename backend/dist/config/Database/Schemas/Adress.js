var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, } from "typeorm";
import {} from "typeorm";
import { User } from "./User.js";
let Address = class Address {
    id;
    user;
    line1;
    city;
    state;
    pincode;
    country;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Address.prototype, "id", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.addresses),
    JoinColumn({ name: "user_id" }),
    __metadata("design:type", Object)
], Address.prototype, "user", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Address.prototype, "line1", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Address.prototype, "state", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Address.prototype, "pincode", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
Address = __decorate([
    Entity("addresses")
], Address);
export { Address };
//# sourceMappingURL=Adress.js.map