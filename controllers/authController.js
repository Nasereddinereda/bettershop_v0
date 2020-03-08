const { promisify } = require("util");
const User = require("../models/userModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const sharp = require("sharp");
// const upload = multer({ dest: "public/img/users" });

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/img/users");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user._id}.${ext}`);
//   }
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.resizeUserPhoto = async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
};

exports.uploadphoto = upload.single("image");

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https"
  });

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user
    }
  });
};

// SIGN UP
exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  createSendToken(newUser, 200, req, res);
});

//LOGIN
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exist
  if (!email || !password) {
    return next(new appError("please provide email and password", 400));
  }

  // true email and password
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctpassword(password, user.password))) {
    return next(new appError("Incorrect email or password", 401));
  }

  // if everything ok , send token to client
  createSendToken(user, 200, req, res);
});

// Is Log In
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      // if (currentUser.changedPasswordAfter(decoded.iat)) {
      //   return next();
      // }

      // THERE IS A LOGGED IN USER

      res.locals.user = currentUser;

      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

// LOGED OUT
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: "success" });
  // res.redirect("http://localhost:3000/product");
};

// PROTECT
exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token || token == "loggedout") {
      return res.redirect("http://localhost:3000/signin");

      // return next(new appError("You must log In", 401));
      // Redirected
    }

    // // verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // // check if user still exists
    const freshUser = await User.findById(decoded.id);

    if (!freshUser) {
      // return next(
      //   new appError(
      //     "the user belonging to this token does no longer exist .",
      //     401
      //   )
      // );
      res.redirect("http://localhost:3000/signin");
    }

    req.user = freshUser;
    // console.log(req.user);
    next();
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message
    });
  }
};

// UPDATE PASSWORD
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.correctpassword(req.body.Currentpassword, user.password))) {
    return next(new appError("the password is wrong", 401));
  }

  user.password = req.body.Newpassword;
  user.passwordconfirm = req.body.ConfirmeNewpassword;
  await user.save();
  createSendToken(user, 200, req, res);
});
