const catchAsync = require("../utils/catchAsync");
const appError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.getAll = (Modal, Ref) =>
  catchAsync(async (req, res) => {
    const features = new APIFeatures(Modal.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    let doc = await features.query;

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc
      }
    });
  });

exports.getOne = Modal =>
  catchAsync(async (req, res, next) => {
    let query = Modal.findById(req.params.id);
    const doc = await query;

    if (!doc) {
      return next(new appError("No document found with that ID ! ", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc
      }
    });
  });

exports.addOne = Modal =>
  catchAsync(async (req, res) => {
    const newdoc = await Modal.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        Modal: newdoc
      }
    });
  });

exports.updateOne = Modal =>
  catchAsync(async (req, res, next) => {
    const doc = await Modal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new appError("No document found with that ID ! ", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        doc
      }
    });
  });

exports.deleteOne = (Modal, ref) =>
  catchAsync(async (req, res, next) => {
    let doc;
    if (ref === "active") {
      doc = await Modal.findById(req.user._id);
    } else {
      doc = await Modal.findById(req.params.id);
    }

    if (!doc) {
      return next(new appError("No Document found with that ID ! ", 404));
    }

    if (ref === "active") {
      await Modal.findByIdAndUpdate(req.user._id, { active: false });
    } else if (ref === "activeOR") {
      await Modal.findByIdAndUpdate(req.params.id, { active: false });
    } else if (ref === "review") {
      await Modal.findByIdAndDelete(req.params.id);
    } else {
      doc.display = false;
      doc.save();
    }
    res.status(200).json({
      status: "success",
      data: null
    });
  });
