import { diskStorage } from "multer";
import { extname } from "path";

export const multerOptions = {
    fileFilter : (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      storage : (destinationOptions=[])=>diskStorage({
       destination:(req, file, cb)=>{
       let destination= (destinationOptions.find((destinationObject)=>{
       
        return destinationObject.filename===file.fieldname}));
       if(destination) 
        {destination=destination.destination;
       
        cb(null, destination)
        }
       },
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const extension = extname(file.originalname);
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
          cb(null, `${name}-${randomName}${extension}`);
        },
      })

}