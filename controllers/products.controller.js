const Product = require('../models/product.model');
const Milestone = require('../models/milestone.model');
const ProductCategory = require('../models/productCategory.model');
const Company = require('../models/company.model');
const ProgramTemplate = require('../models/programTemplate.model');

exports.addProduct = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = await ProductCategory.findById(req.body.category);
    const company = await Company.findById(req.body.company);

    const product = await Product.create({
      name,
      description,
      category: category._id,
      categoryName: category.name,
      company: company._id,
      companyName: company.name,
    });

    return res.status(201).json({ product });
  } catch (error) {
    console.log(error);
    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        error: 'Product already exist.',
      });
    } else {
      next(error);
    }
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      'company category',
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'No product found',
      });
    } else {
      return res.status(200).json({ product });
    }
  } catch (error) {
    next(error);
  }
};

exports.editProduct = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = await ProductCategory.findById(req.body.category);
    const company = await Company.findById(req.body.company);

    const product = await Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      category: category._id,
      categoryName: category.name,
      company: company._id,
      companyName: company.name,
    });

    res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await Milestone.updateMany(
      { 'productApplications.product': req.params.id },
      { $pull: { productApplications: { product: req.params.id } } },
    );

    await ProgramTemplate.updateMany(
      { 'milestoneTemplates.productApplications.product': req.params.id },
      {
        $pull: {
          'milestoneTemplates.productApplications': { product: req.params.id },
        },
      },
    );

    await Product.remove({ _id: req.params.id });

    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

exports.listProducts = async (req, res, next) => {
  try {
    const { q, page, limit, sort } = req.body.queryParams;
    const searchQuery = {
      $or: [
        { name: new RegExp(q, 'gi') },
        { description: new RegExp(q, 'gi') },
      ],
    };

    const total = await Product.count(searchQuery);
    const products = await Product.find(searchQuery)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      total,
      products,
    });
  } catch (error) {
    next(error);
  }
};
