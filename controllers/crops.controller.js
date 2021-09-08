const Crop = require("../models/crop.model");

exports.listCrops = async (req, res, next) => {
  try {
    const crops = await Crop.find().sort("name");
    res.status(200).json({crops});
  } catch (error) {
    next(error);
  }
};
