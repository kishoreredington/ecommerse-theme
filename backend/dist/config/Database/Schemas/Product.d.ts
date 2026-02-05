import { ProductVariant } from "./Product_varient.js";
import { type Relation } from "typeorm";
export declare class Product {
    id: number;
    name: string;
    brand: string;
    description: string;
    productImage: string;
    isActive: boolean;
    variants: Relation<ProductVariant[]>;
}
//# sourceMappingURL=Product.d.ts.map