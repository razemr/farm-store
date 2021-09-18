const express = require('express');
const router = express.Router();
const { listParishes } = require('../controllers/parishes.controller');

router.route('/')
    .get(listParishes)

module.exports = router;