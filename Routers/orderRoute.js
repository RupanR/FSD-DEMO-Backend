import express from "express";
import { authMiddleware } from "../Middlewares/authMiddleware.js";
import {
  getAllOrders,
  getMyOrders,
  placeOrder,
  updateOrderStatus,
} from "../Controllers/orderController.js";
import { adminMiddleware } from "../Middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, placeOrder);
router.get("/myorders", authMiddleware, getMyOrders);
router.get("/allorders", adminMiddleware, getAllOrders);
router.put("/update/:id", adminMiddleware, updateOrderStatus);

export default router;
