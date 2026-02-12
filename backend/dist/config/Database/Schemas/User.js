var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import bcrypt from "bcrypt";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, BeforeInsert, BeforeUpdate, } from "typeorm";
import {} from "typeorm";
import { Address } from "./Adress.js";
import { Favourite } from "./Favourite.js";
import { AddToCart } from "./AddToCart.js";
let User = class User {
    id;
    name;
    email;
    password;
    createdAt;
    addresses;
    favourites;
    addToCart;
    async hashPassword() {
        if (!this.password.startsWith("$2")) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    OneToMany(() => Address, (address) => address.user),
    __metadata("design:type", Object)
], User.prototype, "addresses", void 0);
__decorate([
    OneToMany(() => Favourite, (fav) => fav.user),
    __metadata("design:type", Object)
], User.prototype, "favourites", void 0);
__decorate([
    OneToMany(() => AddToCart, (addToCart) => addToCart.user),
    __metadata("design:type", Object)
], User.prototype, "addToCart", void 0);
__decorate([
    BeforeInsert(),
    BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
User = __decorate([
    Entity("users")
], User);
export { User };
//# sourceMappingURL=User.js.map