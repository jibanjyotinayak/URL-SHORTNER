const mongoose =  require("mongoose")
require("dotenv").config();
const uri =  "mongodb+srv://jibanjyoti:5AocBQjbE1Ny6tbp@shorturl.i6pugtb.mongodb.net/shortUrl?retryWrites=true&w=majority&appName=shortUrl";
// mongoose.connect(process.env.MONGODB_URI)
mongoose.connect(uri)

  .then(() => console.log("MongoDB connected with Mongoose"))
  .catch((err) => console.error("MongoDB connection error:", err));

 module.exports = mongoose;
