const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const regex = require('../utils/regex');

const FarmerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    phoneNumbers: [{
        type: String,
        validate: {
            validator: (v) => {
                return regex.phoneRegex.test(v)
            }
        }
    }],
    emailAddress: {
        type: String,
        unique: true,
        validate: {
            validator: (v) => {
                return regex.emailRegex.test(v)
            }
        }
    },
    parish: {
        type: Schema.Types.ObjectId,
        ref: 'Parish'
    },
    radaExtension: {
        type: Schema.Types.ObjectId,
        ref: 'RadaExtension'
    },
    address: {
        type: String
    },
    farmGps: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number]
        }
    },
    crops: [{
        type: Schema.Types.ObjectId,
        ref: 'Crop'
    }],
    programs: [{
        type: Schema.Types.ObjectId,
        ref: 'Program'
    }]
});

module.exports = mongoose.model('Farmer', FarmerSchema)