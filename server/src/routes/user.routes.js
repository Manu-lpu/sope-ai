const express = require("express");
const {
  getUserProfile,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/profile", getUserProfile);
router.post("/", createUser);
router.put("/profile", updateUser);
router.delete("/", deleteUser);

module.exports = router;
