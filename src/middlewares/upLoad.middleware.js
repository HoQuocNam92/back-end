const multer = require("multer");
const cloudinary = require("../config/Cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "book",
  },
});

const upload = multer({ storage });
module.exports = upload;
