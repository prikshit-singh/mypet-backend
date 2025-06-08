import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Set the folder to store profile images
const uploadFolder = 'profiles';
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // e.g., 1723482394823.png
  }
});

// Allow only image uploads (JPEG/PNG/GIF)
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type. Only JPG, PNG, or GIF allowed.'), false);
  }
};

// Configure multer instance for single image
const uploadProfile = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB max
  },
});

export const uploadProfileImage = uploadProfile.single('avatar'); // Use this middleware directly

export default uploadProfile;
