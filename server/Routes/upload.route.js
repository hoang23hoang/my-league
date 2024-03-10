import express from 'express';
import multer from 'multer';
import { v2 as cloudinary} from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const uploadRouter = express.Router();

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
})


uploadRouter.post('/upload', multer({ storage: storage }).single('file'), (req, res) => {
  console.log(req.file);
  res.json(req.file);
})

export default uploadRouter;