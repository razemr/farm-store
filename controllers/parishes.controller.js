const Parish = require('../models/parish.model');

exports.listParishes = async (req, res, next) => {
  try {
    const parishes = await Parish.find().sort('name');
    res.status(200).json({ parishes });
  } catch (error) {
    next(error);
  }
};
