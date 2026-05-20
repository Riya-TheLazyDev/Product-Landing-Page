import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { optionalAuth } from "../middleware/optionalAuthMiddleware.js";

const router = express.Router();

router.route("/")
  .get(optionalAuth, getProducts)
  .post(protect, authorize("admin"), createProduct);

router.route("/:id")
  .get(optionalAuth, getProductById)
  .put(protect, authorize("admin"), updateProduct)
  .delete(protect, authorize("admin"), deleteProduct);

export default router;
