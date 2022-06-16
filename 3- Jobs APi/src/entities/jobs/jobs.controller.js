const createError = require("../../utils/createError");
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
  res.send("update job");
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
};
