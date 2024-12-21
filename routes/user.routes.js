const express = require("express");
const router = express.Router();
const {body,validationResult}=require('express-validator')
const userModel=require('../models/user') 
// GET Method: Render the register form
router.get("/register", (req, res) => {
  res.render("register");
});



/*Validation
trim() removing White spaces.s
*/ 
//POST Method : Create User
router.post("/register",
  body('username').trim().isLength({max:5}),//Those are Third Party MiddleWare's
  body('lastname').trim().isLength({max:4}),
  body('email').trim().isEmail().isLength({min:10}),
  body('password').trim().isLength({max:5}),
  async (req,res)=>{
    const error=validationResult(req)
    //If error not Empty
    if(!error.isEmpty){
      return res.status(400).json({
         errors:error.array(),
         message:"Invalid Data"
      })
    }
    const { username, lastname, email, password } = req.body;
    const newUser = await userModel.create({
      username,
      lastname,
      email,
      password,
    });
    res.json(newUser);
})

module.exports = router;
