const express = require('express');
const router = express.Router();
const {
  addProgram,
  getProgram,
  editProgram,
  deleteProgram,
  listPrograms,
  updateMilestoneStatus,
} = require('../controllers/programs.controller');
const { parseQuery } = require('../middlewares/parseQuery.middleware');

router
  .route('/:id')
  .get(getProgram)
  .put(editProgram, getProgram)
  .delete(deleteProgram)
  .patch(updateMilestoneStatus, getProgram);

router.route('/')
  .get(parseQuery, listPrograms)
  .post(addProgram, getProgram);

module.exports = router;
