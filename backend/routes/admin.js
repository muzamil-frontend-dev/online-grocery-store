import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  editProduct,
} from "../controllers/admin.js";
import { authHandler, adminHandler } from "../middleware/authHandler.js";
import { multerConfig, uploadImage } from "../controllers/uploads.js";

const router = express.Router();

router.get("/products/:id", authHandler, adminHandler, getProductById);
router.get("/products", authHandler, adminHandler, getAllProducts);
router.post("/products", authHandler, adminHandler, createProduct);
router.put("/products/:id", authHandler, adminHandler, editProduct);

router.put(
  "/uploads",
  authHandler,
  adminHandler,
  multerConfig.single("image"),
  uploadImage
);

export default router;
