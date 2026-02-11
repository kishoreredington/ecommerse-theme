var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, } from "typeorm";
import { Product } from "./Product.js";
import {} from "typeorm";
import { Favourite } from "./Favourite.js";
let ProductVariant = class ProductVariant {
    id;
    product;
    size;
    price;
    favourites;
    stock;
    isDefault;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ProductVariant.prototype, "id", void 0);
__decorate([
    ManyToOne(() => Product, (product) => product.variants, {
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Object)
], ProductVariant.prototype, "product", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], ProductVariant.prototype, "size", void 0);
__decorate([
    Column("decimal", {
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], ProductVariant.prototype, "price", void 0);
__decorate([
    OneToMany(() => Favourite, (fav) => fav.product),
    __metadata("design:type", Object)
], ProductVariant.prototype, "favourites", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], ProductVariant.prototype, "stock", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], ProductVariant.prototype, "isDefault", void 0);
ProductVariant = __decorate([
    Entity("product_variants")
], ProductVariant);
export { ProductVariant };
//# sourceMappingURL=Product_varient.js.map