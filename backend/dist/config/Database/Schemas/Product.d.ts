import { ProductVariant } from "./Product_varient.js";
import { type Relation } from "typeorm";
import { Favourite } from "./Favourite.js";
export declare class Product {
    id: number;
    name: string;
    brand: string;
    description: string;
    productImage: string;
    isActive: boolean;
    favourites: Relation<Favourite[]>;
    variants: Relation<ProductVariant[]>;
    about: string;
    family: string;
    gender: string;
    topNotes: string;
    heartNotes: string;
    baseNotes: string;
    longevity: string;
    sillage: string;
}
//# sourceMappingURL=Product.d.ts.map