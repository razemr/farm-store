const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const regex = require('../utils/regex');

const RadaExtensionSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    parish: {
        type: Schema.Types.ObjectId,
        ref: 'Parish'
    },
    officer: {
        type: String
    },
    officerPhoneNumbers: [{
        type: String,
        validate: {
            validator: (v) => {
                return regex.phoneRegex.test(v)
            }
        }
    }],
    officerEmailAddress: {
        type: String,
        validate: {
            validator: (v) => {
                return regex.emailRegex.test(v)
            }
        }
    }
});

module.exports = mongoose.model('RadaExtension', RadaExtensionSchema);