module.exports = (error, req, res, next) => {
  //for duplicates errors
  if (error.code && error.code == 11000) {
    error.status = 400;
    error.message = `Duplicate ${Object.keys(
      error.keyValue
    )}, please choose another one`;
  }
  if (error.name == "CastError") {
    error.message = `No Items Found With Id: ${error.value}`;
    error.status = 404;
  }
  res
    .status(error.status || 500)
    .send({ status: "Error", message: error.message });
};
