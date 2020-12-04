const jwt = require("jsonwebtoken");
const config = require("config");

exports.isSignedIn = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, config.get("jwtSecret"), (err, user) => {
    if (err) return res.status(401).send("access denied");
    req.user = user;
    next();
  });
};
