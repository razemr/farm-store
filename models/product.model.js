const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'ProductCategory',
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Product', ProductSchema);