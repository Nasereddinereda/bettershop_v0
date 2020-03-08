const express = require("express");
const authController = require("../controllers/authController");
const favoryController = require("../controllers/favoryController");

const router = express.Router({ mergeParams: "true" });
// router.use(authController.protect);

router
  .route("/")
  .get(favoryController.getAllFavory)
  .post(favoryController.setproductuserids, favoryController.createFavory);

router
  .route("/:id")
  .get(favoryController.getFavory)
  .patch(favoryController.updateFavory)
  .delete(favoryController.deleteFavory);
module.exports = router;
