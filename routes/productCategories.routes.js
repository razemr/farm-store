const express = require('express');
const router = express.Router();
const { listCategories } = require('../controllers/productCategories.controller');

router.route('/')
    .get(listCategories)

module.exports = router;