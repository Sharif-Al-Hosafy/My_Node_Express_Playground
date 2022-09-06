const express = require("express");
const router = express.Router();
const {} = require("./users.controller");

router.route("/").get().post();
router.route("/:id").get().put().delete();

module.exports = router;
