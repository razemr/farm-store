const mongoose = require('mongoose');

const PestCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('PestCategory', PestCategorySchema);