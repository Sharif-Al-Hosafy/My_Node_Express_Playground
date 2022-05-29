const getAllProducts = async (req, res) => {
  return res.status(200).json({ msg: "getting All Products" });
};

module.exports = {
  getAllProducts,
};
