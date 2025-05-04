const express = require ("express")
const userRoute = express.Router()

const {signUp,logIn} =  require("../controllers/user")

userRoute.post("/login",logIn);
userRoute.post("/signup",signUp);
userRoute.get("/logout", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
  
module.exports = userRoute;
