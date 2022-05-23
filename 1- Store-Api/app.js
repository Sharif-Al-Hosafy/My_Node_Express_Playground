const dotenv = require("dotenv").config();
const express = require("express");
const app = express();

const notFound = require("./src/utils/not-found");
const errHandling = require("./src/utils/error-handler");

//middlewares
app.use(express.json());

//routes
app.get("/", (req, res) => {
  app.send("Welcome to store api");
});

// error handling
app.use(notFound);
app.use(errHandling);

//starting server and connecting db
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    //db connect
    app.listen(port, () => {
      console.log("server is listining on port " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
