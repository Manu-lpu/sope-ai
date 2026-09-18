const express = require("express");

const {
  createSopVersion,
  getSopVersions,
  getSopVersionById,
  updateSopVersion,
  deleteSopVersion,
} = require("../controllers/sopVersion.controller");

const router = express.Router();

router.post("/", createSopVersion);
router.get("/", getSopVersions);
router.get("/:id", getSopVersionById);
router.put("/:id", updateSopVersion);
router.delete("/:id", deleteSopVersion);

module.exports = router;
