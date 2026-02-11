import { Product } from "./Product.js";
import { type Relation } from "typeorm";
import { Favourite } from "./Favourite.js";
export declare class ProductVariant {
    id: number;
    product: Relation<Product>;
    size: string;
    price: number;
    favourites: Relation<Favourite[]>;
    stock: number;
    isDefault: boolean;
}
//# sourceMappingURL=Product_varient.d.ts.map