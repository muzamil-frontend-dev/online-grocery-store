import Product from "../models/product.js";
import asyncHandler from "express-async-handler";
// Path         /api/products
// Type         GET
// Access       Public
// Desc         Get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isActive: true });
  return res.json(products);
});

// Path         /api/products/:id
// Type         GET
// Access       Public
// Desc         Get all products
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product && product.isActive) {
    return res.json(product);
  } else {
    res.statusCode = 404;
    throw new Error("Product not found.");
  }
});

export const updateCountInStock = async (productId, qty) => {
  const product = await Product.findById(productId);
  if (product) {
    product.countInStock = product.countInStock - qty;
    await product.save();
  }
};

// Path         admin/api/products
// Type         GET
// Access       Private Admin only
// Desc         Get all products
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  return res.json(products);
});
