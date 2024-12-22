const express = require("express");
const { upload } = require("../../config/cloudinary.config");
const {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  updateProduct,
  deleteProduct,
} = require("../../controllers/admin/products.controller");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.get("/get", fetchAllProducts);
router.put("/edit/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
