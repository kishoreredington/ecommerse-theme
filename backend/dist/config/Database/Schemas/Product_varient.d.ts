import { Product } from "./Product.js";
import { type Relation } from "typeorm";
export declare class ProductVariant {
    id: number;
    product: Relation<Product>;
    size: string;
    price: number;
    stock: number;
    isDefault: boolean;
}
//# sourceMappingURL=Product_varient.d.ts.map