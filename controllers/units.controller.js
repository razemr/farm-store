const Unit = require("../models/unit.model");

exports.listUnits = async (req, res, next) => {
  try {
    const units = await Unit.find().sort("name");

    res.status(200).json({units});
  } catch (error) {
    next(error);
  }
};
