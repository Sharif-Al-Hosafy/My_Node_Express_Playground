const Product = require("./product.model");

// here the user can search and filter for products by many options
// maybe by the name, company, price or ratings
const getAllProducts = async (req, res) => {
  const { featured, price, company, name, sort, fields, numericFilters } =
    req.query;

  // we made this empty obj in order not to mess with the query if a garbage params were sent
  const queryObj = {};

  if (featured) queryObj.featured = featured === "true" ? true : false;
  if (company) queryObj.company = company;
  if (name) queryObj.name = { $regex: name, $options: "i" }; // search for any matchings with options case insensetive

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObj);
  if (sort) {
    const sortString = sort.split(",").join(" "); // example:  name,price -----> name  price
    result = result.sort(sortString);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldString = fields.split(",").join(" "); // example:  name,price -----> name  price
    result = result.select(fieldString);
  }

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
};
