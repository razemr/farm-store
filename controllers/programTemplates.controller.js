const ProgramTemplate = require('../models/programTemplate.model');

exports.addProgramTemplate = async (req, res, next) => {
  try {
    delete req.body._id;

    const programTemplate = await ProgramTemplate.create(req.body);
    return res.status(201).json(programTemplate);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        error: 'Program Template already exist.',
      });
    } else {
      next(error);
    }
  }
};

exports.getProgramTemplate = async (req, res, next) => {
  try {
    const programTemplate = await ProgramTemplate.findById(req.params.id)
      .populate('crop', 'name')
      .populate('company', 'name');

    if (!programTemplate) {
      return res.status(404).json({
        success: false,
        error: 'No Program Template found',
      });
    } else {
      return res.status(200).json(programTemplate);
    }
  } catch (error) {
    next(error);
  }
};

exports.editProgramTemplate = async (req, res, next) => {
  try {
    delete req.body._id;

    const programTemplate = await ProgramTemplate.findByIdAndUpdate(
      req.params.id,
      req.body,
    );

    res.status(200).json(programTemplate);
  } catch (error) {
    next(error);
  }
};

exports.deleteProgramTemplate = async (req, res, next) => {
  try {
    await ProgramTemplate.findByIdAndDelete(req.params.id);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

exports.listProgramTemplates = async (req, res, next) => {
  try {
    const { q, page, limit, sort } = req.body.queryParams;
    const searchQuery = {
      $or: [
        { name: new RegExp(q, 'gi') },
        { description: new RegExp(q, 'gi') },
      ],
    };

    const total = await ProgramTemplate.count(searchQuery);
    const programTemplates = await ProgramTemplate.find(searchQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);

    res.status(200).json({
      total,
      programTemplates,
    });
  } catch (error) {
    next(error);
  }
};
