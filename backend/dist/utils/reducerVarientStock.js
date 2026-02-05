import { AppDataSource } from "../config/Database/DBconfig.js";
import { Order } from "../config/Database/Schemas/Orders.js";
import { ProductVariant } from "../config/Database/Schemas/Product_varient.js";
export const reduceVariantStockForOrder = async (orderId) => {
    await AppDataSource.transaction(async (manager) => {
        const orderRepo = manager.getRepository(Order);
        const variantRepo = manager.getRepository(ProductVariant);
        const order = await orderRepo.findOne({
            where: { id: orderId },
            relations: {
                orderItems: {
                    variant: true,
                },
            },
        });
        if (!order)
            throw new Error("Order not found");
        // ✅ Prevent double deduction
        if (order.inventoryReduced) {
            console.log("⚠️ Inventory already reduced for order:", orderId);
            return;
        }
        for (const item of order.orderItems) {
            const variant = item.variant;
            if (variant.stock < item.quantity) {
                throw new Error(`Insufficient stock for variant ${variant.id}`);
            }
            variant.stock -= item.quantity;
            await variantRepo.save(variant);
        }
        order.inventoryReduced = true;
        await orderRepo.save(order);
    });
};
//# sourceMappingURL=reducerVarientStock.js.map