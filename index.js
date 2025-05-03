const express = require("express");
const app = express();
const PORT = 8000;
const mongoose = require ('mongoose')
const db = require("./connect");
const urlroute = require ('./routes/url')
const URL = require('./models/url')
const userRoute =  require("./routes/user");




app.use(express.json())
app.use('/',urlroute)
app.use('/',userRoute);
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})


