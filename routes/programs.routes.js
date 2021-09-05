const express = require('express');
const router = express.Router();
const { addProgram, getProgram, editProgram, deleteProgram, listPrograms } = require('../controllers/programs.controller');

router.route('/:id')
    .get(getProgram)
    .put(editProgram)
    .delete(deleteProgram)

    router.route('/')
    .get(listPrograms)
    .post(addProgram)

module.exports = router;

module.exports = router;