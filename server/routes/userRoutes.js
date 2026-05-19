import express from "express";
import { getCustomers, updateCustomerStatus } from "../controllers/customerController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, authorize("admin"), getCustomers);

router.route("/:id/status")
  .patch(protect, authorize("admin"), updateCustomerStatus);

export default router;
