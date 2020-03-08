const Commentary = require("./../models/commentaryModel");
const factory = require("./handleFactory");

exports.getAllCommentary = factory.getAll(Commentary);

exports.getCommentary = factory.getOne(Commentary);

exports.createCommentary = factory.addOne(Commentary);

exports.updateCommentary = factory.updateOne(Commentary);

exports.deleteCommentary = factory.deleteOne(Commentary, "review");

exports.setproductuserids = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
