const express = require("express");
const router = express.Router();
const { register, login, profile } = require("../controllers/userController");
const { isUser } = require("../middlewares/authMiddleware");
const passport = require("../middlewares/passportMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  profile
);

module.exports = router;
