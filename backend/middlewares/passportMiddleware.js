const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(
    options,
    asyncHandler(async (payload, next) => {
      try {
        const user = await User.findById(payload._id).select("-password");

        if (!user) {
          return next(null, false);
        }

        return next(null, user);
      } catch (error) {
        return next(error, false);
      }
    })
  )
);

module.exports = passport;
