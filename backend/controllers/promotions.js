import asyncHandler from "express-async-handler";
import Promotion from "../models/promotion.js";

// Path         /api/promotions
// Type         Get
// Access       Public
// Desc         Get All Promotions data
export const getPromotions = asyncHandler(async (req, res) => {
  const promotions = await Promotion.find({});
  return res.json(promotions);
});
