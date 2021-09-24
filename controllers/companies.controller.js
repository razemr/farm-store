const Company = require('../models/company.model');

exports.listCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find().sort('name');
    res.status(200).json({ companies });
  } catch (error) {
    next(error);
  }
};
