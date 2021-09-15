const Program = require('../models/program.model');
const Farmer = require('../models/farmer.model');
const Milestone = require('../models/milestone.model');

exports.addProgram = async (req, res, next) => {
  try {
    const { endDate, name, startDate, acres, crop, farmer, template } =
      req.body;

    let program = await Program.create({
      crop,
      farmer,
      template,
      endDate,
      name,
      startDate,
      acres,
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
      farmer,
      template,
      milestones,
    } = req.body;

    await Program.findByIdAndUpdate(req.params.id, {
      crop,
      farmer,
      template,
      endDate,
      name,
      startDate,
      acres,
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
        await Milestone.findByIdAndUpdate(_id, { date, productApplications });
      } else {
        const milestone = await Milestone.create({ date, productApplications });
        await Program.findByIdAndUpdate(req.params.id, {
          $push: { milestones: milestone._id },
        });
      }
    }
    const nextMilestone = await getNextMilestone(req.params.id);
    await Program.findByIdAndUpdate(req.params.id, { nextMilestone });

    next();
  } catch (error) {
    console.log(error)
    next(error);
  }
};

exports.listPrograms = async (req, res, next) => {
  try {
    const { q, _limit, _page, _sort } = req.query;
    const limit = _limit ? Number(_limit) : 50;
    const page = _page ? Number(_page) : 1;
    const sort = _sort ? _sort.split(',').join(' ') : 'name';

    const total = await Program.count({ name: new RegExp(q, 'gi') });
    const programs = await Program.find({ name: new RegExp(q, 'gi') })
      .populate('farmer', 'firstName lastName')
      .populate('crop', 'name')
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
      .populate('farmer', 'firstName lastName')
      .populate('crop', 'name')
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
      notifiedFarmer: req.body.status,
    });

    const program = await Program.findById(req.params.id).populate(
      'milestones',
      'date notifiedFarmer',
    );

    const nextMilestone = await getNextMilestone(program);

    await Program.findByIdAndUpdate(req.params.id, { nextMilestone });
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

    await Milestone.remove({program: program._id});

    res.status(200).send({program});
  } catch (error) {
    console.log(error)
    next(error);
  }
};

const getNextMilestone = async (id) => {
  program = await Program.findById(id).populate(
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
