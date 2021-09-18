const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProgramTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  crop: {
    type: Schema.Types.ObjectId,
    ref: 'Crop',
    required: true,
  },
  milestoneTemplates: [
    {
      daysFromStart: {
        type: Number,
        required: true,
      },
      productApplications: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          unit: {
            type: Schema.Types.ObjectId,
            ref: 'Unit',
            required: true,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model('ProgramTemplate', ProgramTemplateSchema);
