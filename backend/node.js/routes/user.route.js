const {
  profile,
  register,
  login,
  logout,
} = require("../controllers/user.controller");

const userRoutes = (req, res) => {
  if (req.url === "/api/user/profile" && req.method === "GET") {
    profile(req, res);
  } else if (req.url === "/api/user/register" && req.method === "POST") {
    register(req, res);
  } else if (req.url === "/api/user/login" && req.method === "POST") {
    login(req, res);
  } else if (req.url === "/api/user/logout" && req.method === "GET") {
    logout(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};

module.exports = userRoutes;
