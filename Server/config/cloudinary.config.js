const cloudinary = require("cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
  cloud_name: "products",
  api_key: "814431111221389",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
