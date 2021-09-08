const Farmer = require("../models/farmer.model");

exports.addFarmer = async (req, res, next) => {
  try {
    delete req.body._id;

    const farmer = await Farmer.create(req.body);
    return res.status(201).json(farmer);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({
        success: false,
        error: "Farmer already exist.",
      });
    } else {
      next(error);
    }
  }
};

exports.getFarmer = async (req, res, next) => {
  try {
    const farmer = await Farmer.findById(req.params.id);

    if (!farmer) {
      return res.status(404).json({
        success: false,
        error: "No farmer found",
      });
    } else {
      return res.status(200).json(farmer);
    }
  } catch (error) {
    next(error);
  }
};

exports.editFarmer = async (req, res, next) => {
  try {
    delete req.body.programs;
    delete req.body._id;

    const farmer = await Farmer.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json(farmer);
  } catch (error) {
    next(error);
  }
};

exports.deleteFarmer = async (req, res, next) => {
  try {
    await Farmer.findByIdAndDelete(req.params.id);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

exports.listFarmers = async (req, res, next) => {
  try {
    const { q, _limit, _page, _sort } = req.query;
    const limit = _limit ? Number(_limit) : 10;
    const page = _page ? Number(_page) : 1;
    const sort = _sort ? _sort.split(',').join(' ') : 'firstName';
    const searchQuery = {
      $or: [
        { firstName: new RegExp(q, 'gi') },
        { lastName: new RegExp(q, 'gi') },
      ],
    };

    const total = await Farmer.count(searchQuery);
    const farmers = await Farmer.find(searchQuery)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort(sort);   

    res.status(200).json({
      total,
      farmers,
    });
  } catch (error) {
    next(error);
  }
};
