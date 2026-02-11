import { type Relation } from "typeorm";
import { User } from "./User.js";
import { Product } from "./Product.js";
export declare class Favourite {
    id: number;
    user: Relation<User>;
    product: Relation<Product>;
    createdAt: Date;
}
//# sourceMappingURL=Favourite.d.ts.map