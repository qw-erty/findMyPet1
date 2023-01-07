const express = require("express");
const petUploadController = require("../controllers/petUploadController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    if (!fs.existsSync("public/petImages")) {
      fs.mkdirSync("public/petImages");
    }

    cb(null, "public/petImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);

    if (ext !== ".jpeg" && ext !== ".jpg" && ext !== ".png") {
      return cb(new Error("Only .jpj, .jpeg, .png are allowed!"));
    }

    cb(null, true);
  },
});

const router = express.Router();

//post create new media
router.post(
  "/create",
  upload.single('csvFile'),
  petUploadController.create
);

module.exports = router;
