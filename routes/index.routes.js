const express = require('express');
const router = express.Router();
const multer = require('multer');
const { ID } = require('node-appwrite');
const { uploadFile } = require('../config/appwrite');

const upload = multer();


router.get('/home',(req,res)=>{
    res.render('home')
})


router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        const bucketId = '676c545e00125217215b';
        const fileId = ID.unique();
        
        const fileData = new File(
            [req.file.buffer],
            req.file.originalname,
            { type: req.file.mimetype }
        );

        const result = await uploadFile(bucketId, fileId, fileData);

        res.json({
            fileId: result.$id,
            fileName: req.file.originalname,
            fileSize: req.file.size,
            mimeType: req.file.mimetype
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            error: 'Error uploading file',
            details: error.message
        });
    }
});

module.exports = router;