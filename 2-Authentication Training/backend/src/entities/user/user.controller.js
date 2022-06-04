const err = require("../../utils/createError");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) throw err(404, "Username or password not found");

  res.status(200).json({ message: "success" });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({ message: `your lucky no is ${luckyNumber}` });
};

module.exports = {
  login,
  dashboard,
};
