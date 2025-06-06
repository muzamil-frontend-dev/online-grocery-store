import User from "../models/user.js";
import asyncHandler from "express-async-handler";
// Path         /api/auth/login
// Type         Post
// Access       Public
// Desc         Login existing user
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.statusCode = 400;
    throw new Error("Invalid email or password.");
  }

  if (!(await user.ValidatePassword(password))) {
    res.statusCode = 400;
    throw new Error("Invalid email or password.");
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: user.CreateToken(),
  });
});

// Path         /api/auth/register
// Type         Post
// Access       Public
// Desc         Register new user
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({
    name,
    email,
    password,
  });

  const createdUser = await user.save();
  res.json({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
    token: createdUser.CreateToken(),
  });
});
