require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// require db
const dbconnect = require("./config/db/db");

// require routes
const authRoutes = require("./src/entities/users/user.router");
const jobRoutes = require("./src/entities/jobs/jobs.route");

const authMiddleware = require("./src/utils/authMiddleware");

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("<h1>Hello Shix</h1>");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/job", authMiddleware, jobRoutes);

// error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .send({ status: "Error", message: error.message });
});

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
