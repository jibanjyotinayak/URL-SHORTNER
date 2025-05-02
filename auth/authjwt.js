const jwt = require("jsonwebtoken");
require("dotenv");
const secretKey = process.env.SECRET_KEY_JWT;

const authJwt = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) {
      res.staus(401).json({ message: "token not provided" });
    }
    jwt.verify(token, secretKey, (err, data) => {
      if (err) {
        res.status(403).json({ error: "invalid token" });
      }

      req.data = data;
      next();
    });
  } catch (error) {}
};
