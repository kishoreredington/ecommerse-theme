import { type Request, type Response } from "express";
import { AppDataSource } from "../config/Database/DBconfig.js";
import { Product } from "../config/Database/Schemas/Product.js";
import { ProductVariant } from "../config/Database/Schemas/Product_varient.js";
import fs from "fs";
import { moveFile } from "../config/Database/multerConfig.js";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const productRepo = AppDataSource.getRepository(Product);

    const BASE_ASSET_URL = process.env.ASSET_BASE_URL;
    console.log(BASE_ASSET_URL);

    const products = await productRepo.find({
      relations: ["variants"],
    });

    const data = products.map((product) => {
      return {
        ...product,
        productUrl: `${BASE_ASSET_URL}/products/${product.id}/${product.productImage}`,
      };
    });

    return res.status(200).json({
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const uploadProduct = async (req: Request, res: Response) => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    if (!req.file) throw new Error("No file uploaded");

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
  } catch (err) {
    await queryRunner.rollbackTransaction();

    // cleanup temp file
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(400).json({ message: "Upload failed" });
  } finally {
    await queryRunner.release();
  }
};
