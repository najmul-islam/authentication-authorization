const expressCors = require("cors");

const cors = () => {
  return expressCors({
    origin: "http://localhost:5173",
    credentials: true,
  });
};

module.exports = cors;
