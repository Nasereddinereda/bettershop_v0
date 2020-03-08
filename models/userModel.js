const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  last_name: {
    type: String,
    lowercase: true,
    required: [true, "please tell us your last name"],
    min: 3,
    max: 20
  },
  first_name: {
    type: String,
    lowercase: true,
    required: [true, "please tell us your first name"],
    min: 3,
    max: 20
  },
  username: {
    type: String,
    lowercase: true,
    required: [true, "please tell us your username"],
    unique: true,
    min: 3,
    max: 20
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
    unique: true,
    validate: [validator.isEmail, "please provide a valid email"]
  },
  phone: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now()
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 8
    // select: false
  },
  passwordconfirm: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 8,
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: "passwords are not the same "
    }
  },
  active: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    default: "user.jpg"
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User"
  }
});

// Crypt password and delete confirme password
userSchema.pre("save", async function(next) {
  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //delete passwordconfirm field
  // this.passwordconfirm = undefined;

  next();
});

// find only active Users
userSchema.pre(/^find/, function(next) {
  this.find({ active: { $ne: false } });
  next();
});

// Verify Password
userSchema.methods.correctpassword = async function(candidate, user) {
  return await bcrypt.compare(candidate, user);
};

const user = mongoose.model("Users", userSchema);
module.exports = user;
