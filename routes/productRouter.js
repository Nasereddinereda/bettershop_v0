const express = require("express");
const productController = require("../controllers/productController");
const reviewController = require("../controllers/reviewController");
const commentaryController = require("../controllers/commentaryController");
const orderController = require("../controllers/orderController");
const favoryController = require("../controllers/favoryController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    productController.addProduct
  );

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.uploadphoto,
    productController.resizeProductPhoto, 
    productController.updateProduct)
  .delete(productController.deleteProduct);

router
  .route("/:productId/reviews")
  .post(
    authController.protect,
    reviewController.setproductuserids,
    reviewController.createReview
  );
router
  .route("/:productId/commentary")
  .post(
    authController.protect,
    reviewController.setproductuserids,
    commentaryController.createCommentary
  );
router
  .route("/:productId/order")
  .post(
    authController.protect,
    reviewController.setproductuserids,
    orderController.createOrder
  );
router
  .route("/:productId/favory")
  .post(
    authController.protect,
    favoryController.setproductuserids,
    favoryController.createFavory
  );

module.exports = router;
