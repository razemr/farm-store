const express = require('express');
const router = express.Router();
const { addProduct, getProduct, editProduct, deleteProduct, listProducts } = require('../controllers/products.controller');

router.route('/')
    .get(listProducts)
    .post(addProduct)

router.route('/:id')
    .get(getProduct)
    .put(editProduct)
    .delete(deleteProduct)

module.exports = router;