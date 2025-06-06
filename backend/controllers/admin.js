import Product from "../models/product.js";
import asyncHandler from "express-async-handler";
// Path         /api/admin/products
// Type         GET
// Access       Private
// Desc         Get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  return res.json(products);
});

// Path         /api/admin/products/:id
// Type         GET
// Access       Public
// Desc         Get all products
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    return res.json(product);
  } else {
    res.statusCode = 404;
    throw new Error("Product not found.");
  }
});

// Path         /api/admin/products
// Type         Post
// Access       Private
// Desc         Create Product
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: "Sample Product",
    image: "",
    description: "",
    color: "",
    category: "",
    fabric: "",
    price: 0,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    isActive: false,
  });

  const createdProduct = await product.save();
  res.statusCode = 201;
  return res.json({ _id: createdProduct._id });
});

// Path         /api/admin/products/:id
// Type         Put
// Access       Private
// Desc         Edit Product
export const editProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    const {
      name,
      price,
      description,
      color,
      fabric,
      countInStock,
      image,
      isActive,
      category,
    } = req.body;

    product.name = name;
    product.price = price;
    product.description = description;
    product.countInStock = countInStock;
    product.category = category;
    product.color = color;
    product.fabric = fabric;
    product.image = image;
    product.isActive = isActive;
    product.user = req.user._id;

    await product.save();

    return res.json({
      message: "Success",
    });
  } else {
    res.statusCode = 404;
    throw new Error("Product not found.");
  }
});
