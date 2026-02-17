import {} from "express";
import { AppDataSource } from "../config/Database/DBconfig.js";
import { Product } from "../config/Database/Schemas/Product.js";
import { ProductVariant } from "../config/Database/Schemas/Product_varient.js";
import fs from "fs";
import { moveFile } from "../config/Database/multerConfig.js";
import { Order } from "../config/Database/Schemas/Orders.js";
import { Favourite } from "../config/Database/Schemas/Favourite.js";
import { User } from "../config/Database/Schemas/User.js";
import { AddToCart } from "../config/Database/Schemas/AddToCart.js";
import { kMaxLength } from "buffer";
const BASE_ASSET_URL = process.env.ASSET_BASE_URL;
export const getAllProducts = async (req, res) => {
    try {
        const userId = Number(req.query.userId) || 1; // later from auth token
        const productRepo = AppDataSource.getRepository(Product);
        const favRepo = AppDataSource.getRepository(Favourite);
        const products = await productRepo.find({
            relations: ["variants"],
        });
        let favProductIds = new Set();
        if (userId) {
            const favourites = await favRepo.find({
                where: { user: { id: userId } },
                relations: ["product"],
            });
            favProductIds = new Set(favourites.map((fav) => fav.product.id));
        }
        const data = products.map((product) => {
            return {
                ...product,
                isFavourite: favProductIds.has(product.id),
                productUrl: `${BASE_ASSET_URL}/products/${product.id}/${product.productImage}`,
            };
        });
        return res.status(200).json({
            count: data.length,
            data,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetch products",
        });
    }
};
export const getSpecificProduct = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ message: "Product id is required" });
        }
        const productRepo = AppDataSource.getRepository(Product);
        const product = await productRepo.findOne({
            where: { id: Number(id), isActive: true },
            relations: {
                variants: true,
            },
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const data = {
            ...product,
            productUrl: `${BASE_ASSET_URL}/products/${product.id}/${product.productImage}`,
        };
        return res.status(200).json({
            message: "Product fetched successfully",
            data,
        });
    }
    catch (error) {
        console.error("GET SPECIFIC PRODUCT ERROR:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const uploadProduct = async (req, res) => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        if (!req.file)
            throw new Error("No file uploaded");
        const product = queryRunner.manager.create(Product, {
            name: "TESTING",
            brand: "TESTING",
            productImage: req.file.originalname,
            description: "TESTING",
        });
        await queryRunner.manager.save(product);
        const relativePath = moveFile(req.file.path, product.id, req.file.filename);
        const variant = queryRunner.manager.create(ProductVariant, {
            product,
            variantName: "Variant Testing",
            size: "150ml",
            price: 1000,
            stock: 100,
        });
        await queryRunner.manager.save(variant);
        await queryRunner.commitTransaction();
        res.json({
            success: true,
            productId: product.id,
            image: relativePath,
        });
    }
    catch (err) {
        await queryRunner.rollbackTransaction();
        // cleanup temp file
        if (req.file?.path && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        res.status(400).json({ message: "Upload failed" });
    }
    finally {
        await queryRunner.release();
    }
};
export const getAllUserOrders = async (req, res) => {
    try {
        // const { userId } = req.body;
        // if (!userId) {
        //   return res.status(400).json({ message: "No user Id" });
        // }
        const orderRepo = AppDataSource.getRepository(Order);
        const orders = await orderRepo.find({
            where: { user: { id: 1 } },
            relations: {
                orderItems: {
                    variant: {
                        product: true,
                    },
                },
                payment: true,
                address: true,
                statusHistory: true,
            },
            order: {
                createdAt: "DESC",
            },
        });
        // Transform orders to include productUrl
        const ordersWithProductUrl = orders.map((order) => ({
            ...order,
            orderItems: order.orderItems.map((item) => ({
                ...item,
                variant: {
                    ...item.variant,
                    product: {
                        ...item.variant.product,
                        productUrl: `${process.env.BASE_URL || "http://localhost:3000"}/uploads/products/${item.variant.product.id}/${item.variant.product.productImage}`,
                    },
                },
            })),
        }));
        console.log("RAW ORDERS FROM DB ============================>:", ordersWithProductUrl);
        return res.status(200).json({
            message: "Orders fetched successfully",
            data: ordersWithProductUrl,
        });
    }
    catch (error) {
        console.error("GET USER ORDERS ERROR:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const makeFavourite = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const favRepo = AppDataSource.getRepository(Favourite);
        const userRepo = AppDataSource.getRepository(User);
        const productRepo = AppDataSource.getRepository(Product);
        // ✅ check user
        const user = await userRepo.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // ✅ check product
        const product = await productRepo.findOne({ where: { id: productId } });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const existingFavourite = await favRepo.findOne({
            where: {
                user: { id: userId },
                product: { id: productId },
            },
            relations: ["user", "product"],
        });
        // 💔 REMOVE
        if (existingFavourite) {
            await favRepo.remove(existingFavourite);
            return res.status(200).json({
                message: "Removed from favourites 💔",
                isFavourite: false,
            });
        }
        // ✅ create
        const favourite = favRepo.create({
            user,
            product,
        });
        await favRepo.save(favourite);
        return res.status(201).json({
            message: "Added to favourites ❤️",
            data: favourite,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const addToCart = async (req, res) => {
    try {
        const { userId, variantId, quantity } = req.body;
        const cartRepo = AppDataSource.getRepository(AddToCart);
        const userRepo = AppDataSource.getRepository(User);
        const variantRepo = AppDataSource.getRepository(ProductVariant);
        // ✅ check user
        const user = await userRepo.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // ✅ check variant
        const variant = await variantRepo.findOne({ where: { id: variantId } });
        if (!variant) {
            return res.status(404).json({ message: "Product variant not found" });
        }
        // ✅ check if already in cart
        let cartItem = await cartRepo.findOne({
            where: {
                user: { id: userId },
                variant: {
                    id: variantId,
                },
            },
            relations: ["user", "variant"],
        });
        if (cartItem) {
            // ✅ update quantity
            cartItem.quantity += quantity;
        }
        else {
            // ✅ create new cart item
            cartItem = cartRepo.create({
                user,
                variant,
                quantity,
            });
        }
        await cartRepo.save(cartItem);
        return res.status(200).json({
            message: "Added to cart successfully",
            data: cartItem,
        });
    }
    catch (error) {
        console.error("ADD TO CART ERROR:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const removeFromCart = async (req, res) => {
    try {
        const cartId = Number(req.body.cartId);
        console.log("REMOVE FROM CART - cartId:", cartId);
        const cartRepo = AppDataSource.getRepository(AddToCart);
        const cartItem = await cartRepo.findOne({
            where: { id: cartId },
        });
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }
        await cartRepo.remove(cartItem);
        return res.status(200).json({
            message: "Removed from cart successfully",
        });
    }
    catch (error) {
        console.error("REMOVE FROM CART ERROR:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const getAddToCart = async (req, res) => {
    const { userId } = req.params;
    const addToCartRepo = AppDataSource.getRepository(AddToCart);
    try {
        const cartItems = await addToCartRepo.find({
            where: { user: { id: 1 } },
            relations: {
                variant: {
                    product: true,
                },
            },
        });
        const data = cartItems.map((item) => ({
            ...item,
            variant: {
                ...item.variant,
                product: {
                    ...item.variant.product,
                    productUrl: `${BASE_ASSET_URL}/products/${item.variant.product.id}/${item.variant.product.productImage}`,
                },
            },
        }));
        return res.status(200).json({
            message: "Cart items fetched successfully",
            data,
        });
    }
    catch (error) {
        console.error("GET CART ITEMS ERROR:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
//# sourceMappingURL=productController.js.map