module.exports = (status, message) => {
  const error = new Error(message);
  error.status = status;

  return error;
};

// throw createError(401, "Email or password doesn't match");
