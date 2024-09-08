import { diskStorage } from "multer";
import { extname } from "path";

export const multerOptions = (permissableFileFormats = [], destinationOptions = []) => ({
  fileFilter: (req, file, callback) => {
    const ext = extname(file.originalname).toLowerCase();
    if (!permissableFileFormats.includes(ext)) {
      return callback(new Error(`Only ${permissableFileFormats.join(", ")} files are allowed!`), false);
    }
    callback(null, true);
  },
  storage: diskStorage({
    destination: (req, file, cb) => {
      const destinationObj = destinationOptions.find((destinationObject) => destinationObject.filename === file.fieldname);
      if (destinationObj) {
        cb(null, destinationObj.destination);
      } else {
        cb(new Error('Destination not found'),null);
      }
    },
    filename: (req, file, cb) => {
      const name = file.originalname.split('.')[0];
      const extension = extname(file.originalname);
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
      cb(null, `${name}-${randomName}${extension}`);
    },
  }),
});
