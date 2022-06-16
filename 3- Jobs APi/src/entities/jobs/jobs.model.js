const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide a company"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide email"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["pending", "interview", "rejected"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please Provid a user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
