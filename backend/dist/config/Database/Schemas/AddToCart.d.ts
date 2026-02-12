import { type Relation } from "typeorm";
import { User } from "./User.js";
import { ProductVariant } from "./Product_varient.js";
export declare class AddToCart {
    id: number;
    user: Relation<User>;
    variant: Relation<ProductVariant>;
    quantity: number;
}
//# sourceMappingURL=AddToCart.d.ts.map