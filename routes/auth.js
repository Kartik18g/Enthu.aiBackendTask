const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { signup, signin } = require("../controllers/auth");

router.post(
  "/login",
  [
    check("username", "username is required").notEmpty(),
    check("password", "Password field is required").isLength({
      min: 1,
    }),
  ],
  signin
);

module.exports = router;
