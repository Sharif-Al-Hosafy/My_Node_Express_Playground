const express = require("express");
const router = express.Router();
const { login, dashboard } = require("./user.controller");
const authMiddleware = require("../../utils/authMiddleware");

router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/login").post(login);

module.exports = router;
