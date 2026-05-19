import express from "express";
import { getInventory, updateStock } from "../controllers/inventoryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, authorize("admin"), getInventory);

router.route("/:id/stock")
  .patch(protect, authorize("admin"), updateStock);

export default router;
