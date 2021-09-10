const express = require('express');
const router = express.Router();
const { addProgramTemplate, getProgramTemplate, editProgramTemplate, deleteProgramTemplate, listProgramTemplates } = require('../controllers/programTemplates.controller');

router.route('/')
    .get(listProgramTemplates)
    .post(addProgramTemplate)

router.route('/:id')
    .get(getProgramTemplate)
    .put(editProgramTemplate)
    .delete(deleteProgramTemplate)

module.exports = router;