const express = require("express");
const userRoutes = require("./routes/users.router");
module.exports = () => {
  const app = express();

  app.use(express.json());
  app.use("/api/v1/users", userRoutes);

  return app;
};
