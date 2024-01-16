const MongoStore = require("connect-mongo");
const expressSession = require("express-session");

const session = () => {
  const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  });

  return expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60, httpOnly: true, sameSite: "none" },
  });
};

module.exports = session;
