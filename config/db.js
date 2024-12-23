const mongoose = require("mongoose");

const dbConnect = () => {
  const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase";

  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
 
};

module.exports = dbConnect;