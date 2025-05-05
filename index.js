const express = require("express");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = 8000;

// MongoDB connection (assumes connect.js handles this)
require("./connect");
// Routes
const userRoute = require("./routes/user");
const urlRoute = require("./routes/url");
const secretkey = process.env.SECRET_KEY_JWT;
const authJwt = require("./auth/authjwt"); // adjust path if needed


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
//  Public HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});
app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});
app.get("/api/me", authJwt, (req, res) => {
  return res.json({ name:req.user.name,email: req.user.email });
});
app.use("/", userRoute);
// Routes for short URL (prefixed to avoid conflicts)
app.use("/u", urlRoute); // Only handles /u/:shortId
app.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "public/private/user.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
