const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MilestoneSchema = new mongoose.Schema({
  program: {
    type: Schema.Types.ObjectId,
    ref: 'Program',
  },
  farmer: {
    type: Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true,
  },
  farmerName: {
    type: String,
    required: true,
  },
  crop: {
    type: Schema.Types.ObjectId,
    ref: 'Crop',
    required: true,
  },
  cropName: {
    type: String,
    required: true,
  },
  parish: {
    type: Schema.Types.ObjectId,
    ref: 'Parish',
    required: true,
  },
  parishName: {
    type: String,
    required: true,
  },
  radaExtension: {
    type: Schema.Types.ObjectId,
    ref: 'RadaExtension',
    required: true,
  },
  radaExtensionName: {
    type: String,
    required: true,
  },
  notifiedFarmer: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
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
});

module.exports = mongoose.model('Milestone', MilestoneSchema);
