const mongoose = require('mongoose');

const CropCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('CropCategory', CropCategorySchema);