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
    const { q, _limit, _page, _statuses } = req.query;
    const limit = _limit ? Number(_limit) : 25;
    const page = _page ? Number(_page) + 1 : 1;
    const statuses = _statuses ? _statuses.split(',') : '';
    const sort = 'date 1';
    let searchQuery = {};
    let $or = [];

    const filterQuery = {
      $or: [
        { farmerName: new RegExp(q, 'gi') },
        { cropName: new RegExp(q, 'gi') },
        { parishName: new RegExp(q, 'gi') },
        { radaExtensionName: new RegExp(q, 'gi') },
      ],
    };

    const now = new Date().getTime();
    const weekAgo = new Date(now - 604800000);
    const weekFromNow = new Date(now + 604800000);

    if (statuses) {
      if (statuses.indexOf('Completed') > -1) {
        $or.push({
          notifiedFarmer: true,
        });
      }

      if (statuses.indexOf('Due') > -1) {
        $or.push({
          $and: [
            { date: { $gt: weekAgo } },
            { date: { $lt: weekFromNow } },
            { notifiedFarmer: false },
          ],
        });
      }

      if (statuses.indexOf('Not Due') > -1) {
        $or.push({
          $and: [{ date: { $gt: weekFromNow } }, { notifiedFarmer: false }],
        });
      }

      if (statuses.indexOf('Overdue') > -1) {
        $or.push({
          $and: [{ date: { $lt: weekAgo } }, { notifiedFarmer: false }],
        });
      }
    }

    if ($or.length > 0) {
      searchQuery = { $or };
    }

    query = { $and: [searchQuery, filterQuery] };

    const total = await Milestone.count(query);
    const milestones = await Milestone.find(query)
      .populate([
        {
          path: 'productApplications.unit',
        },
        {
          path: 'productApplications.product',
          populate: {
            path: 'category',
          },
        },
      ])
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({ milestones, total });
  } catch (error) {
    next(error);
  }
};

exports.groupByMonthAndCount = async (req, res, next) => {
  try {
    const startOfTheMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const yearFromNow = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1),
    );

    const next12MonthsData = await Milestone.aggregate([
      {
        $match: {
          $and: [
            { date: { $lte: yearFromNow } },
            { date: { $gte: startOfTheMonth } },
          ],
        },
      },
      { $group: { _id: { $month: '$date' }, total: { $sum: 1 } } },
    ]);

    res.status(200).json({ next12MonthsData });
  } catch (error) {
    next(error);
  }
};
