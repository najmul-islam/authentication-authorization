const { createUser, findUserByEmail } = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/hashPassword");

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

const profile = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Basic ")) {
      res.writeHead(401, headers);
      res.end(
        JSON.stringify({
          message: "Unauthorized: Missing or invalid Authorization header",
        })
      );
      return;
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "ascii"
    );
    const [email, password] = credentials.split(":");

    // Find the user by email
    const user = await findUserByEmail(email);

    if (!user) {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ message: "User not found" }));
      return;
    }

    // Validate password
    const isPasswordCorrect = await comparePassword(password, user.password);

    if (isPasswordCorrect) {
      // Return user profile information
      res.writeHead(200, headers);
      res.end(
        JSON.stringify({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        })
      );
    } else {
      res.writeHead(403, headers);
      res.end(JSON.stringify({ message: "Forbidden: Incorrect credentials" }));
    }
  } catch (error) {
    res.writeHead(500, headers);
    res.end(JSON.stringify({ message: "Server error", error: error.message }));
  }
};

const register = async (req, res) => {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const { name, email, password } = JSON.parse(body);

      if (!name || !email || !password) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ message: "Missing required fields" }));
        return;
      }

      if (await findUserByEmail(email)) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ message: "Email already in use" }));
      }

      const hashedPassword = await hashPassword(password);

      const userData = { name, email, password: hashedPassword };
      const user = await createUser(userData);
      res.writeHead(201, headers);
      res.end(
        JSON.stringify({ message: "User registered successfully", user })
      );
    });
  } catch (error) {
    res.writeHead(500, headers);
    res.end(JSON.stringify({ message: "server error", error: error.message }));
  }
};

const login = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const { email, password } = JSON.parse(body);
      const user = await findUserByEmail(email);

      if (!user) {
        res.writeHead(404, headers);
        res.end(JSON.stringify({ message: "User not found" }));
        return;
      }

      const isPasswordCorrect = await comparePassword(password, user.password);

      if (isPasswordCorrect) {
        const authHeader = `Basic ${Buffer.from(
          `${email}:${password}`
        ).toString("base64")}`;

        res.writeHead(200, {
          ...headers,
          Authorization: authHeader,
        });

        res.end(
          JSON.stringify({
            message: "Login successful",
            user: { _id: user._id, name: user.name, email: user.email },
          })
        );
      } else {
        res.writeHead(401, headers);
        res.end(JSON.stringify({ message: "Invalid credentials" }));
      }
    } catch (error) {
      res.writeHead(500, headers);
      res.end(
        JSON.stringify({ message: "server error", error: error.message })
      );
    }
  });
};

const logout = (req, res) => {
  try {
    res.writeHead(200, headers);
    res.end(JSON.stringify({ message: "Logged out successfully" }));
  } catch (error) {
    res.writeHead(500, headers);
    res.end(JSON.stringify({ message: "Server error", error: error.message }));
  }
};

module.exports = { profile, register, login, logout };
