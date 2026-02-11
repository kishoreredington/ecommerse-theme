import { type Relation } from "typeorm";
import { Address } from "./Adress.js";
import { Favourite } from "./Favourite.js";
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    addresses: Relation<Address[]>;
    favourites: Relation<Favourite[]>;
    hashPassword(): Promise<void>;
}
//# sourceMappingURL=User.d.ts.map