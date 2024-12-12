const connectDB = require("../configs/mongodb");

// Collection Name
const collectionName = "users";

// Create a new user
async function createUser(userData) {
  const db = await connectDB();
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(userData);
  return result;
}

// Find a user by email
async function findUserByEmail(email) {
  const db = await connectDB();
  const collection = db.collection(collectionName);
  const user = await collection.findOne({ email });
  return user;
}

// Update a user by ID
async function updateUser(userId, updateData) {
  const db = await connectDB();
  const collection = db.collection(collectionName);
  const result = await collection.updateOne(
    { _id: userId },
    { $set: updateData }
  );
  return result.modifiedCount;
}

// Delete a user by ID
async function deleteUser(userId) {
  const db = await connectDB();
  const collection = db.collection(collectionName);
  const result = await collection.deleteOne({ _id: userId });
  return result.deletedCount;
}

module.exports = {
  createUser,
  findUserByEmail,
  updateUser,
  deleteUser,
};
