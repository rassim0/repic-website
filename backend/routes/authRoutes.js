const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { login, addUser, deleteUser } = require("../controllers/authController");

// Public login
router.post("/login", login);

// Admin-only
router.post("/add", auth.adminOnly, addUser);
router.delete("/delete/:id", auth.adminOnly, deleteUser);

module.exports = router;

