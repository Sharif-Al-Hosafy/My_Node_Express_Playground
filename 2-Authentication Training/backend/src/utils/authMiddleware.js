const jwt = require("jsonwebtoken");
const err = require("../utils/createError");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (!authHeader || !authHeader.startsWith("Bearer"))
    throw err(401, "No Token Provided");
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decode.id,
      username: decode.username,
    };

    console.log(decode);
    next();
  } catch (error) {
    throw err(401, "No Token Provided");
  }
};
