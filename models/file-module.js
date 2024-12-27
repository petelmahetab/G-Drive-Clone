const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: [true, 'Path is Required'],
    },
    originalname: {
        type: String,
        required: [true, 'Original Name is Required'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Ensure the 'users' collection exists
        required: [true, 'User is Required'],
    },
});

const File = mongoose.model('File', fileSchema); // Ensure the model name is 'File'
module.exports = File; // Export the model
