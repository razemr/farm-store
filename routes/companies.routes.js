const express = require('express');
const router = express.Router();
const { listCompanies } = require('../controllers/companies.controller');

router.route('/')
    .get(listCompanies)

module.exports = router;