import express from "express";
import {
  getAdminOrders,
  updateAdminOrderStatus,
} from "../controllers/adminOrderController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, authorize("admin"), getAdminOrders);
router.put("/:id/status", protect, authorize("admin"), updateAdminOrderStatus);

export default router;
