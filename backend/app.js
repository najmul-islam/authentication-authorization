const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cookies = require("cookie-parser");
const mongodb = require("./configs/mongdb");
const cors = require("./configs/cors");
const passport = require("./middlewares/passportMiddleware");

const app = express();

// additional middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookies());
app.use(passport.initialize());

// route
app.use("/api/user", require("./routes/userRoute"));

// home route
app.get("/", (req, res) => {
  res.send(`<h3>Authentication Authorization</h3>`);
});

// error middleware
app.use(require("./middlewares/notFoundMiddleware"));
app.use(require("./middlewares/errorMiddleware"));

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    // connectDB
    await mongodb(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
