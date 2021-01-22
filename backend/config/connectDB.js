const mongoose = require("mongoose");

require("dotenv").config({ path: "./config/.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Database is connected");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;
