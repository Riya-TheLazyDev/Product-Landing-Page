import { sendSuccess } from "../utils/responseHelper.js";

const mockBlogs = [
  { id: "alchemy-of-scents", title: "The Alchemy of Scents", author: "Julian Thorne" },
  { id: "liquid-gold", title: "Liquid Gold: Botanical Extracts", author: "Elena Vance" },
];

export const getBlogs = async (req, res) => {
  return sendSuccess(res, mockBlogs, "Blogs retrieved successfully");
};

export const getBlogBySlug = async (req, res) => {
  const { slug } = req.params;
  const found = mockBlogs.find((b) => b.id === slug);
  if (found) {
    return sendSuccess(res, found, "Blog post found");
  }
  return sendSuccess(res, mockBlogs[0], "Fall-back blog post returned");
};

export const createBlog = async (req, res) => {
  const newBlog = {
    id: Date.now().toString(),
    ...req.body,
  };
  return sendSuccess(res, newBlog, "Blog created successfully", 21);
};
