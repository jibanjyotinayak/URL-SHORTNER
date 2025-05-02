const express = require("express");
const app = express();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv");
const { signUpSchema, loginSchema } = require("../validations/uservalidation");
const secretKey = process.env.SECRET_KEY_JWT;
const bcrypt = require("bcrypt");

//signup User
module.exports = async function signUp(req, res) {
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
    const token = jwt.sign({ id: user._id }, SECRET_KEY_JWT, {
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
};
//login functanlity
module.exports = async function logIn(req, res) {
  const logInData = req.body;
  const { error, value } = logInData;
  if (error) {
    return res.status(500).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ email: value.email }).select('+password');
  if (!user)
    return res
      .status(400)
      .json({ message: "please provide resgistered email" });

  const isMatch = await bcrypt.compare(value.password, user.password);
};
