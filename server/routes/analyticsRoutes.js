import express from "express";
import { getAnalyticsData } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, authorize("admin"), getAnalyticsData);

export default router;
