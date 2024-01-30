const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected !");
  } catch (error) {
    console.error(error);
  }
};
module.exports = connectToMongo;
