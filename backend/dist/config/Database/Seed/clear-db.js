import "reflect-metadata";
import { AppDataSource } from "../DBconfig.js";
async function clearDatabase() {
    try {
        await AppDataSource.initialize();
        console.log("📦 Database connected");
        // 🚨 SAFETY CHECK
        if (process.env.NODE_ENV === "production") {
            throw new Error("❌ Refusing to clear database in production");
        }
        await AppDataSource.query(`
      TRUNCATE
        order_items,
        product_variants,
        addresses,
        products,
        users
      RESTART IDENTITY CASCADE;
    `);
        console.log("🧹 Database cleared successfully");
        process.exit(0);
    }
    catch (err) {
        console.error("❌ Failed to clear database", err);
        process.exit(1);
    }
}
clearDatabase();
//# sourceMappingURL=clear-db.js.map