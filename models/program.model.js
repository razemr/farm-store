const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProgramSchema = new mongoose.Schema({
  template: {
    type: Schema.Types.ObjectId,
    ref: 'ProgramTemplate',
  },
  templateName: {
    type: String,
    required: true,
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
  description: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  nextMilestone: {
    type: Date,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  acres: {
    type: Number,
  },
  milestones: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Milestone',
    },
  ],
});

module.exports = mongoose.model('Program', ProgramSchema);
