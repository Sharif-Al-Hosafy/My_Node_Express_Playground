const express = require("express");
const router = express.Router();
const { getAllProducts } = require("./product.controller");
router.route("/").get(getAllProducts);

module.exports = router;
