const express = require("express");
const app = express();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv");
const { signUpSchema, loginSchema } = require("../validations/uservalidation");
const secretKey = process.env.SECRET_KEY_JWT;
const bcrypt = require("bcrypt");
const session =  require("express-session")
//signup User
async function signUp(req, res) {
  //validation using joi
  try {
    const newUser = req.body;
    const { error, value } = signUpSchema.validate(newUser);
    if (error) {
      return res.status(400).json({ messgae: error.details[0].message });
    }

    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) return res.status(200).json({ message: "user exists" });

    const user = new User(value);
    await user.save();
    const token = jwt.sign({ id: user._id }, secretKey, {
      expiresIn: "5h",
    });

    res.status(201).json({
      message: "user successfuly registered ",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
}
//login functanlity
async function logIn(req, res) {
  try {
    const logInData = req.body;
    const { error, value } = loginSchema.validate(logInData);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ email: value.email }).select("+password");
    if (!user) {
      return res.status(400).send("Please provide a registered email.");
    }

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      return res.status(401).send("Kindly provide a valid password.");
    }

    // ✅ Only set session after validation succeeds
    req.session.user = { id: user._id, email: user.email };

    // ✅ Optional: generate token if needed
    // const jwtToken = jwt.sign({ id: user._id }, secretKey, { expiresIn: "5h" });

    // ✅ Redirect to user dashboard
    return res.redirect("/user");

  } catch (error) {
    res.status(500).send("Something went wrong: " + error.message);
  }
}




module.exports = { logIn, signUp };
//dashboard
// async function getdashboard(req,res){

// try {
//   const user  =
// } catch (error) {

// }

// }
