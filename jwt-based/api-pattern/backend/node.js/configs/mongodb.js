const { MongoClient } = require("mongodb");
const dotenv = require("dotenv").config();
const colors = require("colors");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

async function connectDB() {
  try {
    if (!db) {
      await client.connect();
      console.log("connected to mongodb".cyan.underline);
      db = client.db(process.env.DB_NAME);
    }
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

module.exports = connectDB;
