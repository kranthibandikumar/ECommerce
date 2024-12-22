const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db.config");
const authRouter = require("./routes/auth/auth.routes");
const adminProductsRouter = require("./routes/admin/products.routes");
const shopProductsRouter = require("./routes/shop/products.routes");
const shopCartRouter = require("./routes/shop/cart.routes");
require("dotenv").config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
