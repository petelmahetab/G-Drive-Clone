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

      const newUser = await userModel.create({ username,  email, password:cryptedPassword });
      res.json(newUser);
    
  }
);























// Login page
router.get('/login', (req, res) => {
  res.render("login");
});

router.post('/login', [
  body("username").trim().isEmail().withMessage("Invalid email").isLength({ min: 10 }),
  body("password").trim().isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
], async (req, res) => {

  const error = validationResult(req);

  // If email and pass not valid
  if (!error.isEmpty()) {  // Fixed here: added parentheses after isEmpty
    return res.status(400).json({
      error: error.array()
    });
  }

  // Extract data input
  const { username, password } = req.body;
  const encrypPass = await bCrypt.hash(password, 10);

  // First, we check if the username is present or not in DB using findOne() method.
  const user = await userModel.findOne({
    username: username,
  });

  if (!user) {
    return res.status(400).json({
      message: 'Username or Password is Incorrect'
    });
  }

  // Check the bcrypt password using compare Method 2 parameters: req.body and hashpassword and compare them.
  const isValidPass = await bCrypt.compare(password, user.password);
  if (!isValidPass) {
    return res.status(400).json({
      message: 'Username or Password is Incorrect'
    });
  }

  // If password matches, then we generate the TOKEN using jsonwebtoken
  const token = JWT.sign({
    userId: user._id,
  }, process.env.JWT_SECRET, { expiresIn: '1h' }); // You can add expiration time for the token

  res.json({
    token
  });
});

module.exports = router;
 