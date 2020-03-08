const express = require("express");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const reviewRouter = require("./routes/reviewRouter");
const commentaryRouter = require("./routes/commentaryRouter");
const orderRouter = require("./routes/orderRouter");
const favoryRouter = require("./routes/favoryRouter");
const viewRouter = require("./routes/viewRouter");
const globalerror = require("./controllers/errorController");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// template engine 'FOR PUG'
app.set("view engine", "pug");
// define where these views
app.set("views", path.join(__dirname, "views"));
// connect the folder with PUG
app.use(express.static(path.join(__dirname, "public")));

//Limit Data Body and get from postman
app.use(express.json({ limit: "10kb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "10kb" }));
app.use(cookieParser());
// necessary
app.use(morgan("dev"));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

//Route
app.use("/", viewRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/commentary", commentaryRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/favory", favoryRouter);

// Global Error
app.use(globalerror);
module.exports = app;
