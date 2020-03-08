const mongoose = require("mongoose");

const commentarySchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "Comment cannot be empty."]
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
  }
});

commentarySchema.pre(/^find/, function(next) {
  this.populate("user");
  this.populate("product");
  next();
});

const Commentary = mongoose.model("Commentary", commentarySchema);
module.exports = Commentary;
