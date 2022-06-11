const User = require('./user.model')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {}

const register = async (req, res) => {
  const newUser = await User.create({ ...req.body })
  res.status(201).json({ status: 'success', user: newUser })
}

module.exports = {
  login,
  register,
}
