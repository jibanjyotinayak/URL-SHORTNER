const express = require ("express")
const userRoute = express.Router()

const {signUp,logIn} =  require("../controllers/user")

userRoute.post("/login",logIn);
userRoute.post("/signup",signUp);

module.exports = userRoute;
