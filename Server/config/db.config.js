const mongoose = require("mongoose");
require("dotenv").config();

// Database connection
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_CONNECTION_STR)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.error("Error:", error));
};

module.exports = connectDB;
