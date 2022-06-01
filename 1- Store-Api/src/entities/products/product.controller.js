const Product = require("./product.model");

// here the user can search and filter for products by many options
// maybe by the name, company, price or ratings
const getAllProducts = async (req, res) => {
  const { featured, price, company, name, sort } = req.query;

  // we made this empty obj in order not to mess with the query if a garbage params were sent
  const queryObj = {};

  if (featured) queryObj.featured = featured === "true" ? true : false;
  if (company) queryObj.company = company;
  if (name) queryObj.name = { $regex: name, $options: "i" }; // search for any matchings with options case insensetive

  let result = Product.find(queryObj);
  if (sort) {
    const sortString = sort.split(",").join(" "); // example:  name,price -----> name  price
    result = result.sort(sortString);
  } else {
    result = result.sort("createdAt");
  }
  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
};
