const {
  profile,
  register,
  login,
  logout,
} = require("../controllers/user.controller");

const userRoutes = (req, res) => {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // Allow the specific origin
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204); // No content for preflight response
    res.end();
    return;
  }

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
