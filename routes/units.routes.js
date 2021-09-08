const express = require('express');
const router = express.Router();
const { listUnits } = require('../controllers/units.controller');

router.route('/')
    .get(listUnits)

module.exports = router;