const createError = require("../../utils/Errors/createCustomError");
const { findOneAndUpdate } = require("./jobs.model");
const Job = require("./jobs.model");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.id }).sort("createdAt");
  res.status(200).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: { id },
    params: { id: jobId },
  } = req;
  // we did this because we need the user id and the job id and to make sure that both id's are related in the db
  const job = await Job.findOne({ _id: jobId, createdBy: id });

  if (!job) throw createError(404, "Job not found");
  res.status(200).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.id;
  const job = await Job.create({ ...req.body });
  res.status(201).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { id },
    params: { id: jobId },
  } = req;

  if (company == "" || position == "")
    throw createError(400, "company or position cant be empty");

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) throw createError(401, "Job isn't found");
  res.status(200).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { id },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: id });

  if (!job) throw createError(401, "Job isn't found");
  res.status(200).json({ job });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
};
