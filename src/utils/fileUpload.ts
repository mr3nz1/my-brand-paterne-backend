import multer from "multer";
import fileStorageEngine from "./fileStorageEngine";

const limits = {
  fileSize: 5 * 1024 * 1024, // 5 MB limit
};

// const fileUpload = multer({ dest: "uploads/", limits });

const fileUpload = multer({
  storage: fileStorageEngine,
  limits,
});

module.exports = fileUpload;

export default fileUpload;
