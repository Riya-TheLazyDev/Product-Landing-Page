import express from "express";
import { getReturns, updateReturnStatus } from "../controllers/returnController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, authorize("admin"), getReturns);

router.route("/:id/status")
  .patch(protect, authorize("admin"), updateReturnStatus);

export default router;
