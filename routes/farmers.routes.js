const express = require('express');
const router = express.Router();
const { addFarmer, getFarmer, editFarmer, deleteFarmer, listFarmers } = require('../controllers/farmers.controller');

router.route('/')
    .get(listFarmers)
    .post(addFarmer)

router.route('/:id')
    .get(getFarmer)
    .put(editFarmer)
    .delete(deleteFarmer)

module.exports = router;