const express = require("express");
const multer = require("multer");
const studentCtrl = require("../Controller/student.ctrl");
const fileUpload = require("../Services/multer");

const router = express.Router();

router.get("/", studentCtrl.getAllStudent);
router.get("/one/:id", studentCtrl.getOneStudent);
router.post("/", fileUpload.single("file"), studentCtrl.addStudent);
router.put("/:id", fileUpload.single("file"), studentCtrl.updateStudent);
router.delete("/:id", studentCtrl.deleteStudent);

module.exports = router;
