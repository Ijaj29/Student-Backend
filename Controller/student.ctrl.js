const fs = require("fs");
const path = require("path");
const studentModel = require("../Models/student.model");
const studentSrv = require("../Services/student.srv");
const dirPath = path.join(
  "../",
  "files"
);
const multer = require("multer");

const studentCtrl = {
  getAllStudent: async (req, res) => {
    try {
      const studentInfo = await studentSrv.getAll();
      if (studentInfo) {
        res.send(studentInfo);
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },

  getOneStudent: async (req, res) => {
    try {
      const studentInfo = await studentSrv.getOne(req.params.id);
      if (studentInfo) {
        res.send(studentInfo);
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },

  addStudent: async (req, res) => {
    try {
      const studentInfo = await studentSrv.addByEmail(req.body.email);

      if (studentInfo) {
        res.send({
          error: "Student already exists with given email",
        });
      } else {
        const studentInfobyMobile = await studentSrv.addByMobile(
          req.body.mobile
        );
        if (studentInfobyMobile) {
          res.send({
            error: "Student already exists with given Mobile Number",
          });
        } else {
          const addData = {
            file: req.file.originalname,
            studName: req.body.studName,
            email: req.body.email,
            mobile: req.body.mobile,
            company: req.body.company,
            paystatus: req.body.paystatus,
          };
          const newStudent = new studentModel(addData);
          newStudent.save().then((addedStudent) => {
            res.send({
              status: "Register Successfully",
              data: addedStudent,
            });
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },

  updateStudent: async (req, res) => {
    let file;
    if (req.file) {
      let stud = await studentSrv.getOne(req.params.id);
      await fs.unlinkSync(`${dirPath}/${stud.file}`);
      file = req.file.originalname;
    } else {
      file = req.body.file;
    }
    const updateData = {
      file: file,
      studName: req.body.studName,
      email: req.body.email,
      mobile: req.body.mobile,
      company: req.body.company,
      paystatus: req.body.paystatus,
    };
    try {
      const studentInfo = await studentSrv.update(req.params.id, updateData, {
        new: true,
      });
      res.send({
        status: "Updated Successfully",
        data: studentInfo,
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },

  deleteStudent: async (req, res) => {
    let stud = await studentSrv.getOne(req.params.id);
    fs.unlinkSync(`${dirPath}/${stud.file}`);
    try {
      const studentInfo = await studentSrv.deleteStud(req.params.id);
      if (studentInfo) {
        res.send({
          status: "Deleted Successfully",
        });
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  },
};

module.exports = studentCtrl;
