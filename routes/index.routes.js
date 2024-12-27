const express = require('express');
const router = express.Router();
const multer = require('multer');
const fileModel = require('../models/file-module'); // Ensure correct path
const middlewareLogin=require('../middlewares/auth') // Ensure correct import
const upload = multer();


// // Home route with authentication middleware
router.get('/home', middlewareLogin, (req, res) => {
    res.render('home');
});
router.post('/upload', middlewareLogin, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const newFile = new fileModel({
            path: req.file.path,
            originalname: req.file.originalname,
            user: req.user.userId,
        });

        // Save the new file
        await newFile.save();

        res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
        console.log('Error:', error); // Log the error for better debugging
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
});


module.exports = router;
