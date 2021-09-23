const Program = require('../models/program.model');
const ProgramTemplate = require('../models/programTemplate.model');
const Farmer = require('../models/farmer.model');
const Milestone = require('../models/milestone.model');
const Crop = require('../models/crop.model');
const Parish = require('../models/parish.model');
const RadaExtension = require('../models/radaExtension.model');

exports.addProgram = async (req, res, next) => {
  try {
    const {
      endDate,
      name,
      startDate,
      acres,
      crop,
      radaExtension,
      parish,
      farmer,
      template,
      description,
    } = req.body;

    const _template = await ProgramTemplate.findById(template);
    const { firstName, lastName } = await Farmer.findById(farmer);
    const _crop = await Crop.findById(crop);
    const _parish = await Parish.findById(parish);
    const _radaExtension = await RadaExtension.findById(radaExtension);

    let program = await Program.create({
      crop,
      cropName: _crop.name,
      farmer: farmer,
      farmerName: `${firstName} ${lastName}`,
      parish,
      parishName: _parish.name,
      radaExtension,
      radaExtensionName: _radaExtension.name,
      template,
      templateName: _template ? _template.name : 'Custom Template',
      endDate,
      name,
      startDate,
      acres,
      description,
    });

    req.params.id = program._id;

    await Farmer.findByIdAndUpdate(program.farmer, {
      $push: { programs: program._id },
    });

    let milestones = req.body.milestones
      .sort((a, b) =>
        new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1,
      )
      .map((milestone) => ({
        ...milestone,
        program: program._id,
      }));
    const nextMilestone = milestones[0].date;
    milestones = await Milestone.create(milestones);

    await Program.findByIdAndUpdate(program._id, {
      $set: { nextMilestone },
      $push: { milestones: { $each: milestones.map((m) => m._id) } },
    });

    next();
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        error: 'Program already exist.',
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

exports.editProgram = async (req, res, next) => {
  try {
    const {
      endDate,
      name,
      startDate,
      acres,
      crop,
      radaExtension,
      parish,
      farmer,
      milestones,
      description,
    } = req.body;

    const { firstName, lastName } = await Farmer.findById(farmer);
    const _crop = await Crop.findById(crop);
    const _parish = await Parish.findById(parish);
    const _radaExtension = await RadaExtension.findById(radaExtension);

    await Program.findByIdAndUpdate(req.params.id, {
      $set: {
        crop,
        cropName: _crop.name,
        radaExtension,
        radaExtensionName: _radaExtension.name,
        parish,
        parishName: _parish.name,
        farmer,
        farmerName: `${firstName} ${lastName}`,
        endDate,
        name,
        startDate,
        acres,
        description,
      },
    });

    let program = await Program.findById(req.params.id);

    if (program.farmer != farmer) {
      await Farmer.findByIdAndUpdate(program.farmer, {
        $pull: { programs: program._id },
      });
      await Farmer.findByIdAndUpdate(farmer, {
        $push: { programs: program._id },
      });
    }

    let milestoneIds = milestones
      .filter((m) => Boolean(m._id))
      .map((m) => m._id);

    for (let i = 0; i < program.milestones.length; i++) {
      if (milestoneIds.indexOf(program.milestones[i].toString()) < 0) {
        await Program.findByIdAndUpdate(program._id, {
          $pull: { milestones: program.milestones[i] },
        });
      }
    }

    for (let i = 0; i < milestones.length; i++) {
      let { _id, date, productApplications } = milestones[i];
      if (_id) {
        await Milestone.findByIdAndUpdate(_id, {
          $set: { date, productApplications },
        });
      } else {
        const milestone = await Milestone.create({ date, productApplications });
        await Program.findByIdAndUpdate(req.params.id, {
          $push: { milestones: milestone._id },
        });
      }
    }

    program = await Program.findById(req.params.id).populate('milestones');
    let completed = true;
    program.milestones.forEach((milestone) => {
      if (!milestone.notifiedFarmer) completed = false;
    });

    const nextMilestone = await getNextMilestone(program);

    await Program.findByIdAndUpdate(req.params.id, {
      $set: { nextMilestone, completed },
    });

    next();
  } catch (error) {
    next(error);
  }
};

exports.listPrograms = async (req, res, next) => {
  try {
    const { q, page, limit, sort } = req.body.queryParams;

    const total = await Program.count({
      $or: [{ name: new RegExp(q, 'gi') }, { farmerName: new RegExp(q, 'gi') }],
    });
    const programs = await Program.find({
      $or: [{ name: new RegExp(q, 'gi') }, { farmerName: new RegExp(q, 'gi') }],
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);

    res.status(200).json({
      total,
      programs,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProgram = async (req, res, next) => {
  try {
    const program = await Program.findById(req.params.id)
      .populate('farmer')
      .populate({
        path: 'milestones',
        populate: [
          {
            path: 'productApplications.unit',
          },
          {
            path: 'productApplications.product',
            populate: {
              path: 'category',
            },
          },
        ],
      });

    if (!program) {
      return res.status(404).json({
        success: false,
        error: 'No program found',
      });
    } else {
      return res.status(200).json({ program });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateMilestoneStatus = async (req, res, next) => {
  try {
    await Milestone.findByIdAndUpdate(req.body.id, {
      $set: {
        notifiedFarmer: req.body.status,
      },
    });

    const program = await Program.findById(req.params.id).populate(
      'milestones',
      'date notifiedFarmer',
    );

    let completed = true;
    program.milestones.forEach((milestone) => {
      if (!milestone.notifiedFarmer) completed = false;
    });
    const nextMilestone = await getNextMilestone(program);

    await Program.findByIdAndUpdate(req.params.id, {
      $set: { nextMilestone, completed },
    });
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

exports.deleteProgram = async (req, res, next) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);

    await Farmer.findByIdAndUpdate(program.farmer, {
      $pull: { programs: program._id },
    });

    await Milestone.remove({ program: program._id });

    res.status(200).send({ program });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getNextMilestone = async (id) => {
  const program = await Program.findById(id).populate(
    'milestones',
    'date notifiedFarmer',
  );
  let nextMilestone = program.nextMilestone;

  const filteredMilestones = program.milestones.filter(
    (milestone) => !milestone.notifiedFarmer,
  );

  if (filteredMilestones.length === 0) {
    nextMilestone = program.milestones.reduce((a, b) => {
      return new Date(a.date).getTime() > new Date(b.date).getTime() ? a : b;
    }, program.milestones[0]).date;
  } else {
    nextMilestone = filteredMilestones.reduce((a, b) => {
      return new Date(a.date).getTime() < new Date(b.date).getTime() ? a : b;
    }, filteredMilestones[0]).date;
  }

  return nextMilestone;
};
