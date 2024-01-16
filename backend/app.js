const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const mongodb = require("./configs/mongdb");
const session = require("./configs/session");
const cors = require("./configs/cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session());

// route
app.use("/api/user", require("./routes/userRoute"));

// home route
app.get("/", (req, res) => {
  res.send(`<h3>Authentication Authorization</h3>`);
});

// error handler
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
