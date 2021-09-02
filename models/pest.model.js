const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PestSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'PestCategory'
    },
    imageUrl: {
        type: String
    },
    crops: [{
        type: Schema.Types.ObjectId,
        ref: 'Crop'
    }]
});

module.exports = mongoose.model('Pest', PestSchema);