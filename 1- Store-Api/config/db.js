const db = require("mongoose");

const dbConnect = (url) => {
  // returns a promise
  return db.connect(url);
};

module.exports = dbConnect;
