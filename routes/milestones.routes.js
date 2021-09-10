const express = require('express');
const router = express.Router();
const {
  updateStatus,
  listMilestones,
} = require('../controllers/milestones.controller');

router.route('/').get(listMilestones);

router.route('/:id').patch(updateStatus);

module.exports = router;
