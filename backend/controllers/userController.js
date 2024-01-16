const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// register user
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check required fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if user exists
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error(
      `Name <b>${name}</b> and email <b>${email}</b> already taken`
    );
  }

  // create user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    req.session.userId = user.id;

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// login user
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.isValidPassword(password))) {
    req.session.userId = user.id;

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// logout
const logout = asyncHandler(async (req, res) => {
  if (req.session.userId) {
    req.session.destroy();
  }
  res.status(200).json({
    msg: "logout successfully",
  });
});

// profile
const profile = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

const users = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
});

module.exports = {
  register,
  login,
  logout,
  profile,
  users,
};
