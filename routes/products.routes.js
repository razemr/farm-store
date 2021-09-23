const express = require('express');
const router = express.Router();
const {
  addProduct,
  getProduct,
  editProduct,
  deleteProduct,
  listProducts,
} = require('../controllers/products.controller');
const { parseQuery } = require('../middlewares/parseQuery.middleware');

router.route('/').get(parseQuery, listProducts).post(addProduct);

router.route('/:id').get(getProduct).put(editProduct).delete(deleteProduct);

module.exports = router;
