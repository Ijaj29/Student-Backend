const multer = require("multer");
const path = require("path");

const fileStorage = multer.diskStorage({
  // Destination to store image
  destination: "files",
  filename: (req, file, cb) => {
    let filename = (Math.random() + 1).toString(36).substring(7);
    cb(null, file.originalname);
    // file.fieldname is name onef the field (image)
    // path.extname get the uploaded file extension
  },
});

const fileUpload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 5000000, // 1000000 Bytes = 5MB
  },
  fileFilter(req, file, cb) {
    // if (!file.originalname.match(/\.(png)$/)) {
    //   // upload only mp3 format
    //   return cb(new Error("Please upload png file"));
    // }
    cb(undefined, true);
  },
});

module.exports = fileUpload;
