const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user");
const bCrypt=require('bcrypt')
const JWT=require('jsonwebtoken')

// GET Method: Render the register form
router.get("/register", (req, res) => {
  res.render("register");
});

// POST Method: Create User with validation
//Done With Register Page
router.post(
  "/register",
  [
    body("username").trim().isLength({ min: 5 }).withMessage("min length should be 5"),
    body("email").trim().isEmail().withMessage("Invalid email").isLength({ min: 10 }),
    body("password").trim().isLength({ min: 5 }).withMessage("min length should be 5"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
      
    }

    
      const { username,  email, password } = req.body;
//For Decrypt the Password we need to use bcrypt package, 10 ->round for security and performance.
const cryptedPassword=await bCrypt.hash(password,10);
// :cryptedPassword
      const newUser = await userModel.create({ username,  email, password });
      res.json(newUser);
    
  }
);


// Login page
router.get('/login', (req, res) => {
  res.render("login");
});
router.post('/login', [
  body("username").trim().notEmpty().withMessage("Username or email is required"),
  body("password").trim().isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
], async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    console.log("Validation Error:", error.array());
    return res.status(400).json({
      error: error.array(),
    });
  }

  const { username, password } = req.body;
  console.log("Login Request:", { username, password });

  try {
    const user = await userModel.findOne({
      $or: [{ username }, { email: username }],
    });

    console.log("User Found:", user);

    if (!user) {
      return res.status(400).json({
        message: 'Username or Password is Incorrect',
      });
    }

    const isValidPass = await bCrypt.compare(password, user.password);
    console.log("Password Match:", isValidPass);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Username or Password is Incorrect',
      });
    }

    const token = JWT.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("Token Generated:", token);

    return res.json({ token });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
 