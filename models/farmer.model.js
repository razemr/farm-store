const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const regex = require('../utils/regex');

const FarmerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  sex: {
    type: String,
    enum: ['Male', 'Female'],
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: (v) => {
        return regex.phoneRegex.test(v);
      },
    },
    required: true,
  },
  emailAddress: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => {
        return regex.emailRegex.test(v);
      },
    },
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
  extensionName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  farmGps: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    },
  },
  crops: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Crop',
      required: true,
    },
  ],
  cropNames: [
    {
      type: String,
      required: true,
    },
  ],
  programs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Program',
    },
  ],
});

module.exports = mongoose.model('Farmer', FarmerSchema);
