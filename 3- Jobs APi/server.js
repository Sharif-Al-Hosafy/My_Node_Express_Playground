require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// require db
// require routes

// middleware
app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send("<h1>Hello Shix</h1>");
});

// app.use("/api/v1/", ); --> start using routes

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
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
