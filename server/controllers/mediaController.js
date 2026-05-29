import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../config/db.js";
import { MEDIA_SECTION_KEYS, MEDIA_SECTIONS } from "../config/mediaSections.js";
import { sendError, sendSuccess } from "../utils/responseHelper.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mediaUploadDir = path.join(__dirname, "..", "uploads", "media");

const toPublicUrl = (file) => `/uploads/media/${file.filename}`;

const getMediaType = (file) => {
  if (file.mimetype.startsWith("image/")) return "image";
  if (file.mimetype.startsWith("video/")) return "video";
  return null;
};

const normalizeMedia = (row) => ({
  id: row.id,
  section_key: row.section_key,
  title: row.title,
  media_type: row.media_type,
  media_url: row.media_url,
  quote_text: row.quote_text,
  quote_author: row.quote_author,
  created_at: row.created_at,
  updated_at: row.updated_at,
});

const removeUploadedFile = (mediaUrl) => {
  if (!mediaUrl || !mediaUrl.startsWith("/uploads/media/")) return;

  const filename = path.basename(mediaUrl);
  const filePath = path.join(mediaUploadDir, filename);
  fs.promises.unlink(filePath).catch(() => undefined);
};

const ensureSectionRows = async () => {
  const activeSectionKeys = MEDIA_SECTIONS.map((section) => section.section_key);
  const [removedRows] = await pool.query(
    `SELECT section_key, media_url FROM media_assets WHERE section_key NOT IN (${activeSectionKeys.map(() => "?").join(", ")})`,
    activeSectionKeys
  );

  for (const row of removedRows) {
    removeUploadedFile(row.media_url);
    await pool.query("DELETE FROM media_assets WHERE section_key = ?", [row.section_key]);
  }

  for (const section of MEDIA_SECTIONS) {
    await pool.query(
      `INSERT INTO media_assets (section_key, title, media_type, media_url, quote_text, quote_author)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         title = VALUES(title),
         media_type = COALESCE(media_type, VALUES(media_type)),
         media_url = COALESCE(media_url, VALUES(media_url)),
         quote_text = COALESCE(quote_text, VALUES(quote_text)),
         quote_author = COALESCE(quote_author, VALUES(quote_author))`,
      [
        section.section_key,
        section.title,
        section.media_type,
        section.media_url,
        section.quote_text || null,
        section.quote_author || null,
      ]
    );
  }
};

export const getMedia = async (req, res) => {
  try {
    await ensureSectionRows();
    const [rows] = await pool.query(
      "SELECT id, section_key, title, media_type, media_url, quote_text, quote_author, created_at, updated_at FROM media_assets ORDER BY id ASC"
    );

    return sendSuccess(res, rows.map(normalizeMedia), "Media assets retrieved successfully");
  } catch (error) {
    console.error("GetMedia database error:", error.message);
    return sendError(res, "Failed to retrieve media assets", 500);
  }
};

export const getMediaBySection = async (req, res) => {
  try {
    const { section } = req.params;
    console.log("MEDIA_SECTION_KEYS:", MEDIA_SECTION_KEYS);
    console.log("Received section_key:", req.body.section_key);
    console.log("Valid sections:", MEDIA_SECTION_KEYS);
    if (!MEDIA_SECTION_KEYS.includes(section)) {
      return sendError(res, "Unknown media section", 404);
    }

    await ensureSectionRows();
    const [rows] = await pool.query(
      "SELECT id, section_key, title, media_type, media_url, quote_text, quote_author, created_at, updated_at FROM media_assets WHERE section_key = ? LIMIT 1",
      [section]
    );

    return sendSuccess(res, normalizeMedia(rows[0]), "Media asset retrieved successfully");
  } catch (error) {
    console.error("GetMediaBySection database error:", error.message);
    return sendError(res, "Failed to retrieve media asset", 500);
  }
};

export const uploadMedia = async (req, res) => {
  try {
    const { section_key } = req.body;

    console.log("Received section_key:", section_key);
    console.log("Runtime MEDIA_SECTION_KEYS:", MEDIA_SECTION_KEYS);
    if (!MEDIA_SECTION_KEYS.includes(section_key)) {
      if (req.file) removeUploadedFile(toPublicUrl(req.file));
      return sendError(res, "Please select a valid media section", 400);
    }


    if (!req.file) {
      return sendError(res, "Please upload an image or video file", 400);
    }

    const mediaType = getMediaType(req.file);
    if (!mediaType) {
      removeUploadedFile(toPublicUrl(req.file));
      return sendError(res, "Unsupported media type", 400);
    }

    await ensureSectionRows();
    const [existingRows] = await pool.query(
      "SELECT id, media_url FROM media_assets WHERE section_key = ? LIMIT 1",
      [section_key]
    );
    const existing = existingRows[0];
    const mediaUrl = toPublicUrl(req.file);

    const quoteText = req.body.quote_text !== undefined ? req.body.quote_text.trim() || null : undefined;
    const quoteAuthor = req.body.quote_author !== undefined ? req.body.quote_author.trim() || null : undefined;
    const fields = ["media_type = ?", "media_url = ?"];
    const params = [mediaType, mediaUrl];

    if (quoteText !== undefined) {
      fields.push("quote_text = ?");
      params.push(quoteText);
    }

    if (quoteAuthor !== undefined) {
      fields.push("quote_author = ?");
      params.push(quoteAuthor);
    }

    params.push(section_key);
    await pool.query(`UPDATE media_assets SET ${fields.join(", ")} WHERE section_key = ?`, params);

    if (existing?.media_url && existing.media_url !== mediaUrl) {
      removeUploadedFile(existing.media_url);
    }

    const [freshRows] = await pool.query(
      "SELECT id, section_key, title, media_type, media_url, quote_text, quote_author, created_at, updated_at FROM media_assets WHERE section_key = ? LIMIT 1",
      [section_key]
    );

    return sendSuccess(res, normalizeMedia(freshRows[0]), "Media uploaded successfully", 201);
  } catch (error) {
    if (req.file) removeUploadedFile(toPublicUrl(req.file));
    console.error("UploadMedia database error:", error.message);
    return sendError(res, "Failed to upload media", 500);
  }
};

export const updateMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const [existingRows] = await pool.query(
      "SELECT id, section_key, title, media_url FROM media_assets WHERE id = ? LIMIT 1",
      [id]
    );
    const existing = existingRows[0];

    if (!existing) {
      if (req.file) removeUploadedFile(toPublicUrl(req.file));
      return sendError(res, "Media asset not found", 404);
    }

    const updates = [];
    const params = [];

    if (req.body.title && req.body.title.trim()) {
      updates.push("title = ?");
      params.push(req.body.title.trim());
    }

    if (req.body.quote_text !== undefined) {
      updates.push("quote_text = ?");
      params.push(req.body.quote_text.trim() || null);
    }

    if (req.body.quote_author !== undefined) {
      updates.push("quote_author = ?");
      params.push(req.body.quote_author.trim() || null);
    }

    if (req.file) {
      const mediaType = getMediaType(req.file);
      if (!mediaType) {
        removeUploadedFile(toPublicUrl(req.file));
        return sendError(res, "Unsupported media type", 400);
      }
      updates.push("media_type = ?", "media_url = ?");
      params.push(mediaType, toPublicUrl(req.file));
    }

    if (updates.length === 0) {
      return sendError(res, "No valid media updates provided", 400);
    }

    params.push(id);
    await pool.query(`UPDATE media_assets SET ${updates.join(", ")} WHERE id = ?`, params);

    if (req.file && existing.media_url) {
      removeUploadedFile(existing.media_url);
    }

    const [freshRows] = await pool.query(
      "SELECT id, section_key, title, media_type, media_url, quote_text, quote_author, created_at, updated_at FROM media_assets WHERE id = ? LIMIT 1",
      [id]
    );

    return sendSuccess(res, normalizeMedia(freshRows[0]), "Media asset updated successfully");
  } catch (error) {
    if (req.file) removeUploadedFile(toPublicUrl(req.file));
    console.error("UpdateMedia database error:", error.message);
    return sendError(res, "Failed to update media asset", 500);
  }
};

export const clearMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const [existingRows] = await pool.query(
      "SELECT id, section_key, title, media_url FROM media_assets WHERE id = ? LIMIT 1",
      [id]
    );
    const existing = existingRows[0];

    if (!existing) {
      return sendError(res, "Media asset not found", 404);
    }

    await pool.query("UPDATE media_assets SET media_type = NULL, media_url = NULL WHERE id = ?", [id]);

    if (existing.media_url) {
      removeUploadedFile(existing.media_url);
    }

    const [freshRows] = await pool.query(
      "SELECT id, section_key, title, media_type, media_url, quote_text, quote_author, created_at, updated_at FROM media_assets WHERE id = ? LIMIT 1",
      [id]
    );

    return sendSuccess(res, normalizeMedia(freshRows[0]), "Media asset removed successfully");
  } catch (error) {
    console.error("ClearMedia database error:", error.message);
    return sendError(res, "Failed to remove media asset", 500);
  }
};
