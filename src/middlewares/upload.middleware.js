const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      return cb(new Error("Image type must be one of .jpeg,.jpg and .png!"));
    }

    cb(undefined, true);
  },
});

module.exports = upload;
