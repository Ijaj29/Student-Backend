const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studName: {
      type: "String",
    },
    email: {
      type: "String",
    },
    mobile: {
      type: "String",
    },
    company: {
      type: "String",
    },
    file: {
      type: "String",
    },
  },
  { timestamps: true }
);

const studentModel = mongoose.model("student", studentSchema);

module.exports = studentModel;
