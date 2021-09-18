const express = require('express');
const router = express.Router();
const { listRadaExtensions } = require('../controllers/radaExtensions.controller');

router.route('/')
    .get(listRadaExtensions)

module.exports = router;