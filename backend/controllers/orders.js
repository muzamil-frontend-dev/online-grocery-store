import Order from "../models/order.js";
import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import { updateCountInStock } from "./products.js";

// Path         /api/orders
// Type         Get
// Access       Private
// Desc         Create new order
export const getUserOrders = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const orders = await Order.find({ user });
  return res.json(orders);
});

// Path         /api/orders
// Type         Post
// Access       Private
// Desc         Create new order
export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    totalPrice,
    taxPrice,
    shippingPrice,
    itemsPrice,
    paymentType,
  } = req.body;

  const order = new Order({
    orderItems,
    shippingAddress,
    totalPrice,
    taxPrice,
    shippingPrice,
    itemsPrice,
    paymentType,
    user: req.user._id,
  });

  const createdOrder = await order.save();
  res.statusCode = 201;
  return res.json({ _id: createdOrder._id });
});

// Path         /api/orders/:id
// Type         GET
// Access       Private
// Desc         Get order by id
export const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate("user", "name email");
  if (
    order &&
    (order.user._id.toString() === req.user._id.toString() || req.user.isAdmin)
  ) {
    return res.json(order);
  } else {
    res.statusCode = 404;
    throw new Error("Order not found.");
  }
});

// Path         /api/orders/:id
// Type         Put
// Access       Private
// Desc         Pay order
export const payOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    res.statusCode = 404;
    throw new Error("Order not found.");
  }

  if (order.user.toString() !== req.user._id.toString()) {
    res.statusCode = 400;
    throw new Error("You do not have permission to pay this order.");
  }

  const paymentMethod = req.body;
  const stripe = new Stripe(
    "sk_test_51IutRpCcy8OEmYvUq77adzYjJTDLe8TJl5UW6eg99TzYWTfIofFKeY4G30I70p7ajKhlAuw8lXfCjgpRDxAyxZUX004L1dEEEP"
  );

  console.log(paymentMethod);

  await stripe.paymentIntents.create({
    payment_method: paymentMethod.id,
    confirm: true,
    amount: order.totalPrice * 100,
    currency: "PKR",
    description: `${order._id} : ${req.user.name} (${req.user.email}) purchased ${order.orderItems.length} product(s).`,
  });

  order.paymentMethod = paymentMethod;
  order.isPaid = true;
  order.paidAt = new Date();

  await order.save();

  order.orderItems.forEach(async (orderItem) => {
    await updateCountInStock(orderItem.product, orderItem.qty);
  });

  res.statusCode = 200;

  return res.json({
    message: "Order paid successfully",
  });
});

// Path         /admin/api/orders
// Type         Get
// Access       Private Admin only
// Desc         Get all orders
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  return res.json(orders);
});
