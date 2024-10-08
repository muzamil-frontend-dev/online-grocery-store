import express from "express";
import { getPromotions } from "../controllers/promotions.js";

const router = express.Router();

router.get("/promotions", getPromotions);

export default router;
