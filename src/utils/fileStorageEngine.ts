import multer from "multer";
import * as uuid from "uuid";
import * as path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const fileStorageEngine = multer.diskStorage({
  // destination: (req, file, callback) => {
  //   callback(null, "./tmp/uploads");
  // },
  filename: (req, file, callback) => {
    callback(null, uuid.v4() + path.extname(file.originalname));
  },
});

export default fileStorageEngine;
