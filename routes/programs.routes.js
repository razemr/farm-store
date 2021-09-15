const express = require('express');
const router = express.Router();
const {
  addProgram,
  getProgram,
  editProgram,
  deleteProgram,
  listPrograms,
  updateMilestoneStatus
} = require('../controllers/programs.controller');

router
  .route('/:id')
  .get(getProgram)
  .put(editProgram, getProgram)
  .delete(deleteProgram)
  .patch(updateMilestoneStatus, getProgram);

router.route('/').get(listPrograms).post(addProgram, getProgram);

module.exports = router;
