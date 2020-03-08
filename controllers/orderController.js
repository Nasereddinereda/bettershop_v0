const Order = require("./../models/orderModel");
const factory = require("./handleFactory");
const catchAsync = require("../utils/catchAsync");

exports.getAllOrder = factory.getAll(Order);

exports.getOrder = factory.getOne(Order);

exports.createOrder = factory.addOne(Order);

exports.updateOrder = factory.updateOne(Order);

exports.deleteOrder = factory.deleteOne(Order, "activeOR");

exports.getAllMyOrder = catchAsync(async (req, res) => {
  const doc = await Order.find({ user: req.params.id });

  res.status(200).json({
    status: "success",
    results: doc.length,
    data: {
      data: doc
    }
  });
});

exports.setproductuserids = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
