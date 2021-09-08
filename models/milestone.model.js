const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MilestoneSchema = new mongoose.Schema({
  program: {
    type: Schema.Types.ObjectId,
    ref: "Program",
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
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      unit: {
        type: Schema.Types.ObjectId,
        ref: "Unit",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Milestone", MilestoneSchema);
