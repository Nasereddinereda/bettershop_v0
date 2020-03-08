const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.isLoggedIn);

router.get("/", authController.isLoggedIn, viewsController.getShowcase);
router.get(
  "/product(-market)?(-search)?(-fastsearch)?/:prod?/:cat?",
  //   authController.protect,
  viewsController.getallproduct
);
router.get("/addproduct", authController.protect, viewsController.addProduct);
router.get("/addimages/:id", authController.protect, viewsController.addImages);
router.get("/signup", viewsController.signUp);
router.get("/updateme", authController.protect, viewsController.upDateMe);
router.get("/signin", viewsController.signIn);
router.get("/me/:page", authController.protect, viewsController.getMe);
router.get("/product(-market)?/:prod/:cat/:id", viewsController.getProduct);
// router.get("/product-search", viewsController.getProduct);

router.post("/update", authController.protect, viewsController.upDate);
module.exports = router;
