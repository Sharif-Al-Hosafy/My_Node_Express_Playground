const err = require("../utils/createError");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    const token = header.split(" ")[1];
    if (!header || !header.startsWith("Bearer"))
      throw err(401, "No Token Provided");
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decode.userId,
      username: decode.username,
    };
    next();
  } catch (error) {
    throw err(401, "No Token Provided");
  }
};
