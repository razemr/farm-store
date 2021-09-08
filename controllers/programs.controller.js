const Program = require("../models/program.model");
const Farmer = require("../models/farmer.model");
const Milestone = require("../models/milestone.model");

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

    await Farmer.findByIdAndUpdate(program.farmer, {
      $push: { programs: program._id },
    });

    let milestones = req.body.milestones
      .sort((a, b) =>
        new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1
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

    return res.status(201).json(program);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({
        success: false,
        error: "Program already exist.",
      });
    } else {
      next(error);
    }
  }
};

exports.listPrograms = async (req, res, next) => {
  try {
    const { q, _limit, _page, _sort } = req.query;
    const limit = _limit ? Number(_limit) : 10;
    const page = _page ? Number(_page) : 1;
    const sort = _sort ? _sort.split(",").join(" ") : "name";

    const total = await Program.count({ name: new RegExp(q, "gi") });
    const programs = await Program.find({ name: new RegExp(q, "gi") })
      .populate("farmer", "firstName lastName")
      .populate("crop", "name")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);

    res.status(200).json({
      total,
      programs
    });
  } catch (error) {
    next(error);
  }
};

exports.getProgram = async (req, res, next) => {
  try {
    const program = await Program.findById(req.params.id)
      .populate("farmer", "firstName lastName")
      .populate("crop", "name")
      .populate("milestones")

    if (!program) { 
      return res.status(404).json({
        success: false,
        error: "No program found",
      });
    } else {
      return res.status(200).json({program});
    }
  } catch (error) {
    next(error);
  }
};

exports.editProgram = async (req, res, next) => {
  try {
    delete req.body._id;
    const program = await Program.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json(program);
  } catch (error) {
    next(error);
  }
};

exports.deleteProgram = async (req, res, next) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);
    await Farmer.findByIdAndUpdate(program.farmer, {
      $pull: { programs: program._id },
    });

    res.status(200).send("success");
  } catch (error) {
    next(error);
  }
};
