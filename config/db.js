const mongoose = require("mongoose");

exports.ConnectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(process.env.MONGO_URI);
  console.log("connected");
};
