const http = require("http");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/user.route");

const server = http.createServer((req, res) => {
  userRoutes(req, res);
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`app running at http://localhost:${port}`)
);
