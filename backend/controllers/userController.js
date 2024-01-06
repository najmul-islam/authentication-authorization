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
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: user.generateToken(),
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
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: user.generateToken(),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// profile
const profile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

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
  profile,
  users,
};
