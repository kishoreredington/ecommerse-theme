import { type Relation } from "typeorm";
import { User } from "./User.js";
export declare class Address {
    id: number;
    user: Relation<User>;
    line1: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
}
//# sourceMappingURL=Adress.d.ts.map