import express from "express";
import { getBlogs, getBlogBySlug, createBlog } from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getBlogs)
  .post(protect, authorize("admin"), createBlog);

router.route("/:slug")
  .get(getBlogBySlug);

export default router;
