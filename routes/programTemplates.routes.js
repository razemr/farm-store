const express = require('express');
const router = express.Router();
const {
  addProgramTemplate,
  getProgramTemplate,
  editProgramTemplate,
  deleteProgramTemplate,
  listProgramTemplates,
} = require('../controllers/programTemplates.controller');
const { parseQuery } = require('../middlewares/parseQuery.middleware');

router
  .route('/')
  .get(parseQuery, listProgramTemplates)
  .post(addProgramTemplate, getProgramTemplate);

router
  .route('/:id')
  .get(getProgramTemplate)
  .put(editProgramTemplate, getProgramTemplate)
  .delete(deleteProgramTemplate);

module.exports = router;
