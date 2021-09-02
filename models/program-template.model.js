const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProgramTemplateSchema = new mongoose.Schema({
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
    milestoneTemplates: [{
        daysFromStart: {
            type: Number,
            required: true
        },
        productApplications: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            perAcreDosage: {
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

module.exports = mongoose.model('ProgramTemplate', ProgramTemplateSchema);