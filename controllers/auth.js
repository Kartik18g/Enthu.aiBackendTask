const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

exports.signin = async (req, res) => {
  // validating the fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const payload = req.body;
  // Mock authentication so , therefore assuming user is authenticated and returning a jwt

  const authToken = jwt.sign(payload, config.get("jwtSecret"), {
    expiresIn: 360000,
  });
  res.json({ authToken });
};
