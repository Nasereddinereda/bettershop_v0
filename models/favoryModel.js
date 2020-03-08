const mongoose = require("mongoose");

const favorySchema = new mongoose.Schema(
  {
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

favorySchema.index({ product: 1, user: 1 }, { unique: true });

favorySchema.pre(/^find/, function(next) {
  this.populate("user");
  this.populate("product");
  next();
});

const Favory = mongoose.model("Favory", favorySchema);
module.exports = Favory;
