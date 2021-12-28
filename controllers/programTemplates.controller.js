const ProgramTemplate = require('../models/programTemplate.model');
const Crop = require('../models/crop.model');
const Company = require('../models/company.model');

exports.addProgramTemplate = async (req, res, next) => {
  try {
    const { name, description, milestoneTemplates } = req.body;
    const crop = await Crop.findById(req.body.crop);
    const company = await Company.findById(req.body.company);

    const programTemplate = await ProgramTemplate.create({
      name,
      description,
      crop: crop._id,
      cropName: crop.name,
      company: company._id,
      companyName: company.name,
      milestoneTemplates: milestoneTemplates.sort(
        (first, second) => first < second,
      ),
    });

    req.params.id = programTemplate._id;

    next();
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        error: 'Program Template already exist.',
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

exports.editProgramTemplate = async (req, res, next) => {
  try {
    const { name, description, milestoneTemplates } = req.body;
    const crop = await Crop.findById(req.body.crop);
    const company = await Company.findById(req.body.company);

    await ProgramTemplate.findByIdAndUpdate(req.params.id, {
      name,
      description,
      crop: crop._id,
      cropName: crop.name,
      company: company._id,
      companyName: company.name,
      milestoneTemplates: milestoneTemplates.sort(
        (first, second) => first < second,
      ),
    });

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

exports.getProgramTemplate = async (req, res, next) => {
  try {
    const programTemplate = await ProgramTemplate.findById(
      req.params.id,
    ).populate(
      'crop company milestoneTemplates.productApplications.product milestoneTemplates.productApplications.unit',
    );

    if (!programTemplate) {
      return res.status(404).json({
        success: false,
        error: 'No Program Template found',
      });
    } else {
      return res.status(200).json({programTemplate});
    }
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
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      total,
      programTemplates,
    });
  } catch (error) {
    next(error);
  }
};
