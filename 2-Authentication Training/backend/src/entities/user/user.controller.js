const err = require("../../utils/createError");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) throw err(400, "Username or password not found");

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ message: "success", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res
    .status(200)
    .json({
      message: `Hi ${req.user.username} your lucky no is ${luckyNumber}`,
    });
};

module.exports = {
  login,
  dashboard,
};
