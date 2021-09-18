const RadaExtension = require('../models/radaExtension.model');

exports.listRadaExtensions = async (req, res, next) => {
  try {
    const radaExtensions = await RadaExtension.find().sort('name');
    res.status(200).json({ radaExtensions });
  } catch (error) {
    next(error);
  }
};
