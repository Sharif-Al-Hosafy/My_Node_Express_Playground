const User = require("./user.model");
const jwt = require("jsonwebtoken");
const err = require("../../utils/Errors/createCustomError");

const register = async (req, res) => {
  const newUser = await User.create({ ...req.body });
  const token = newUser.CreateJWT();
  res.status(201).json({ user: { name: newUser.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw err(400, "Please provide your name & your password");

  const user = await User.findOne({ email });
  if (!user) throw err(401, "user is not found");

  const isPasswordMatch = await user.comparePass(password);
  if (!isPasswordMatch) throw err(401, "Username or Password is incorrect");

  const token = user.CreateJWT();

  res.status(200).json({ token });
};

module.exports = {
  login,
  register,
};
