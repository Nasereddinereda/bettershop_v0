const mongoose = require("mongoose");
const dotenv = require("dotenv");
//Get environment app
dotenv.config({
  path: "./config.env"
});

const app = require("./app");

// Connect the app with Database
mongoose
  .connect(process.env.LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB connection successful");
  });

// Running the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
