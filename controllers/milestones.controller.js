const Milestone = require('../models/milestone.model');

exports.updateStatus = async (req, res, next) => {
  const { notifiedFarmer } = req.body;
  try {
    await Milestone.findByIdAndUpdate(req.params.id, { notifiedFarmer });
    const milestone = await Milestone.findById(req.params.id);

    return res.status(200).json({ milestone });
  } catch (error) {
    next(error);
  }
};

exports.listMilestones = async (req, res, next) => {
  try {
    const milestones = await Milestone.find({ notifiedFarmer: false }).populate([
      {
        path: 'productApplications.unit',
      },
      {
        path: 'productApplications.product',
        populate: {
          path: 'category',
        },
      },
    ]);

    res.status(200).json({ milestones });
  } catch (error) {
    next(error);
  }
};
