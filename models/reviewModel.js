const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a product."]
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: [true, "Review must belong to a user."]
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

reviewsSchema.index({ product: 1, user: 1 }, { unique: true });

reviewsSchema.pre(/^find/, function(next) {
  this.populate("user");
  this.populate("product");
  next();
});

const Review = mongoose.model("Review", reviewsSchema);
module.exports = Review;
