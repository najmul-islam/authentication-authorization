const asyncHanlder = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// check user

const isUser = asyncHanlder(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      // get token header

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get form the token
      req.user = await User.findById(decoded._id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { isUser };
