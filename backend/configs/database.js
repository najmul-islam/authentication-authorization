const mongoose = require("mongoose");

const database = async (url) => {
  const connect = mongoose.connect(url);
  console.log(`Mongodb connected`.cyan.underline);
  return connect;
};

module.exports = database;
