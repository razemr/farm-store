const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProgramSchema = new mongoose.Schema({
    farmer: {
        type: Schema.Types.ObjectId,
        ref: 'Farmer',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    crop: {
        type: Schema.Types.ObjectId,
        ref: 'Crop',
        required: true
    },
    milestones: [{
        notifiedFarmer: {
            type: Boolean,
            default: false
        },
        date: {
            type: Date,
            required: true
        },
        notificationStatus: {
            type: String,
            enum: {
                values: ['Not Due', 'Active', 'Overdue']
            },
            default: 'Not Due',
            required: true
        },
        productApplications: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                enum: {
                    values: ['lb', 'kg', 'l', 'gal', 'pack']
                },
                required: true
            }
        }]
    }]
});

module.exports = mongoose.model('Program', ProgramSchema);