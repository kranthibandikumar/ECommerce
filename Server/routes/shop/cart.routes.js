const express = require("express");
const {
  addToCart,
  fetchCartItems,
  updateCartItemQty,
  deleteCartItem,
} = require("../../controllers/shop/cart.controller");

const router = express.Router();

router.post("/add", addToCart);
router.put("/update-cart", updateCartItemQty);
router.get("/get/:userId", fetchCartItems);
router.delete("/:userId/:productId", deleteCartItem);

module.exports = router;
