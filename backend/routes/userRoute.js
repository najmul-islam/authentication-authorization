const express = require("express");
const router = express.Router();
const {
  register,
  login,
  profile,
  users,
} = require("../controllers/userController");
const { isUser } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", isUser, profile);
router.get("/users", users);

module.exports = router;
