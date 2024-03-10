import cloudinary from 'cloudinary'; // Thêm import của Cloudinary
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'upload',
    allowed_formats: ['jpg', 'png', 'gif'],
    public_id: (req, file) => 'computed-filename-using-request',
  },
});

const upload = multer({ storage: storage });

export { upload };
