require("dotenv").config();
require("express-async-errors");

//create express app
const express = require("express");
const app = express();

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const xss = require("xss-clean");

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
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  })
);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

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
