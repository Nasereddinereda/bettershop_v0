const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    default: 1
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "Comment must belong to a product."]
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: [true, "Comment must belong to a user."]
  },
  active: {
    type: Boolean,
    default: true
  }
});

// find only active Users
orderSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

orderSchema.pre(/^find/, function(next) {
  this.populate("user");
  this.populate("product");
  next();
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
