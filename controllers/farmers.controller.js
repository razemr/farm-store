const Farmer = require('../models/farmer.model');
const Parish = require('../models/parish.model');
const Crop = require('../models/crop.model');
const RadaExtension = require('../models/radaExtension.model');

exports.addFarmer = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      sex,
      phoneNumber,
      emailAddress,
      address,
      dateOfBirth,
    } = req.body;

    const parish = await Parish.findById(req.body.parish);
    const radaExtension = await RadaExtension.findById(req.body.radaExtension);
    const crops = await Crop.find({ _id: { $in: req.body.crops } });

    const farmer = await Farmer.create({
      firstName,
      lastName,
      sex,
      phoneNumber,
      emailAddress,
      address,
      dateOfBirth,
      parish: parish._id,
      parishName: parish.name,
      radaExtension: radaExtension._id,
      extensionName: radaExtension.name,
      crops: crops.map((crop) => crop._id),
      cropNames: crops.map((crop) => crop.name),
    });

    req.params.id = farmer._id;
    next();
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        error: 'Farmer already exist.',
      });
    } else {
      next(error);
    }
  }
};

exports.getFarmer = async (req, res, next) => {
  try {
    const farmer = await Farmer.findById(req.params.id).populate('parish radaExtension');

    if (!farmer) {
      return res.status(404).json({
        success: false,
        error: 'No farmer found',
      });
    } else {
      return res.status(200).json({farmer});
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
    const { q, page, limit, sort } = req.body.queryParams;
    const searchQuery = {
      $or: [
        { firstName: new RegExp(q, 'gi') },
        { lastName: new RegExp(q, 'gi') },
        { emailAddress: new RegExp(q, 'gi') },
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
