const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
  
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    minlength: [5, "Email must be at least 5 characters long"], // Updated minimum length
    validate: {
      validator: function(v) {
        return /\S+@\S+\.\S+/.test(v); // Basic email validation
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, "Password must be at least 5 characters long"], // Updated minimum length
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
