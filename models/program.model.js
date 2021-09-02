const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProgramSchema = new mongoose.Schema({
    farmer: {
        type: Schema.Types.ObjectId,
        ref: 'Farmer'
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
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
        ref: 'Crop'
    },
    milestones: [{
        notifiedFarmer: {
            type: Boolean,
            default: false
        },
        daysFromStart: {
            type: Number,
            required: true
        },
        notificationStatus: {
            type: String,
            enum: {
                values: ['Not Due', 'Active', 'Overdue']
            },
            default: 'Not Due'
        },
        productApplications: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            perAcre: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                enum: {
                    values: ['lb', 'kg', 'l', 'gal', 'pack']
                }
            }
        }]
    }]
});

module.exports = mongoose.model('Program', ProgramSchema);