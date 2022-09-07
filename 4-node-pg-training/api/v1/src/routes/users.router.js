const express = require("express");
const router = express.Router();
const { find, findOne } = require("../repos/user.repo");

router.get("/", async (req, res) => {
  const users = await find();
  res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
  const user = await findOne(req.params.id);
  res.status(200).json(user);
});

module.exports = router;
