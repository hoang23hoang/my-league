import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import { authenticateToken } from '../Middleware/authenMiddleware.js';
import { asyncCatch } from '../Utils/trycatch.js';

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
    folder: 'img-myleague',
    resource_type: "auto",
    allowed_formats: ['jpg', 'png', 'gif', 'mp4', 'avi', 'mov'],
    public_id: (req, file) => 'media_myleague_' + Date.now(),
  },
});

uploadRouter.post('/upload', asyncCatch(authenticateToken), multer({ storage: storage }).single('file'), (req, res) => {
  const playerName = req.user.namePlayer;
  const imageUrl = req.file.path;
  res.json({ data: imageUrl, playerName: playerName });
});


export default uploadRouter;
