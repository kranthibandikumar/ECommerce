const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");
require("dotenv").config();

// Controller for User Registration
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User already exists with the same email!",
      });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Controller for User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doen't exists! Please register first.",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Incorrect password! Please try again.",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        username: checkUser.username,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "User logged in successfully!",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        username: checkUser.username,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Controller for User Logout
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "User logged out successfully!",
  });
};

// User Authorization
const checkAuth = (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    message: "Authenticated User!",
    user,
  });
};

module.exports = { registerUser, loginUser, logoutUser, checkAuth };
