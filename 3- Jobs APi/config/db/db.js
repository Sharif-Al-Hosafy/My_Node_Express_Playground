const mongoose = require("mongoose");

module.exports = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected succefully");
  })
  .catch((err) => {
    console.log(err);
  });
