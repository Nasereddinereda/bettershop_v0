const Favory = require("./../models/favoryModel");
const factory = require("./handleFactory");

exports.getAllFavory = factory.getAll(Favory);

exports.getFavory = factory.getOne(Favory);

exports.createFavory = factory.addOne(Favory);

exports.updateFavory = factory.updateOne(Favory);

exports.deleteFavory = factory.deleteOne(Favory, "review");

exports.setproductuserids = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
