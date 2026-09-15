const mongoose = require("mongoose");

const connectMongo = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/sope";

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

module.exports = { connectMongo };
