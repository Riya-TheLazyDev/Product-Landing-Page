import express from "express";
import { getReviews, updateReviewStatus, submitReview } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getReviews)
  .post(protect, submitReview);

router.route("/:id/status")
  .patch(protect, authorize("admin"), updateReviewStatus);

export default router;
