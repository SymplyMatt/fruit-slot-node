import { v2 as cloudinary } from 'cloudinary';
import { Router, Request, Response } from 'express';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function  uploadImage (path : any) {
  const result = await cloudinary.uploader.upload(path);
  return result?.secure_url
}