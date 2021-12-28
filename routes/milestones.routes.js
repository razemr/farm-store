const express = require('express');
const router = express.Router();
const {
  updateStatus,
  listMilestones,
  groupByMonthAndCount
} = require('../controllers/milestones.controller');

router.route('/groupByMonthAndCount').get(groupByMonthAndCount)
router.route('/').get(listMilestones);
router.route('/:id').patch(updateStatus);


module.exports = router;
