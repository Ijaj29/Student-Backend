const studentModel = require("../Models/student.model");

const studentSrv = {
  getAll: () => {
    return studentModel.find();
  },

  getOne: (id) => {
    return studentModel.findById(id);
  },

  addByEmail: (email) => {
    return studentModel.findOne({ email });
  },

  addByMobile: (mobile) => {
    return studentModel.findOne({ mobile });
  },

  update: (id, data) => {
    return studentModel.findByIdAndUpdate(id, data, { new: true });
  },

  deleteStud: (id) => {
    return studentModel.findByIdAndDelete(id);
  },
};

module.exports = studentSrv;
