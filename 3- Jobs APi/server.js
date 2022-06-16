require("dotenv").config();
require("express-async-errors");

//create express app
const express = require("express");
const app = express();

// require db
const dbconnect = require("./config/db/db");

// require routes
const authRoutes = require("./src/entities/users/user.router");
const jobRoutes = require("./src/entities/jobs/jobs.route");

// custom middlewares
const authMiddleware = require("./src/utils/authMiddleware");
const notFound = require("./src/utils/Errors/notFound");
const errHandler = require("./src/utils/Errors/errorHandler");

// express middlewares
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("<h1>Hello Shix</h1>");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/job", authMiddleware, jobRoutes);

// error handling
app.use(notFound);
app.use(errHandler);

// listening to a server
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    // connectDB
    await dbconnect;
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
