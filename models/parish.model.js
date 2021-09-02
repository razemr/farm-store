const mongoose = require('mongoose');

const ParishSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Parish', ParishSchema);