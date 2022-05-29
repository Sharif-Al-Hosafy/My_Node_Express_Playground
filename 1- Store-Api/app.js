require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./config/db");
const productRoutes = require("./src/entities/products/product.router");

const notFound = require("./src/utils/not-found");
const errHandling = require("./src/utils/error-handler");

//middlewares
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Welcome to store api");
});
app.use("/api/v1/product", productRoutes);

// error handling
app.use(notFound);
app.use(errHandling);

//starting server and connecting db
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    //db connect
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("server is listining on port " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
