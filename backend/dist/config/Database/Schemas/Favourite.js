var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PrimaryGeneratedColumn, Entity, ManyToOne, CreateDateColumn, } from "typeorm";
import { User } from "./User.js";
import { Product } from "./Product.js";
let Favourite = class Favourite {
    id;
    user;
    product;
    createdAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Favourite.prototype, "id", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.favourites, { onDelete: "CASCADE" }),
    __metadata("design:type", Object)
], Favourite.prototype, "user", void 0);
__decorate([
    ManyToOne(() => Product, (product) => product.favourites, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Object)
], Favourite.prototype, "product", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Favourite.prototype, "createdAt", void 0);
Favourite = __decorate([
    Entity("favourites")
], Favourite);
export { Favourite };
//# sourceMappingURL=Favourite.js.map