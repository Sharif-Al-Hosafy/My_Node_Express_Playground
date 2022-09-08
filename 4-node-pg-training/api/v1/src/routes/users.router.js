const express = require("express");
const router = express.Router();
const {
  find,
  findOne,
  addUser,
  updateUser,
  deleteUser,
} = require("../repos/user.repo");

router.get("/", async (req, res) => {
  const users = await find();
  res.status(200).json(users);
});

router.post("/", async (req, res) => {
  const user = await addUser(req.body);
  res.status(200).json(user);
});

router.get("/:id", async (req, res) => {
  const user = await findOne(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  res.status(200).json(user);
});

router.put("/:id", async (req, res) => {
  const user = await updateUser(req.params.id, req.body);

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  res.status(200).json(user);
});

router.delete("/:id", async (req, res) => {
  const user = await deleteUser(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  res.status(200).json(user);
});

module.exports = router;
