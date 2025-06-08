import multer from 'multer';
import path from 'path';
import fs from 'fs'

const uploadFolder = 'petimages';
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}
// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(1, file)
    cb(null, uploadFolder); // Save files in "uploads" folder (make sure folder exists)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // eg. 23423423423.jpg
  }
});

// File filter to accept images and videos only
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/quicktime'];
  if (allowedTypes.includes(file.mimetype)) {
    console.log(2, file)
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type.'), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
