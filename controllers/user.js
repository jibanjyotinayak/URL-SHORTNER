const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // ✅ Load env variables
const { signUpSchema, loginSchema } = require("../validations/uservalidation");
const bcrypt = require("bcrypt");
const { eventNames } = require("../models/url");

// Signup User
async function signUp(req, res) {
  try {
    const { error, value } = signUpSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) return res.status(409).json({ message: "User already exists" });

    const user = new User(value);
    await user.save();

 
     const token = jwt.sign({name:user.name, email: user.email }, process.env.SECRET_KEY_JWT, { expiresIn: "5h" });
     return res.status(201).json({ message: "Registered", token });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// Login functionality
async function logIn(req, res) {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ email: value.email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });
    const jwtToken  =  jwt.sign({ name:user.name,email: user.email }, process.env.SECRET_KEY_JWT, { expiresIn: "5h" })
    if (!jwtToken){
      return res.status(500).json({message:"jwt Token not found"})
    }
    return res.status(200).json({ message: "Login successful", token: jwtToken });

    //return res.redirect("/user");

  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}

module.exports = { logIn, signUp };
