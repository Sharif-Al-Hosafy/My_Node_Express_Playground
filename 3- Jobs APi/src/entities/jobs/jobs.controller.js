const mongoose = require("mongoose");
const createError = require("../../utils/createError");

const getAllJobs = (req, res) => {
  res.send("get All Jobs");
};

const getJob = (req, res) => {
  res.send("get single Job");
};

const createJob = (req, res) => {
  res.send("create Job");
};

const deleteJob = (req, res) => {
  res.send("delete job");
};

const updateJob = (req, res) => {
  res.send("update job");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
};
