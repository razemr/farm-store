const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CropSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'CropCategory'
    },
    imageUrl: {
        type: String
    },
    pests: [{
        type: Schema.Types.ObjectId,
        ref: 'Pest'
    }]
});

module.exports = mongoose.model('Crop', CropSchema);