const express = require("express");
const authController = require("../controllers/authController");
const orderController = require("../controllers/orderController");

const router = express.Router({ mergeParams: "true" });
router.use(authController.protect);

router
  .route("/")
  .get(orderController.getAllOrder)
  .post(orderController.setproductuserids, orderController.createOrder);

router
  .route("/:id")
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);
module.exports = router;
