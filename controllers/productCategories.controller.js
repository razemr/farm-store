const ProductCategory = require('../models/productCategory.model');

exports.listCategories = async (req, res, next) => {
  try {
    const productCategories = await ProductCategory.find().sort('name');
    res.status(200).json({ productCategories });
  } catch (error) {
    next(error);
  }
};