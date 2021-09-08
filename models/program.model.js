const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProgramSchema = new mongoose.Schema({
  farmer: {
    type: Schema.Types.ObjectId,
    ref: "Farmer",
    required: true,
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
  crop: {
    type: Schema.Types.ObjectId,
    ref: "Crop",
    required: true,
  },
  acres: {
    type: Number,
  },
  milestones: [
    {
      type: Schema.Types.ObjectId,
      ref: "Milestone",
    },
  ],
});

module.exports = mongoose.model("Program", ProgramSchema);
