const express = require ("express")
const userRoute = express.Router()
const authJwt  =  require("../auth/authjwt")
const {signUp,logIn} =  require("../controllers/user")
const User =  require("../models/user")

userRoute.post("/login",logIn);
userRoute.post("/signup",signUp);
userRoute.get("/api/me", authJwt, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ name: user.name, email: user.email });
  } catch (err) {

    res.status(500).json({ message: "User not found" ,error:err.message});
  }
});

userRoute.get("/logout", (req, res) => {
     res.redirect("/");
  });
  
module.exports = userRoute;
