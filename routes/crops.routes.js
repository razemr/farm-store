const express = require('express');
const router = express.Router();
const { listCrops } = require('../controllers/crops.controller');

router.route('/')
    .get(listCrops)

module.exports = router;