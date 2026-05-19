import dotenv from "dotenv";

dotenv.config();

export const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || "placeholder",
  apiKey: process.env.CLOUDINARY_API_KEY || "placeholder",
  apiSecret: process.env.CLOUDINARY_API_SECRET || "placeholder",
};

console.log("Cloudinary cloud credentials initialised");
export default cloudinaryConfig;
