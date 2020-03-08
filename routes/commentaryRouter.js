const express = require("express");
const authController = require("../controllers/authController");
const commentaryController = require("../controllers/commentaryController");

const router = express.Router({ mergeParams: "true" });
// router.use(authController.protect);

router
  .route("/")
  .get(commentaryController.getAllCommentary)
  .post(
    commentaryController.setproductuserids,
    commentaryController.createCommentary
  );

router
  .route("/:id")
  .get(commentaryController.getCommentary)
  .patch(commentaryController.updateCommentary)
  .delete(commentaryController.deleteCommentary);
module.exports = router;
