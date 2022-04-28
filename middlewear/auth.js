
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "interview_SecretKEY", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateAccessToken(username) {
  return jwt.sign({ data: username }, "interview_SecretKEY", {
    expiresIn: "2h"
  });
}

module.exports = {
  authenticateToken,
  generateAccessToken,
};
