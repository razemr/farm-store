const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FarmerSchema = new mongoose.Schema({
    firstName: {
        type: string,
        trim: true,
        required: true
    },
    lastName: {
        type: string,
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
        type: string
    },
    farmGps: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
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