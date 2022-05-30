require("dotenv").config();

const connectDB = require("./config/db");
const Product = require("./src/entities/products/product.model");

const productJson = require("./products.json");

const start = async () => {
  try {
    //db connect
    await connectDB(process.env.MONGO_URI);
    await Product.create(productJson);
    console.log("success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
