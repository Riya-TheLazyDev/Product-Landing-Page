import express from "express";
import {
  getOrders,
  createOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getOrders)
  .post(protect, createOrder);

router.route("/:id/status")
  .patch(protect, authorize("admin"), updateOrderStatus);

export default router;
