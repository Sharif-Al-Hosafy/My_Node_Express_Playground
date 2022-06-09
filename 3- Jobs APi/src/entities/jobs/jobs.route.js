const router = require("express").Router();
const {
  getAllJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
} = require("./jobs.controller");

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
