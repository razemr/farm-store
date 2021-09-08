const Product = require('../models/product.model');

exports.addProduct = async (req, res, next) => {
    try {
      delete req.body._id;
  
      const product = await Product.create(req.body);
      return res.status(201).json(product);
    } catch (error) {
      if (error.name === "ValidationError") {
        res.status(400).json({
          success: false,
          error: "Product already exist.",
        });
      } else {
        next(error);
      }
    }
  };
  
  exports.getProduct = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          error: "No product found",
        });
      } else {
        return res.status(200).json(product);
      }
    } catch (error) {
      next(error);
    }
  };
  
  exports.editProduct = async (req, res, next) => {
    try {
      delete req.body._id;
      const product = await Product.findByIdAndUpdate(req.params.id, req.body);
  
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };
  
  exports.deleteProduct = async (req, res, next) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
  
  exports.listProducts = async (req, res, next) => {
    try {
      const { q, _limit, _page, _sort } = req.query;
      const limit = _limit ? Number(_limit) : 10;
      const page = _page ? Number(_page) : 1;
      const sort = _sort ? _sort.split(',').join(' ') : 'name';
      const searchQuery = {
        $or: [
          { name: new RegExp(q, 'gi') },
          { description: new RegExp(q, 'gi') }
        ]
      };
  
      const total = await Product.count(searchQuery);
      const products = await Product.find(searchQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);   
  
      res.status(200).json({
        total,
        products,
      });
    } catch (error) {
      next(error);
    }
  };