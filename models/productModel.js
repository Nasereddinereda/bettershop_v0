const mongoose = require("mongoose");
const validator = require("validator");
const slugify = require("slugify");
// required User

const productSchema = new mongoose.Schema({
  // Step 1
  name: {
    type: String,
    lowercase: true,
    required: [true, "please tell us dress name"],
    min: 3,
    max: 20
  },
  type: {
    type: String,
    required: [true, "please tell us product type"],
    enum: ["Dress", "MakeUp", "Clothes", "Others"]
  },
  state: {
    type: String,
    required: [true, "please tell us dress State"],
    enum: ["New", "Good", "Medium"]
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: [true, "Review must belong to a user."]
  },
  seller: {
    type: String,
    default: "User",
    enum: ["Admin", "User"]
  },
  // Step 2
  dress_type: {
    type: String,
    enum: [
      "White Dresses",
      "Caftans",
      "Evening Dresses",
      "Other Dresses",
      "Engagement Dresses"
    ]
  },
  makeup_type: {
    type: String,
    enum: [
      "Dyed",
      "Eyes",
      "Lips",
      "Nails",
      "Hair",
      "Eyebrows",
      "Tools",
      "Body",
      "Oter MakeUp"
    ]
  },
  clothes_type: {
    type: String,
    enum: [
      "Shoes",
      "SPShoes",
      "Pyjamas",
      "Nice Clothes",
      "Underwear",
      "Other Clothes"
    ]
  },
  others_type: {
    type: String,
    enum: [
      "Carpet",
      "Sheet",
      "GuestRoom",
      "Ketchen",
      "BadRoom",
      "BethRoom",
      "Others"
    ]
  },
  color: {
    type: String,
    lowercase: true,
    required: [true, "please tell us dress color"]
  },
  description: {
    type: String,
    min: 20,
    max: 200
  },

  price: {
    type: Number,
    required: [true, "please tell us dress price"]
  },
  quantity: {
    type: Number,
    default: 1
  },
  size: [
    {
      type: String,
      uppercase: true,
      enum: ["S", "M", "L", "XL", "XXL", "3XL"]
    }
  ],

  // Step 3
  phone: {
    type: Number,
    required: [true, "please tell us your phone"]
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
    validate: [validator.isEmail, "please provide a valid email"]
  },
  wilaya: {
    type: String,
    lowercase: true,
    required: [true, "please provide your Wilaya"]
  },
  // Others
  display: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  slug: {
    type: String,
    default: "category"
  },
  images: [
    {
      type: String
    }
  ]
});

productSchema.index({ slug: 1 });

productSchema.pre(/^find/, function(next) {
  this.find({ display: { $ne: false } });
  next();
});

productSchema.pre(/^find/, function(next) {
  this.populate("user");
  next();
});

productSchema.pre("save", function(next) {
  if (this.dress_type) {
    this.slug = slugify(this.dress_type, { lower: true });
  } else if (this.makeup_type) {
    this.slug = slugify(this.makeup_type, { lower: true });
  } else if (this.clothes_type) {
    this.slug = slugify(this.clothes_type, { lower: true });
  } else {
    this.slug = slugify(this.others_type, { lower: true });
  }

  next();
});

const product = mongoose.model("Product", productSchema);
module.exports = product;
