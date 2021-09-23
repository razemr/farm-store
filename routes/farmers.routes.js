const express = require('express');
const router = express.Router();
const {
  addFarmer,
  getFarmer,
  editFarmer,
  deleteFarmer,
  listFarmers,
} = require('../controllers/farmers.controller');
const { parseQuery } = require('../middlewares/parseQuery.middleware');

router.route('/').get(parseQuery, listFarmers).post(addFarmer, getFarmer);

router.route('/:id').get(getFarmer).put(editFarmer).delete(deleteFarmer);

module.exports = router;
