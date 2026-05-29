import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { clearMedia, getMedia, getMediaBySection, updateMedia, uploadMedia } from "../controllers/mediaController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "..", "uploads", "media");

fs.mkdirSync(uploadDir, { recursive: true });

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
]);

const allowedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".mp4", ".webm"]);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, safeName);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedMimeTypes.has(file.mimetype) || !allowedExtensions.has(ext)) {
    return cb(new Error("Only JPG, PNG, WEBP, MP4, and WEBM files are supported"));
  }
  return cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,
    files: 1,
  },
});

const handleUpload = (req, res, next) => {
  upload.single("media")(req, res, (error) => {
    if (!error) return next();

    const message =
      error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE"
        ? "Media file is too large. Maximum upload size is 50MB."
        : error.message || "Media upload failed";

    return res.status(400).json({ success: false, error: message });
  });
};

const router = express.Router();

router.get("/", getMedia);
router.get("/:section", getMediaBySection);
router.post("/upload", protect, authorize("admin"), handleUpload, uploadMedia);
router.put("/:id", protect, authorize("admin"), handleUpload, updateMedia);
router.delete("/:id", protect, authorize("admin"), clearMedia);

export default router;
