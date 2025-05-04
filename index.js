const express = require("express");
const session = require("express-session")
const app = express();
const PORT = 8000;
const mongoose = require ('mongoose')
const db = require("./connect");
const urlRoute = require ('./routes/url')
const URL = require('./models/url')
const userRoute =  require("./routes/user");
require("dotenv")
const secretkey = process.env.SECRET_KEY_JWT

const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware


// Serve static files
app.use(express.static(path.join(__dirname, "public")));

//Show homepage or redirect to login
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home.html")); // Always serve home.html
  });
  app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup.html"));
  });// Always serve home.html

  app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
  });
  app.use(session({
    secret: secretkey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour
    }
  }));
  app.get("/user", (req, res) => {
    if (!req.session.user) {
      return res.redirect("/login");
    }
    res.sendFile(path.join(__dirname, "private", "user.html")); // move user.html to another folder
  });
  
// Rotes
app.use("/", userRoute);
app.use("/", urlRoute);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})


