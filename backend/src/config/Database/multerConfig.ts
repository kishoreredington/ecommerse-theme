import multer from "multer";
import path from "path";
import fs from "fs";

const TEMP_DIR = path.resolve("uploads", "temp");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
    cb(null, TEMP_DIR);
  },

  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    cb(new Error("Only image files are allowed"));
  } else {
    cb(null, true);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export const moveFile = (
  tempPath: string,
  productId: number,
  filename: string,
) => {
  const finalDir = path.resolve("uploads", "products", String(productId));
  fs.mkdirSync(finalDir, { recursive: true });

  const finalPath = path.join(finalDir, filename);
  fs.renameSync(tempPath, finalPath);

  return `/products/${productId}/${filename}`;
};
