const User = require("../models/userModel");
const factory = require("./handleFactory");
const catchAsync = require("../utils/catchAsync");

// body filter
const filterObj = (obj, ...body) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (body.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// Get All Users
exports.getallusers = factory.getAll(User);
exports.getuser = factory.getOne(User);

// UPDATE ME
// exports.updateme = factory.updateOne(User);
exports.updateme = catchAsync(async (req, res, next) => {
  // // 1) Create error if user POSTs password data
  // if (req.body.password || req.body.passwordConfirm) {
  //   return next(
  //     new AppError(
  //       "This route is not for password updates. Please use /updateMyPassword.",
  //       400
  //     )
  //   );
  // }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  // const filteredBody = filterObj(req.body, "name", "email");

  if (req.file) req.body.image = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser
    }
  });
});
// DELETE ME
exports.deleteme = factory.deleteOne(User, "active");

// catchAsync(async (req, res, next) => {
//   await User.findByIdAndUpdate(req.user._id, { active: false });

//   res.status(200).json({
//     status: "success",
//     data: null
//   });
// });
