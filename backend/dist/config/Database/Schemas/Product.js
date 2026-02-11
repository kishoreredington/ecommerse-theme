var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, } from "typeorm";
import { ProductVariant } from "./Product_varient.js";
import {} from "typeorm";
import { Favourite } from "./Favourite.js";
let Product = class Product {
    id;
    name;
    brand;
    description;
    productImage;
    isActive;
    favourites;
    variants;
    about;
    family;
    gender;
    topNotes;
    heartNotes;
    baseNotes;
    longevity;
    sillage;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Product.prototype, "brand", void 0);
__decorate([
    Column("text"),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "productImage", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
__decorate([
    OneToMany(() => Favourite, (fav) => fav.product),
    __metadata("design:type", Object)
], Product.prototype, "favourites", void 0);
__decorate([
    OneToMany(() => ProductVariant, (variant) => variant.product),
    __metadata("design:type", Object)
], Product.prototype, "variants", void 0);
__decorate([
    Column({ default: "" }),
    __metadata("design:type", String)
], Product.prototype, "about", void 0);
__decorate([
    Column({ default: "" }),
    __metadata("design:type", String)
], Product.prototype, "family", void 0);
__decorate([
    Column({ default: "" }),
    __metadata("design:type", String)
], Product.prototype, "gender", void 0);
__decorate([
    Column({ default: "" }),
    __metadata("design:type", String)
], Product.prototype, "topNotes", void 0);
__decorate([
    Column({ default: "" }),
    __metadata("design:type", String)
], Product.prototype, "heartNotes", void 0);
__decorate([
    Column({ default: "" }),
    __metadata("design:type", String)
], Product.prototype, "baseNotes", void 0);
__decorate([
    Column({ default: "" }),
    __metadata("design:type", String)
], Product.prototype, "longevity", void 0);
__decorate([
    Column({ default: "" }),
    __metadata("design:type", String)
], Product.prototype, "sillage", void 0);
Product = __decorate([
    Entity("products")
], Product);
export { Product };
//# sourceMappingURL=Product.js.map