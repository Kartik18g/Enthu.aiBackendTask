const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const { generateThumbnail } = require("../controllers/thumbnail");
// middle to verify JWT
const { isSignedIn } = require("../middleware/index");

router.post(
  "/createthumbnail",
  [check("imageUrl", "Enter an image URL").notEmpty()],
  isSignedIn,
  generateThumbnail
);

module.exports = router;
