const jwt = require("jsonwebtoken");
require("dotenv").config(); // ✅ Ensure environment variables are loaded

const secretKey = process.env.SECRET_KEY_JWT;

const authJwt = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }

      req.user = decoded; // ✅ Attach decoded token to req.user
      next(); // ✅ Proceed to next middleware
    });
  } catch (error) {
    return res.status(500).json({ message: "Authentication failed", error: error.message });
  }
};

module.exports = authJwt;
